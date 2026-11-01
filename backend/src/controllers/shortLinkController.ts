import type { RequestHandler } from 'express';
import { InvalidOriginalUrlError, createShortLink, listShortLinks } from '../services/shortLinkService.js';

//POST
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

//GET
//Converte a listagem dos links em uma resposta HTTP
export const listShortLinksController: RequestHandler = async (_req, res) => {
  try {
    const links = await listShortLinks();
    res.status(200).json(links);
  } catch {
    res.status(500).json({error: "Não foi possível listar os links"});
  }
};
