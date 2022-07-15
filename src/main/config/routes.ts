import { Router } from 'express';
import { userRouter } from '@/modules/users/infra/routes/user.router';

export const router = Router();

router.use(userRouter);
