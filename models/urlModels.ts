import db from '../db/db'
import { generateShortUrl } from "../db/seeds/utils";
import { CustomError } from '../types';

export async function cutUrl(originalUrl: string): Promise<{ shortUrl: string }> {
    try {
        const shortUrl = generateShortUrl();
        await db.query('INSERT INTO urls (original_url, short_url) VALUES ($1, $2)', [originalUrl, shortUrl]);
    return { shortUrl };
    }
    catch (error) {
        // Log the error for debugging and throw a custom error
        console.error('Error in cutUrl:', error);
        throw new Error('Failed to shorten URL');
    }
  }

export async function redirectToUrl(shortUrl: string): Promise<string | null> {
    const { rows } = await db.query('SELECT original_url FROM urls WHERE short_url = $1', [shortUrl]);
    if(!rows[0]) return null;
    return rows[0].original_url;
}

export async function fetchUrlDetails(shortUrl: string): Promise<{ original_url: string, created_at: Date } | null> {
    const { rows } = await db.query('SELECT original_url, created_at FROM urls WHERE short_url = $1', [shortUrl]);
    if(!rows[0]) return null;
    return rows[0];
}

export async function removeShortUrl(shortUrl: string) : Promise<void |CustomError> {
    const { rowCount } = await db.query('DELETE FROM urls WHERE short_url = $1', [shortUrl]);
    if (rowCount === 0) {
        return Promise.reject<CustomError>({
          status: 404,
          msg: 'Short URL not found',
        });
    }
       return;  
}