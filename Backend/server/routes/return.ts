import express from 'express'

import { db } from '@prisma/db'

import { getCachedUrl, setCachedUrl } from '@utils/redis'

const router = express.Router()

router.get('/:encodedUrl', async (req, res) => {
    
    const { encodedUrl } = req.params

    const cachedUrl = await getCachedUrl(encodedUrl)

    if(cachedUrl){
        return res.redirect(302, cachedUrl)
    }

    const record = await db.orm.public.Link.where({shortCode: encodedUrl}).first()

    if(!record){
        return res.status(404).json('URL not found')
    }

    await setCachedUrl(encodedUrl, record?.longUrl)
    
    return res.redirect(302, record.longUrl)
})

export default router