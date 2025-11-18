import { Router } from 'express';
import { createDeployment, listDeployments } from '../controllers/deploymentController.js';
import { requireAuth } from '../middlewares/auth.js';

const router = Router();

router.get('/', requireAuth, listDeployments);
router.post('/', requireAuth, createDeployment);

export default router;
