use std::{collections::HashMap, env};

use oauth2::{basic::BasicClient, AuthUrl, ClientId, ClientSecret, RedirectUrl, TokenUrl};
use proto::authorization::OauthProvider;

#[derive(Debug, Default)]
pub struct OauthCredentials {
    client_id: String,
    client_secret: String,
    redirect_uri: String,
    auth_url: String,
    token_url: String,
    pub scopes: Vec<String>,
}

pub struct OauthClient {
    pub client: BasicClient,
    pub credentials: OauthCredentials,
}

pub type OauthClients = HashMap<OauthProvider, OauthClient>;

fn get_oauth_client_from_credentials(oauth_credentials: &OauthCredentials) -> BasicClient {
    BasicClient::new(
        ClientId::new(oauth_credentials.client_id.to_string()),
        Some(ClientSecret::new(
            oauth_credentials.client_secret.to_string(),
        )),
        AuthUrl::new(oauth_credentials.auth_url.to_string()).unwrap(),
        Some(TokenUrl::new(oauth_credentials.token_url.to_string()).unwrap()),
    )
    .set_redirect_uri(RedirectUrl::new(oauth_credentials.redirect_uri.to_string()).unwrap())
}

pub fn get_oauth_clients() -> OauthClients {
    let mut oauth_clients: HashMap<OauthProvider, OauthClient> = HashMap::new();

    let google_oauth_credentials = OauthCredentials {
        client_id: env::var("GOOGLE_CLIENT_ID")
            .expect("Missing the GOOGLE_CLIENT_ID environment variable."),
        client_secret: env::var("GOOGLE_CLIENT_SECRET")
            .expect("Missing the GOOGLE_CLIENT_SECRET environment variable."),
        redirect_uri: "http://localhost:8080".to_string(),
        auth_url: "https://accounts.google.com/o/oauth2/v2/auth".to_string(),
        token_url: "https://oauth2.googleapis.com/token".to_string(),
        scopes: vec![
            "https://www.googleapis.com/auth/userinfo.email".to_string(),
            "https://www.googleapis.com/auth/userinfo.profile".to_string(),
        ],
    };

    oauth_clients.insert(
        OauthProvider::Google,
        OauthClient {
            client: get_oauth_client_from_credentials(&google_oauth_credentials),
            credentials: google_oauth_credentials,
        },
    );

    oauth_clients
}
