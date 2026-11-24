// index.ts
import 'dotenv/config'; // must load first so src/app.ts can read CLIENT_URL
import app from './src/app'
import { connectRedis } from './server/utils/redis'

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Redis is only a cache. If it is down, requests fall back to the database,
// so a Redis problem should not stop the server from starting.
connectRedis().catch((err) => {
    console.log('Redis unavailable, continuing without cache:', err);
});
