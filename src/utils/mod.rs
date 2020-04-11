pub mod file {
    use std::fs::File;
    use std::path::Path;
    use std::io::Read;
    pub fn is_exist(path: &str) -> bool {
        Path::new(path).exists()
    }
    
    pub fn read_file(path: &str) -> String {
        let mut content = String::new();
        if is_exist(path) {
            File::open(path).unwrap().read_to_string(&mut content).unwrap();
        }
        return content;
    }
}



pub mod config {
    use serde_json::{Result, Value};

    // pub struct Config {
    //     name: String,
    // }

    pub fn read_config() -> Value {
        let mut path = "./config.json".to_string();
        if super::file::is_exist(&path) != true {
            path = "./config/index.json".to_string();
        }
        let content = super::file::read_file(&path);
        let val: Value = serde_json::from_str(&content).unwrap();
        return val;
    }
    
}
