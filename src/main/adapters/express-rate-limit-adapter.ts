import rateLimit from 'express-rate-limit';
import { Request, Response } from 'express';

export const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  headers: true,
  keyGenerator(req: Request): string {
    return req.ip;
  },
  handler(_, res: Response): void {
    res.status(429).send('Too many requests, slow down!');
  },
});
