import { Router } from 'express';
import { createShortLinkController } from '../controllers/shortLinkController.js';

// Rotas relacionadas aos links curtos
const router = Router();

//rota para criar um link curto
router.post("/", createShortLinkController);

export default router;
