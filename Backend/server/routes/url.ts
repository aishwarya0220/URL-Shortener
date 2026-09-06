const express = require('express')

const router = express.Router()

const { db } = require('../../src/prisma/db')

const { generateShortCode } = require('../services/generateShortCode')

router.post('/', async(req, res) => {
    try{
        const { url } = req.body

        if(!url){
            return res.status(400).json({ error: 'URL is required to be filled'})
        }

        const shortUrl = generateShortCode()

        const newEntry = await db.orm.public.Link.create({
            data: {
                longUrl: url,
                shortCode: shortUrl
            }
        })

        res.status(201).json('Changes made to the DB')
    } catch(err){
        console.log({error: `post method failed`, err})
    }
})