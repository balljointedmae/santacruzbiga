#[macro_use]
extern crate juniper;
use diesel::*;
use diesel::r2d2::*;
extern crate serde_json;
use uuid::Uuid;

use actix_web::{middleware, web, App, HttpServer};

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

mod db;
mod handlers;
mod schemas;

use crate::handlers::register;

#[actix_rt::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "actix_web=info,diesel=debug");
    env_logger::init();
    dotenv::dotenv().ok();

    // set up database connection pool
    let connspec = std::env::var("DATABASE_URL").expect("DATABASE_URL");
    let manager = ConnectionManager::<PgConnection>::new(connspec);
    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.");

    let bind = "127.0.0.1:8080";

    println!("Starting server at: {}", &bind);

    // Start HTTP server
    HttpServer::new(move || {
        App::new()
            // set up DB pool to be used with web::Data<Pool> extractor
            .data(pool.clone())
            .configure(register)
            .wrap(middleware::Logger::default())
            .service(get_user)
            .service(add_user)
    })
    .bind(&bind)?
    .run()
    .await
}