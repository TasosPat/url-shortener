import express, { Application, Request, Response, NextFunction } from "express";
import cors from "cors";
import { shortenUrl, sendToUrl, getUrlDetails, deleteShortUrl } from "./controllers/urlControllers";

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req: Request, res: Response) => {
    res.status(200).send({ msg: "Server is running!" });
});

// POST	/api/shorten	Shortens a URL
app.post('/api/shorten', shortenUrl);

// GET	/:shortUrl	Redirects to the long URL
app.get('/api/:shortUrl', sendToUrl);

// GET	/api/url/:shortUrl	(Optional) Get details about a short URL
app.get('/api/url/:shortUrl', getUrlDetails);

// DELETE	/api/url/:shortUrl	(Optional) Delete a shortened URL
app.delete('/api/url/:shortUrl', deleteShortUrl);

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === "22P02" || err.code === "23502") {
        res.status(400).send({ msg: "Bad Request" });
    } else next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.code === "23503") {
        res.status(404).send({ msg: "User doesn't exist" });
    } else next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.status && err.msg) {
        res.status(err.status).send({ msg: err.msg });
    } else next(err);
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({ msg: "Server Error!" });
});

export default app;
