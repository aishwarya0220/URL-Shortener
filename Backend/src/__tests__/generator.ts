import { generateShortCode } from "../../server/services/generateShortCode";

describe('Short Code Generator Utility', () => {
    it('should generate a string of the correct length', () => {
      const code = generateShortCode();
      expect(typeof code).toBe('string');
      expect(code.length).toBe(8); // Adjust based on your desired length
    });
  
    it('should only contain valid Base62 characters (alphanumeric)', () => {
      const code = generateShortCode();
      const base62Regex = /^[a-zA-Z0-9]+$/;
      expect(code).toMatch(base62Regex);
    });
  
    it('should generate unique codes on consecutive calls', () => {
      const code1 = generateShortCode();
      const code2 = generateShortCode();
      expect(code1).not.toBe(code2);
    });
  });