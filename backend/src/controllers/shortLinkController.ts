import type { RequestHandler } from 'express';
import { 
  InvalidOriginalUrlError, 
  createShortLink, 
  listShortLinks, 
  incrementClickAndGetOriginalUrl,
  ShortLinkNotFoundError,
 } from '../services/shortLinkService.js';

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

//GET /api/links
//Converte a listagem dos links em uma resposta HTTP
export const listShortLinksController: RequestHandler = async (_req, res) => {
  try {
    const links = await listShortLinks();
    res.status(200).json(links);
  } catch {
    res.status(500).json({error: "Não foi possível listar os links"});
  }
};

//GET /:code
//Incrementa os cliques e redireciona para a URL original.
export const redirectShortLinkController: RequestHandler<{code: string}> = async (req, res) => {
  try {
    const originalUrl = await incrementClickAndGetOriginalUrl(req.params.code);
    res.redirect(302, originalUrl);
  } catch(error) {
    if (error instanceof ShortLinkNotFoundError) {
      res.status(404).json({error: error.message});
      return;
    }

    res.status(500).json({error: "Não foi possível redirecionar o link"});
  }
};
