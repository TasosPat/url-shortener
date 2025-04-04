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

    describe("GET /api/:shortUrl", () => {
        test('302: redirects to the original URL when a valid shortUrl is provided', async () => {
          const res = await request(app)
            .get("/api/test123")
            .expect(302);
            
            expect(res.headers.location).toBe("https://example.com/test1");
        });
        test("GET 400: Responds with an appropriate status and error message when provided with a short URL that doesn't exist", async () => {
          const res = await request(app)
            .get("/api/test133")
            .expect(400);
    
              expect(res.body.error).toBe('Short URL not found');
        });
        })

        describe("GET /api/url/:shortUrl", () => {
            test('200: gets info for the short url', async () => {
              const res = await request(app)
                .get("/api/url/test123")
                .expect(200);
                
                expect(res.body).toHaveProperty("original_url");
                expect(res.body).toHaveProperty("created_at");
                expect(res.body.original_url).toBe("https://example.com/test1");
                expect(res.body.created_at).toEqual(expect.any(String));
                expect(new Date(res.body.created_at).toString()).not.toBe('Invalid Date');

            });
            test("GET 400: Responds with an appropriate status and error message when provided with a short URL that doesn't exist", async () => {
              const res = await request(app)
                .get("/api/url/test133")
                .expect(400);
        
                  expect(res.body.error).toBe('Short URL not found');
            });
            })

            describe("DELETE /api/url/:shortUrl", () => {
                test('204: gets an empty object for a deleted URL', async () => {
                  const res = await request(app)
                    .delete("/api/url/test123")
                    .expect(204);
                    
                    expect(res.body).toEqual({});
    
                });
                test("DELETE 404: Responds with an appropriate status and error message when provided with a short URL that doesn't exist", async () => {
                  const res = await request(app)
                    .delete("/api/url/test133")
                    .expect(404);
                      expect(res.body.msg).toBe('Short URL not found');
                });
                })