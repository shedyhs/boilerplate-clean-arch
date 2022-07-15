import * as awilix from 'awilix';
import { IMiddleware } from '@/shared/application/middlewares/middleware-interface';
import { AuthenticatedMiddleware } from '@/shared/application/middlewares/authenticated-middleware';

export type MiddlewaresCradle = {
  authenticatedMiddleware: IMiddleware;
};

export const middlewaresContainer = {
  authenticatedMiddleware: awilix.asClass(AuthenticatedMiddleware).singleton(),
};
