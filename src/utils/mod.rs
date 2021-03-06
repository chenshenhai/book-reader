pub mod file {
    use std::fs::File;
    use std::io::Read;
    use std::path::Path;
    pub fn is_exist(path: &str) -> bool {
        Path::new(path).exists()
    }

    pub fn read_file(path: &str) -> String {
        let mut content = String::new();
        if is_exist(path) {
            File::open(path)
                .unwrap()
                .read_to_string(&mut content)
                .unwrap();
        }
        return content;
    }
}

pub mod config {
    use serde::{Deserialize, Serialize};
    // use serde_json::{Result, Value};

    #[derive(Serialize, Deserialize, Debug)]
    pub struct ConfigContact {
        pub github: String,
        pub wechat: String,
    }

    #[allow(non_snake_case)]
    #[derive(Serialize, Deserialize, Debug)]
    pub struct Config {
        pub name: String,
        pub baseDir: String,
        pub description: String,
        pub keywords: String,
        pub port: u32,
        pub srcSite: String,
        pub srcDev: String,
        pub books: Vec<String>,
        pub pageHeadInjects: Vec<String>,
        pub avatar: String,
        pub contact: ConfigContact,
        pub issueUrl: String,
    }

    pub fn read_config() -> Config {
        let mut path = "./config.json".to_string();
        if super::file::is_exist(&path) != true {
            path = "./config/index.json".to_string();
        }
        let content = super::file::read_file(&path);
        let val: Config = serde_json::from_str(&content).unwrap();
        return val;
    }
}
