jest.mock('@prisma/db', () => ({
    db: {
      orm: {
        public: {
          Link: { // Capital 'L' to match your schema/code
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
    },
  }));
  
  jest.mock('@utils/redis', () => ({
    connectRedis: jest.fn().mockResolvedValue(true),
    getCachedUrl: jest.fn().mockResolvedValue(null),
    setCachedUrl: jest.fn().mockResolvedValue(true),
  }));
  
  import request from 'supertest';
  import app from '../app'; // Now imports cleanly without triggering app.listen()
  
  describe('URL Shortener Integration Tests', () => {
    it('should return 400 if longUrl is missing in POST /post', async () => {
      const response = await request(app)
        .post('/post')
        .send({});
  
      expect(response.status).toBe(400);
      expect(response.body).toHaveProperty('error');
    });
  
    it('should create a short code on valid POST /post', async () => {
      const response = await request(app)
        .post('/post')
        .send({ longUrl: 'https://example.com' });
  
      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('shortCode');
    });
  
    it('should redirect (302) on a valid GET /retrieve/:encodedUrl', async () => {
      const response = await request(app)
        .get('/retrieve/abc1234');
  
      expect(response.status).toBe(302);
      expect(response.header.location).toBe('https://example.com');
    });
  });