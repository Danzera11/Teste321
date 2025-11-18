import { Router } from 'express';
import clientRouter from './clients.js';
import analystRouter from './analysts.js';
import deploymentRouter from './deployments.js';
import authRouter from './auth.js';

const router = Router();

router.use('/clients', clientRouter);
router.use('/analysts', analystRouter);
router.use('/deployments', deploymentRouter);
router.use('/auth', authRouter);

export default router;
