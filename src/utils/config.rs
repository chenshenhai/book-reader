use json;
use std::fs::File;
use std::io::Read;



fn main() {
    let content = read_file("./json/hello.json");

    let obj = json::parse(&content).unwrap();
    println!("json.str:  {:?}", obj["str"]);
    println!("json.boolean:  {:?}", obj["boolean"]);
    println!("json.number:  {:?}", obj["number"]);
    println!("json.null:  {:?}", obj["null"]);
    println!("json.array:  {:?}", obj["array"]);
    println!("json.objArray:  {:?}", obj["objArray"]);
}
