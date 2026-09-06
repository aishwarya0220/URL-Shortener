const express = require('express')

const app = express()

const post = require('./server/routes/url')

require('dotenv').config()

app.get('/', (req, res) => {
    res.send('This is the homepage')
})

app.use('/post', post)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

