import { Router } from 'express';
import { redirectShortLinkController } from '../controllers/shortLinkController.js';

//rotas de redirecionamento dos links curtos
const router = Router();

//GET /:code redireciona para o destino e conta o clique
router.get("/:code", redirectShortLinkController);

export default router;
