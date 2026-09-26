import express from "express";

export function add(a: number, b: number): number {
  return a + b;
}

export function greet(name: string): string {
  return `hello, ${name}`;
}

export function createApp() {
  const app = express();
  app.get("/health", (_req, res) => res.json({ ok: true, version: process.env.APP_VERSION ?? "dev" }));
  app.get("/add", (req, res) => {
    const a = Number(req.query.a), b = Number(req.query.b);
    if (Number.isNaN(a) || Number.isNaN(b)) return res.status(400).json({ error: "a and b must be numbers" });
    res.json({ result: add(a, b) });
  });
  return app;
}
