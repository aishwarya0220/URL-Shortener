import express from 'express'

const app = express()

import router from '../Backend/server/routes/url'

import 'dotenv/config'

app.use(express.json())

app.get('/', (req, res) => {
    res.send('This is the homepage')
})

app.use('/post', router)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

