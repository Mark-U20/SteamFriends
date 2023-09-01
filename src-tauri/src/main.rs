
use std::env;
use steam_api;
use dotenv::dotenv;
use serde::Serialize;
use serde_json;

// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#[cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn getSteamUser() -> serde_json::Value {
    // Initialize dotenv
    dotenv().ok();

    // Fetch API key from environment variables
    let api_key = env::var("API_KEY").expect("API_KEY must be set");

    let steamids = vec!["76561198149368420"];

    // Fetch user data using the steam_api library
    let user_data = steam_api::get_profile_info(&steamids, &api_key);

    // Serialize the user_data struct into JSON
    match user_data {
        Ok(user) => serde_json::to_value(user).expect("Failed to serialize user data"),
        Err(err) => serde_json::json!({"error": format!("{:?}", err)}),
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, getSteamUser])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

