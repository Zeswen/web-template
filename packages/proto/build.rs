use std::error::Error;

fn main() -> Result<(), Box<dyn Error>> {
    tonic_build::configure()
        .build_server(false)
        .out_dir("./google/api")
        .compile(
            &[
                "./google/api/annotations.proto",
                "./google/api/client.proto",
                "./google/api/http.proto",
                "./google/api/launch_stage.proto",
            ],
            &["./"],
        )?;
    tonic_build::configure()
        .build_client(false)
        .type_attribute("User", "#[derive(serde::Deserialize, serde::Serialize)]")
        .out_dir("./authorization")
        .compile(&["./authorization/authorization.proto"], &["./"])?;
    tonic_build::configure()
        .build_client(false)
        .type_attribute("User", "#[derive(serde::Deserialize, serde::Serialize)]")
        .out_dir("./payment")
        .compile(&["./payment/payment.proto"], &["./"])?;
    tonic_build::configure()
        .build_client(false)
        .type_attribute("User", "#[derive(serde::Deserialize, serde::Serialize)]")
        .out_dir("./product")
        .compile(&["./product/product.proto"], &["./"])?;
    Ok(())
}
