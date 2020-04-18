use lazy_static::lazy_static;
use std::collections::HashMap;
use std::option::Option;

use super::utils;

lazy_static! {
    static ref CONFIG: HashMap<&'static str, String> = {
        let config = utils::config::read_config();
        // println!("config = {:?}", config);

        let mut m = HashMap::new();
        let port: String = config.port.to_string();
        let name: String = config.name.to_string();
        m.insert("port", port);
        m.insert("name", name);
        return m;
    };
}

fn get_some_str_value(opt: Option<&String>) -> String {
    let mut value = "".to_string();
    match opt {
        Some(val) => {
            value = val.to_string();
        }
        None => {}
    }
    return value;
}

pub fn get_config_port() -> String {
    let opt = CONFIG.get("port");
    let value = self::get_some_str_value(opt);
    return value;
}

pub fn get_config_name() -> String {
    let opt = CONFIG.get("name");
    let value = self::get_some_str_value(opt);
    return value;
}
