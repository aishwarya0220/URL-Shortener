// index.ts
import app from './src/app'
import 'dotenv/config';
import { connectRedis } from './server/utils/redis'

const startServer = async () => {
    try {
        await connectRedis();
        
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (err) {
        console.log('Failed to connect to Redis:', err);
        process.exit(1);
    }
};

startServer();