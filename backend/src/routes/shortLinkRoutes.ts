import { Router } from 'express';
import { createShortLinkController, listShortLinksController  } from '../controllers/shortLinkController.js';

// Rotas relacionadas aos links curtos
const router = Router();

//rota para criar um link curto
router.post("/", createShortLinkController);

//rota para listar os links curtos cadastrados
router.get("/", listShortLinksController);

export default router;
