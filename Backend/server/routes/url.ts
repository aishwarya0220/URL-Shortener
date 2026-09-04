const express = require('express')

const router = express.router()

const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

router.post('/', async(req, res) => {
    try{
        const { url } = req.body

        if(!url){
            return res.status(400).json({ error: 'URL is required to be filled'})
        }

        const newUrl = await prisma.Link.create({
            data: {
                longUrl: url
            }
        })

        res.status(201).json('')
    }
})