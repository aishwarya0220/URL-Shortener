// app.ts
import express from 'express';
import cors from 'cors';
import router from '../server/routes/url';
import retrieve from '../server/routes/return';

const app = express();

// Local dev: allow any origin. Deployed: set CLIENT_URL to the frontend URL(s), comma separated.
const allowedOrigins = (process.env.CLIENT_URL || '')
    .split(',')
    .map((origin) => origin.trim().replace(/\/$/, ''))
    .filter(Boolean);

app.use(cors({ origin: allowedOrigins.length ? allowedOrigins : true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is the homepage');
});

// Health check for the hosting platform
app.get('/health', (req, res) => {
    res.json({ status: 'ok' });
});

app.use('/post', router);

// Keep this consistent with how your tests call it 
// (If your tests call /retrieve/:code, mount it on /retrieve)
app.use('/retrieve', retrieve); 

export default app;