use actix_web::web;
use actix_web::{HttpResponse};
use handlebars::Handlebars;
use super::global;

// Macro documentation can be found in the actix_web_codegen crate
#[get("/")]
pub async fn index(hb: web::Data<Handlebars<'_>>) -> HttpResponse {

    let data = json!({
        "title": global::get_name(),
        "description": "",
        "keywords": "",
        "headInjects": "",
        "content": "",
        "summary": "",
        "sider": "",
        "config": "{}",
        "timestamp": "",
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