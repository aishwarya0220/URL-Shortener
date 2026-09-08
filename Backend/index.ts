import express from 'express'

const app = express()

import router from './server/routes/url'

import 'dotenv/config'

import { connectRedis } from './server/utils/redis'

import retrieve from './server/routes/return'


app.use(express.json())

const startRedisServer = async () => {
    try{
        await connectRedis()
        
        app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`)
        })
    }catch(err){
        console.log('Failed to connect to Redis:', err)
        process.exit(1)
    }
}

startRedisServer()

app.get('/', (req, res) => {
    res.send('This is the homepage')
})

app.use('/post', router)

app.use('/retrieve', retrieve)

// app.listen(process.env.PORT, () => {
//     console.log(`Server is running on port ${process.env.PORT}`)
// })

