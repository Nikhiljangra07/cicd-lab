import request from "supertest";
import { createApp } from "../src/app";

const app = createApp();
test("GET /health is ok", async () => {
  const r = await request(app).get("/health");
  expect(r.status).toBe(200); expect(r.body.ok).toBe(true);
});
test("GET /add rejects non-numbers", async () => {
  const r = await request(app).get("/add?a=x&b=1");
  expect(r.status).toBe(400);
});
