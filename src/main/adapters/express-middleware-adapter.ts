import { RequestHandler } from 'express';
import { IMiddleware } from '@/shared/application/middlewares/middleware-interface';

type Adapter = (middleware: IMiddleware) => RequestHandler;
export const expressAdaptMiddleware: Adapter =
  (middleware) => async (req, res, next) => {
    const { statusCode, data } = await middleware.handle({
      body: req.body,
      params: req.params,
      query: req.query,
      headers: req.headers,
      user: req.user,
      file: req.file,
      method: req.method,
      url: req.url,
    });

    if (statusCode === 200) {
      Object.assign(req, data);
      next();
    } else {
      res.status(statusCode).json({ error: data });
    }
  };
