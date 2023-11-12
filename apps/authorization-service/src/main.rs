use proto::authorization::authorization_service_server::{
    AuthorizationService, AuthorizationServiceServer,
};
use proto::authorization::{GetAuthorizationRequest, GetAuthorizationResponse};
use std::error::Error;
use tonic::metadata::{Ascii, MetadataValue};
use tonic::{transport::Server, Request, Response, Status};

fn check_token(token: Option<&MetadataValue<Ascii>>) -> Result<(), Status> {
    match token {
        Some(token) => {
            if token.to_str().unwrap() == "correct_token" {
                return Ok(());
            }
            return Err(Status::unauthenticated("Invalid token"));
        }
        None => return Err(Status::unauthenticated("No token found")),
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
        match check_token(request.metadata().get("token")) {
            Err(status) => return Err(status),
            Ok(_) => {
                let reply: GetAuthorizationResponse = GetAuthorizationResponse {};

                Ok(Response::new(reply))
            }
        }
    }
}

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let address = "[::1]:50052".parse()?;
    let authorization_server = AuthorizationServer::default();

    println!("Authorization service listening on {}", address);
    Server::builder()
        .add_service(AuthorizationServiceServer::new(authorization_server))
        .serve(address)
        .await?;

    Ok(())
}
