import { Request, Response, NextFunction } from 'express';
import { cutUrl, redirectToUrl, fetchUrlDetails, removeShortUrl } from "../models/urlModels";

export async function shortenUrl(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { longUrl } = req.body;
        if (!longUrl) {
            return res.status(400).json({ error: 'longUrl is required' });
          }
        const { shortUrl } = await cutUrl(longUrl);
        return res.status(201).json({shortUrl});
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function sendToUrl(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { shortUrl } = req.params;
        const longUrl = await redirectToUrl(shortUrl)
        if (!longUrl) {
            return res.status(400).json({ error: 'Short URL not found' });
          }
        return res.redirect(longUrl);
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function getUrlDetails(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { shortUrl } = req.params;
        const urlDetails = await fetchUrlDetails(shortUrl)
        if (!urlDetails) {
            return res.status(400).json({ error: 'Short URL not found' });
          }
        return res.status(200).json(urlDetails)
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }
}

export async function deleteShortUrl(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
        const { shortUrl } = req.params;
        await removeShortUrl(shortUrl)
        return res.status(204).json()
    }
    catch (error) {
        next(error);
      }
}