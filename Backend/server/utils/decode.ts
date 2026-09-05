const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function decoded(str: string): number{
    let decoded = 0
    for(const char of str){
        const value = alphabet.indexOf(char)

        if (value === -1){
            throw new Error(`Invalid Base62 character: ${char}`);
        }

        decoded = decoded * 62 + value
    }
    return decoded
}