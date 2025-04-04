import request from "supertest";
import app from "../app";
import db from "../db/db";
import seed from '../db/seeds/seed';

import urlsData from "../db/data/test-data/urlsData";

beforeEach(() => seed(urlsData));
afterAll(() => db.end());

describe("GET /api/health", () => {
    test("200: Responds with an object containing a message 'Server is running!'", () => {
      return request(app)
        .get("/api/health")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual({ msg: "Server is running!" });
        });
    });
  });

  describe("POST /api/shorten", () => {
    test("return the short URL", async () => {
        const longUrl = {
            longUrl: "https://www.youtube.com/"
          };
      const res = await request(app)
        .post("/api/shorten")
        .send(longUrl)
        .expect(201);
        
          expect(res.body).toHaveProperty("shortUrl");
          expect(typeof res.body.shortUrl).toBe("string");
          expect(res.body.shortUrl.length).toBeGreaterThan(0);
    });
    test("POST 400: Responds with an appropriate status and error message when provided with no url", async () => {
      const res = await request(app)
        .post("/api/shorten")
        .send({})
        .expect(400);

          expect(res.body.error).toBe('longUrl is required');
    });
    })