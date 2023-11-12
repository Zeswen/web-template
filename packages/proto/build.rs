use std::env::current_dir;
use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    tonic_build::configure()
        .build_client(false)
        .out_dir(current_dir()?)
        .compile(&["product.proto", "authorization.proto"], &["."])?;
    Ok(())
}
