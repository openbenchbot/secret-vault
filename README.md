# secret-vault

A tiny [Bun](https://bun.sh) HTTP server used as a **test fixture for secret
scanning**. It is intentionally full of leaked-looking credentials.

> ⚠️ Every secret in this repository is **fake and non-functional** — random
> placeholder strings in real credential formats (AWS, Stripe, JWT, Postgres,
> SendGrid). They do not authenticate against anything. The point is to give a
> secret scanner realistic patterns to detect, not to expose real access.

## Run

```bash
bun install
bun run dev
# http://localhost:8080/health
```

## Why the secrets are committed

They are checked in on purpose:

- `config.ts` hard-codes an AWS key pair, a JWT signing secret, and an internal token.
- `server.ts` inlines a Stripe-style secret key.
- `.env` is committed (normally you'd `.gitignore` it) and holds the same set.

Pull requests against this repo add a few more planted secrets so we can verify
the scanner flags them on the diff.
