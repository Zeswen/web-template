mod oauth;

use oauth::{OauthClient, OauthClients};
use oauth2::http::{HeaderMap, HeaderValue, Method, StatusCode};
use oauth2::reqwest::async_http_client;
use oauth2::url::Url;
use oauth2::{AuthorizationCode, CsrfToken, HttpRequest, Scope, TokenResponse};
use proto::authorization::authorization_service_server::{
    AuthorizationService, AuthorizationServiceServer,
};
use proto::authorization::{
    CheckAuthorizationRequest, CheckAuthorizationResponse, CreateAuthorizationRequest,
    CreateAuthorizationResponse, OauthProvider, User, VerifyAuthorizationRequest,
    VerifyAuthorizationResponse,
};
use std::env;
use std::error::Error;
use tonic::metadata::MetadataMap;
use tonic::{transport::Server, Request, Response, Status};

fn get_authorization_from_request_metadata(request_metadata: &MetadataMap) -> Result<&str, Status> {
    request_metadata
        .get("authorization")
        .ok_or(Status::unauthenticated(
            "Missing authorization in request metadata",
        ))?
        .to_str()
        .map_err(|err| Status::unauthenticated(err.to_string()))
}

struct AuthorizationServer {
    oauth_clients: OauthClients,
}

impl AuthorizationServer {
    fn get_oauth_client_from_provider(&self, provider: &OauthProvider) -> &OauthClient {
        self.oauth_clients
            .get(provider)
            .expect("Missing oauth client for provider")
    }
}

#[tonic::async_trait]
impl AuthorizationService for AuthorizationServer {
    async fn create_authorization(
        &self,
        request: Request<CreateAuthorizationRequest>,
    ) -> Result<Response<CreateAuthorizationResponse>, Status> {
        let oauth_provider = &request.get_ref().oauth_provider();
        let oauth_client = self.get_oauth_client_from_provider(oauth_provider);

        let scopes = oauth_client
            .credentials
            .scopes
            .iter()
            .map(|s| Scope::new(s.to_string()));

        let redirect_url = oauth_client
            .client
            .authorize_url(CsrfToken::new_random)
            .add_scopes(scopes)
            .url()
            .0
            .to_string();

        Ok(Response::new(CreateAuthorizationResponse { redirect_url }))
    }

    async fn verify_authorization(
        &self,
        request: Request<VerifyAuthorizationRequest>,
    ) -> Result<Response<VerifyAuthorizationResponse>, Status> {
        let oauth_provider = &request.get_ref().oauth_provider();
        let oauth_client = self.get_oauth_client_from_provider(oauth_provider);

        let token_response = oauth_client
            .client
            .exchange_code(AuthorizationCode::new(
                request.get_ref().authorization_code.to_string(),
            ))
            .request_async(async_http_client)
            .await
            .map_err(|e| Status::unauthenticated(e.to_string()))?;

        Ok(Response::new(VerifyAuthorizationResponse {
            access_token: token_response.access_token().secret().to_string(),
        }))
    }

    async fn check_authorization(
        &self,
        request: Request<CheckAuthorizationRequest>,
    ) -> Result<Response<CheckAuthorizationResponse>, Status> {
        let access_token = get_authorization_from_request_metadata(request.metadata())?;

        let mut headers = HeaderMap::default();
        headers.append(
            "Authorization",
            HeaderValue::from_str(access_token).map_err(|_| {
                Status::unauthenticated("Invalid authorization in request metadata")
            })?,
        );

        let response = async_http_client(HttpRequest {
            url: Url::parse("https://www.googleapis.com/userinfo/v2/me").expect("Invalid URL"),
            method: Method::GET,
            headers: headers,
            body: vec![],
        })
        .await
        .map_err(|e| Status::unauthenticated(e.to_string()))?;

        if response.status_code != StatusCode::OK {
            return Err(Status::unauthenticated(
                "Invalid authorization in request metadata",
            ));
        }

        let user: Option<User> = Some(
            serde_json::from_str(&String::from_utf8(response.body).map_err(|_| {
                Status::unauthenticated("Invalid authorization in request metadata")
            })?)
            .unwrap(),
        );

        Ok(Response::new(CheckAuthorizationResponse { user }))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let oauth_clients = oauth::get_oauth_clients();

    let address = env::var("AUTHORIZATION_API_URL")
        .expect("AUTHORIZATION_API_URL environment variable not set")
        .parse()
        .expect("AUTHORIZATION_API_URL environment variable is not a valid URL");

    let authorization_server = AuthorizationServer { oauth_clients };

    println!("Authorization service listening on {}", address);
    Server::builder()
        .add_service(AuthorizationServiceServer::new(authorization_server))
        .serve(address)
        .await?;

    Ok(())
}
