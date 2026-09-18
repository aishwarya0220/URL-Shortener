// server/utils/__mocks__/redis.ts
export const connectRedis = jest.fn().mockResolvedValue(true);
export const getCachedUrl = jest.fn().mockResolvedValue(null);
export const setCachedUrl = jest.fn().mockResolvedValue(true);