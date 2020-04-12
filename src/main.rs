  
#[macro_use]
extern crate actix_web;

#[macro_use]
extern crate serde_json;


mod utils;
mod service;

use actix_web::web;
use actix_web::{App, HttpServer};
use actix_files;
use handlebars::Handlebars;
use std::io;

#[actix_rt::main]
async fn main() -> io::Result<()> {
    let mut handlebars = Handlebars::new();
    let config = utils::config::read_config();
    println!("config = {:?}", config);
    let port = config.port.to_string();
    let addr = "127.0.0.1:".to_string() + &port;

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