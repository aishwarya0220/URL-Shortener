import express from 'express'
const router = express.Router()
import { db } from '@prisma/db'
import { generateShortCode } from '../services/generateShortCode'
import { setCachedUrl } from '@utils/redis'

router.post('/', async (req, res) => {
    try {
        const { longUrl } = req.body
        console.log('incoming body:', req.body)

        if (!longUrl) {
            return res.status(400).json({ error: 'URL is required to be filled' })
        }

        const shortUrl = generateShortCode()

        await db.orm.public.Link.create({
            longUrl: longUrl,
            shortCode: shortUrl,
        })

        await setCachedUrl(shortUrl, longUrl)

        return res.status(201).json({ shortCode: shortUrl })
    } catch (err) {
        console.log({ error: `post method failed`, err })
        return res.status(500).json({ error: 'Internal server error' }) // <-- CRITICAL: Prevents request hanging
    }
})

export default router;