import express from 'express'

const router = express.Router()

import { db } from '../../src/prisma/db'

import { generateShortCode } from '../services/generateShortCode'
import { setCachedUrl } from '../utils/redis'

router.post('/', async(req, res) => {
    try{
        const { url } = req.body

        console.log('incoming body:', req.body)

        if(!url){
            return res.status(400).json({ error: 'URL is required to be filled'})
        }

        const shortUrl = generateShortCode()

        const newEntry = await db.orm.public.Link.create({
                longUrl: url,
                shortCode: shortUrl
        })

        await setCachedUrl(shortUrl, url)

        res.status(201).json(shortUrl)
    } catch(err){
        console.log({error: `post method failed`, err})
    }
})

export default router