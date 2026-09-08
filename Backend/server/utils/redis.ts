import { createClient } from "redis";

import 'dotenv/config'

const redisClient = createClient({url: process.env.REDIS_URL || 'redis://localhost:6379'})

redisClient.on('error', (err) => console.error('Redis client error:', err))

export const connectRedis = async () => {
    if(!redisClient.isOpen){
        await redisClient.connect()
        console.log('Connected to redis')
    }
}

export const getCachedUrl = async (code: string): Promise<string | null> => {
    try{
        return await redisClient.get(code)
    } catch(err){
        console.log('Redis GET Error:', err)
        return null
    }
}

export const setCachedUrl = async (code: string, longUrl: string): Promise<void> => {
    try{
        await redisClient.setEx(code, 3600, longUrl)
    }catch(err){
        console.log('Redis SETEx Error:', err)
    }
}

export default redisClient