import { Router } from 'express';
import { createAnalyst, listAnalysts } from '../controllers/analystController.js';

const router = Router();

router.get('/', listAnalysts);
router.post('/', createAnalyst);

export default router;
