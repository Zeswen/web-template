use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    tonic_build::configure()
        .build_client(false)
        .type_attribute("User", "#[derive(serde::Deserialize, serde::Serialize)]")
        .out_dir("./authorization")
        .compile(
            &["./authorization/authorization.proto"],
            &["./authorization"],
        )?;
    tonic_build::configure()
        .build_client(false)
        .type_attribute("User", "#[derive(serde::Deserialize, serde::Serialize)]")
        .out_dir("./payment")
        .compile(&["./payment/payment.proto"], &["./payment"])?;
    tonic_build::configure()
        .build_client(false)
        .type_attribute("User", "#[derive(serde::Deserialize, serde::Serialize)]")
        .out_dir("./product")
        .compile(&["./product/product.proto"], &["./product"])?;
    Ok(())
}
