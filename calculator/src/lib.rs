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
            "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" => self.handle_number(key),
            "C" => self.handle_clear(),
            "." => self.handle_decimal(),
            "+" | "-" | "*" | "/" => self.handle_operator(key.chars().next().unwrap()),
            "=" => self.handle_equals(),
            "+/-" => self.handle_sign_change(),
            "%" => self.handle_percentage(),
            _ => println!("Unknown key: {}", key),
        }
    }

    pub fn handle_number(&mut self, num: &str) {
        if self.expecting_new_input || self.current_input == "0" {
            self.current_input = num.to_string();
            self.expecting_new_input = false;
        } else {
            self.current_input.push_str(num);
        }
    }

    pub fn handle_decimal(&mut self) {
        if self.expecting_new_input {
            self.current_input = "0.".to_string();
            self.expecting_new_input = false;
        } else if !self.current_input.contains(".") {
            self.current_input.push('.');
        }
    }

    pub fn handle_operator(&mut self, op: char) {
        if self.expecting_new_input && self.operator.is_some() {
            self.operator = Some(op);
            return;
        }

        if self.operator.is_some(){
            self.handle_equals();
        }

        self.previous_value = self.current_input.parse().unwrap_or(0.0);
        self.operator = Some(op);
        self.expecting_new_input = true;
    }

    pub fn handle_equals(&mut self) {
        if let Some(op) = self.operator {
            let current_value = self.current_input.parse().unwrap_or(0.0);
            let result = match op
             {
                '+' => self.previous_value + current_value,
                '-' => self.previous_value - current_value,
                '*' => self.previous_value * current_value,
                '/' => {
                    if current_value != 0.0 {
                        self.previous_value / current_value
                    } else {
                        0.0
                    }
                },
                _ => current_value,
            };

            self.current_input = result.to_string();
            self.previous_value = result;
            self.operator = None;
            self.expecting_new_input = true;
        }
    }

    pub fn handle_percentage(&mut self) {
        let value = self.current_input.parse().unwrap_or(0.0);
        self.current_input = (value / 100.0).to_string();
        self.expecting_new_input = true;
    }

    fn handle_sign_change(&mut self) {
        let value = self.current_input.parse().unwrap_or(0.0);
        if value != 0.0 {
            self.current_input = (value * -1.0).to_string();
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
