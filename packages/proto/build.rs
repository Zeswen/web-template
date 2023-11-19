use std::env::current_dir;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    tonic_build::configure()
        .build_client(false)
        .type_attribute("User", "#[derive(serde::Deserialize, serde::Serialize)]")
        .out_dir(current_dir()?)
        .compile(&["product.proto", "authorization.proto"], &["."])?;
    Ok(())
}
