use proto::authorization::authorization_service_server::{
    AuthorizationService, AuthorizationServiceServer,
};
use proto::authorization::{GetAuthorizationRequest, GetAuthorizationResponse};
use std::env;
use std::error::Error;
use tonic::{transport::Server, Request, Response, Status};

fn check_token(token: &str) -> Result<(), Status> {
    match token {
        "correct_token" => Ok(()),
        _ => Err(Status::unauthenticated("Invalid token")),
    }
}

#[derive(Debug, Default)]
pub struct AuthorizationServer {}

#[tonic::async_trait]
impl AuthorizationService for AuthorizationServer {
    async fn get_authorization(
        &self,
        request: Request<GetAuthorizationRequest>,
    ) -> Result<Response<GetAuthorizationResponse>, Status> {
        match check_token(&request.get_ref().token) {
            Err(status) => return Err(status),
            Ok(_) => Ok(Response::new(GetAuthorizationResponse {})),
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let address = match env::var("AUTHORIZATION_API_URL") {
        Ok(val) => val.parse()?,
        Err(_) => panic!("AUTHORIZATION_API_URL not found in environment"),
    };

    let authorization_server = AuthorizationServer::default();

    println!("Authorization service listening on {}", address);
    Server::builder()
        .add_service(AuthorizationServiceServer::new(authorization_server))
        .serve(address)
        .await?;

    Ok(())
}
