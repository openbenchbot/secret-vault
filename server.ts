import { config } from "./config.ts";

// A deliberately tiny Bun server. It doesn't do anything useful; it exists so
// this repo looks like a real service for secret-scanning end-to-end tests.

// Another hard-coded secret, inline this time: a Stripe test-style key (fake).
const STRIPE_SECRET_KEY = "sk_live_51KpFAKE9mX2demoZq7bT4uVwRs8cN0eHgL3kDEMOkey";

function authHeader(): string {
  // Reuses the internal token from config to call a downstream service.
  return `Bearer ${config.internalApiToken}`;
}

const server = Bun.serve({
  port: config.port,
  fetch(req) {
    const url = new URL(req.url);

    if (url.pathname === "/health") {
      return Response.json({ ok: true, region: config.aws.region });
    }

    if (url.pathname === "/charge") {
      // Pretend to talk to Stripe with our (fake) key.
      return Response.json({
        charged: true,
        usingKey: STRIPE_SECRET_KEY.slice(0, 8) + "…",
        auth: authHeader().slice(0, 12) + "…",
      });
    }

    return new Response("secret-vault: nothing to see here", { status: 404 });
  },
});

console.log(`secret-vault listening on http://localhost:${server.port}`);
