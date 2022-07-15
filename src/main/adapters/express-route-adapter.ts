import { RequestHandler } from 'express';
import { BaseController } from '@/shared/application/base-controller';

type Adapter = (controller: BaseController) => RequestHandler;

export const expressAdaptRoute: Adapter = (controller) => async (req, res) => {
  const { statusCode, data } = await controller.handle({
    body: req.body,
    params: req.params,
    query: req.query,
    headers: req.headers,
    user: req.user,
    file: req.file,
    method: req.method,
    url: req.url,
  });
  if (statusCode === 302) {
    res.set('Location', data);
    return res.redirect(302, data);
  }
  return res.status(statusCode).json(data);
};
