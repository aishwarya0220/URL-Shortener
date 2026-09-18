// src/prisma/__mocks__/db.ts
export const db = {
    orm: {
      public: {
        link: {
          where: jest.fn().mockReturnThis(),
          first: jest.fn().mockImplementation(async () => {
            return { longUrl: 'https://example.com', shortCode: 'abc1234' };
          }),
          create: jest.fn().mockResolvedValue({
            longUrl: 'https://example.com',
            shortCode: 'abc1234',
          }),
        },
      },
    },
  };