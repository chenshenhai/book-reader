use lazy_static::lazy_static;
use std::collections::HashMap;

use super::utils;

lazy_static! {
    static ref CONFIG: HashMap<&'static str, String> = {
        let config = utils::config::read_config();
        let mut m = HashMap::new();
        let port: String = config.port.to_string();
        let name: String = config.name.to_string();
        m.insert("port", port);
        m.insert("name", name);
        return m;
    };
}

pub fn get_port() -> String {
    let value = CONFIG.get("port");
    let mut port = "".to_string();
    match value {
        Some(val) => {
            port = val.to_string();
        }
        None => {
            
        }
    }
    return port;
}
