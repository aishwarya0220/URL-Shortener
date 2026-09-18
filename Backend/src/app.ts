// app.ts
import express from 'express';
import cors from 'cors';
import router from '../server/routes/url';
import retrieve from '../server/routes/return';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('This is the homepage');
});

app.use('/post', router);

// Keep this consistent with how your tests call it 
// (If your tests call /retrieve/:code, mount it on /retrieve)
app.use('/retrieve', retrieve); 

export default app;