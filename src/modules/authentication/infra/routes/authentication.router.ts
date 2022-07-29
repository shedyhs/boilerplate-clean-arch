import { Router } from 'express';
import { expressAdaptRoute } from '@/main/adapters/express-route-adapter';
import { container } from '@/main/di/container';
import { expressAdaptMiddleware } from '@/main/adapters/express-middleware-adapter';

export const authenticationRouter = Router();

authenticationRouter.post(
  '/auth/login',
  expressAdaptRoute(container.resolve('logInController')),
);

authenticationRouter.put(
  '/auth/refresh',
  expressAdaptMiddleware(container.resolve('authenticatedMiddleware')),
  expressAdaptRoute(container.resolve('refreshTokenController')),
);

authenticationRouter.delete(
  '/auth/logout',
  expressAdaptMiddleware(container.resolve('authenticatedMiddleware')),
  expressAdaptRoute(container.resolve('logOutController')),
);
