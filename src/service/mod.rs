use actix_web::web;
use actix_web::{HttpResponse};
use handlebars::Handlebars;

// Macro documentation can be found in the actix_web_codegen crate
#[get("/")]
pub async fn index(hb: web::Data<Handlebars<'_>>) -> HttpResponse {
    let data = json!({
        "name": "Handlebars"
    });
    let body = hb.render("index", &data).unwrap();

    HttpResponse::Ok().body(body)
}

#[get("/{user}/{data}")]
pub async fn user(
    hb: web::Data<Handlebars<'_>>,
    info: web::Path<(String, String)>,
) -> HttpResponse {
    let data = json!({
        "user": info.0,
        "data": info.1
    });
    let body = hb.render("user", &data).unwrap();

    HttpResponse::Ok().body(body)
}