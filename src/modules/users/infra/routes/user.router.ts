import { Router } from 'express';
import { expressAdaptRoute } from '@/main/adapters/express-route-adapter';
import { container } from '@/main/di/container';
import { expressAdaptMiddleware } from '@/main/adapters/express-middleware-adapter';

export const userRouter = Router();

userRouter.post(
  '/users',
  expressAdaptRoute(container.resolve('createUserController')),
);

userRouter.get(
  '/users',
  expressAdaptMiddleware(container.resolve('authenticatedMiddleware')),
  expressAdaptRoute(container.resolve('showUserController')),
);

userRouter.put(
  '/users',
  expressAdaptMiddleware(container.resolve('authenticatedMiddleware')),
  expressAdaptRoute(container.resolve('updateUserController')),
);

userRouter.delete(
  '/users',
  expressAdaptMiddleware(container.resolve('authenticatedMiddleware')),
  expressAdaptRoute(container.resolve('deleteUserController')),
);
