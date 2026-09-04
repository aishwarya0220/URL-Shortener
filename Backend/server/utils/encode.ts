const alphabet = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export default function encoded(num: number){
    if(num === 0) return

    let encoded = ''

    while(num > 0){
        encoded = alphabet[num%62] + encoded
        num = Math.floor(num / 62)
    }
    return encoded
}