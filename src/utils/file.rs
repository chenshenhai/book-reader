
pub fn is_exist(path: &str) -> bool {
    Path::new(path).exists()
}

pub fn read_file(path: &str) -> String {
    let mut content = String::new();
    if is_exist(path) {
        let mut file = File::open(path)?;
        file.read_to_string(&mut content)?;
    }
    return content;
}