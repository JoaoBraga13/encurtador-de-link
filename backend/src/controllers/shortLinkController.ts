import type { RequestHandler } from 'express';
import { InvalidOriginalUrlError, createShortLink } from '../services/shortLinkService.js';

//converte a criação do link em uma resposta HTTP.
export const createShortLinkController: RequestHandler = async (req, res) => {
  try {
    const link = await createShortLink(req.body?.originalUrl);
    res.status(201).json(link);
  } catch (error) {
    if (error instanceof InvalidOriginalUrlError) {
      res.status(400).json({error: error.message});
      return;
    }

    res.status(500).json({error: "Não foi possível criar o link"});
  }
};
