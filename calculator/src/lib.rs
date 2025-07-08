use wasm_bindgen::prelude::wasm_bindgen;

#[wasm_bindgen]
pub struct Calculator {
    current_input: String,
    previous_value: f64,
    operator: Option<char>,
    expecting_new_input: bool,
}

#[wasm_bindgen]
impl Calculator {
    pub fn new() -> Self {
        Self {
            current_input: "0".to_string(),
            previous_value: 0.0,
            operator: None,
            expecting_new_input: false,
        }
    }

    pub fn get_current_display(&self) -> String {
        self.current_input.clone()
    }

    pub fn handle_clear(&mut self) {
        self.current_input = "0".to_string();
        self.previous_value = 0.0;
        self.operator = None;
        self.expecting_new_input = false;
    }

    pub fn handle_button(&mut self, key: &str) {
        match key {
            "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" => {
                println!("Number: {}", key);
            }
            "C" => self.handle_clear(),
            "." => println!("Decimal: {}", key),
            "+" | "-" | "*" | "/" => println!("Operator: {}", key),
            "=" => println!("Equals: {}", key),
            "+/-" => println!("Sign: {}", key),
            "%" => println!("Percent: {}", key),
            _ => println!("Unknown key: {}", key),
        }
    }
}

#[cfg(test)]
mod tests {

    #[test]
    fn it_works() {
        println!("Tests")
    }
}
