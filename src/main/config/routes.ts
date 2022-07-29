import { Router } from 'express';
import { userRouter } from '@/modules/users/infra/routes/user.router';
import { authenticationRouter } from '@/modules/authentication/infra/routes/authentication.router';

export const router = Router();

router.use(userRouter);
router.use(authenticationRouter);
