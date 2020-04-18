  
#[macro_use]
extern crate actix_web;

#[macro_use]
extern crate serde_json;


mod utils;
mod service;
mod global;

use std::io;
use actix_web::web;
use actix_web::{App, HttpServer};
use actix_files;
use handlebars::Handlebars;
// use self::global;

#[actix_rt::main]
async fn main() -> io::Result<()> {
    let mut handlebars = Handlebars::new();
    let port = global::get_config_port();
    let addr = "127.0.0.1:".to_string() + &port;
    println!("The server start at {:?}", addr);
    handlebars
        .register_templates_directory(".html", "./src/view/")
        .unwrap();
    let handlebars_ref = web::Data::new(handlebars);

    HttpServer::new(move || {
        App::new()
            .app_data(handlebars_ref.clone())
            .service(actix_files::Files::new("/dist", "static/dist").show_files_listing())
            .service(service::index)
            .service(service::user)
    })
    .bind(addr)?
    .run()
    .await
}