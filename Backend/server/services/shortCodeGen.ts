import encoded from "../utils/encode";

import randomBytes from "./randomBytes";

export function generateShortCode(length = 4): string {
    let code = "";
  
    while (code.length < length) {
      code += encoded(randomBytes(length - code.length));
    }
  
    return code;
  }