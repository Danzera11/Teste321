import { Router } from 'express';
import { createClient, listClients } from '../controllers/clientController.js';

const router = Router();

router.get('/', listClients);
router.post('/', createClient);

export default router;
