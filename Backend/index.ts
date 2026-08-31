const express = require('express')

const router = express.Router()

const app = express()

require('dotenv').config()

app.get('/', (req, res) => {
    res.send('This is the homepage')
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

