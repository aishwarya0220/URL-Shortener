const crypto = require('crypto')

export default function randomBytes(length: number): Buffer{
    return crypto.randomBytes(length)
}