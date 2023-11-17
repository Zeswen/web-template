use oauth2::basic::BasicClient;
use oauth2::http::{HeaderMap, HeaderValue, Method};
use oauth2::reqwest::async_http_client;
use oauth2::url::Url;
use oauth2::{
    AuthUrl, AuthorizationCode, ClientId, ClientSecret, CsrfToken, HttpRequest, RedirectUrl, Scope,
    TokenResponse, TokenUrl,
};
use proto::authorization::authorization_service_server::{
    AuthorizationService, AuthorizationServiceServer,
};
use proto::authorization::{
    CheckAuthorizationRequest, CheckAuthorizationResponse, CreateAuthorizationRequest,
    CreateAuthorizationResponse, User, VerifyAuthorizationRequest, VerifyAuthorizationResponse,
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
        .map_err(|_| Status::unauthenticated("Invalid authorization in request metadata"))
}

fn get_oauth_client() -> BasicClient {
    let google_client_id = ClientId::new(
        env::var("GOOGLE_CLIENT_ID").expect("Missing the GOOGLE_CLIENT_ID environment variable."),
    );
    let google_client_secret = ClientSecret::new(
        env::var("GOOGLE_CLIENT_SECRET")
            .expect("Missing the GOOGLE_CLIENT_SECRET environment variable."),
    );
    let auth_url = AuthUrl::new("https://accounts.google.com/o/oauth2/v2/auth".to_string())
        .expect("Invalid authorization endpoint URL");
    let token_url = TokenUrl::new("https://oauth2.googleapis.com/token".to_string())
        .expect("Invalid token endpoint URL");

    BasicClient::new(
        google_client_id,
        Some(google_client_secret),
        auth_url,
        Some(token_url),
    )
    .set_redirect_uri(
        RedirectUrl::new("http://localhost:8080".to_string()).expect("Invalid redirect URL"),
    )
}

struct AuthorizationServer {
    oauth_client: Box<BasicClient>,
}

#[tonic::async_trait]
impl AuthorizationService for AuthorizationServer {
    async fn create_authorization(
        &self,
        _request: Request<CreateAuthorizationRequest>,
    ) -> Result<Response<CreateAuthorizationResponse>, Status> {
        let (auth_url, _) = self
            .oauth_client
            .authorize_url(CsrfToken::new_random)
            .add_scope(Scope::new(
                "https://www.googleapis.com/auth/userinfo.email".to_string(),
            ))
            .add_scope(Scope::new(
                "https://www.googleapis.com/auth/userinfo.profile".to_string(),
            ))
            .url();

        Ok(Response::new(CreateAuthorizationResponse {
            redirect_url: auth_url.to_string(),
        }))
    }

    async fn verify_authorization(
        &self,
        request: Request<VerifyAuthorizationRequest>,
    ) -> Result<Response<VerifyAuthorizationResponse>, Status> {
        let token_response = self
            .oauth_client
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

        if response.status_code != 200 {
            return Err(Status::unauthenticated(
                "Invalid authorization in request metadata",
            ));
        }

        let user_data: serde_json::Value =
            serde_json::from_str(&String::from_utf8(response.body).map_err(|_| {
                Status::unauthenticated("Invalid authorization in request metadata")
            })?)
            .unwrap();

        Ok(Response::new(CheckAuthorizationResponse {
            user: Some(User {
                id: user_data["id"].as_str().unwrap_or("").to_string(),
                email: user_data["email"].as_str().unwrap_or("").to_string(),
                verified_email: user_data["verified_email"].as_bool().unwrap_or(false),
                name: user_data["name"].as_str().unwrap_or("").to_string(),
                given_name: user_data["given_name"].as_str().unwrap_or("").to_string(),
                family_name: user_data["family_name"].as_str().unwrap_or("").to_string(),
                picture: user_data["picture"].as_str().unwrap_or("").to_string(),
                locale: user_data["locale"].as_str().unwrap_or("").to_string(),
                hd: user_data["hd"].as_str().unwrap_or("").to_string(),
            }),
        }))
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let oauth_client: BasicClient = get_oauth_client();

    let address = env::var("AUTHORIZATION_API_URL")
        .expect("AUTHORIZATION_API_URL environment variable not set")
        .parse()
        .expect("AUTHORIZATION_API_URL environment variable is not a valid URL");
    let authorization_server = AuthorizationServer {
        oauth_client: Box::from(oauth_client),
    };

    println!("Authorization service listening on {}", address);
    Server::builder()
        .add_service(AuthorizationServiceServer::new(authorization_server))
        .serve(address)
        .await?;

    Ok(())
}
