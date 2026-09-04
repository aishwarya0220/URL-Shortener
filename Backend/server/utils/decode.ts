const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function decoded(str){
    let decoded = 0
    for(let i = 0; i < str.length; i++){
        decoded = decoded * 62 + alphabet.indexOf(str[i]);
    }
    return decoded
}