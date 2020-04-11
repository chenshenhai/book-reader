  
#[macro_use]
extern crate actix_web;

#[macro_use]
extern crate serde_json;


mod utils;

use actix_web::web;
use actix_web::{App, HttpResponse, HttpServer};
use handlebars::Handlebars;
use std::io;

// Macro documentation can be found in the actix_web_codegen crate
#[get("/")]
async fn index(hb: web::Data<Handlebars<'_>>) -> HttpResponse {
    let data = json!({
        "name": "Handlebars"
    });
    let body = hb.render("index", &data).unwrap();

    HttpResponse::Ok().body(body)
}

#[get("/{user}/{data}")]
async fn user(
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

#[actix_rt::main]
async fn main() -> io::Result<()> {
    let mut handlebars = Handlebars::new();

    let config = utils::config::read_config();
    println!("config = {:?}", config);

    handlebars
        .register_templates_directory(".html", "./src/view/")
        .unwrap();
    let handlebars_ref = web::Data::new(handlebars);

    HttpServer::new(move || {
        App::new()
            .app_data(handlebars_ref.clone())
            .service(index)
            .service(user)
    })
    .bind("127.0.0.1:5001")?
    .run()
    .await
}