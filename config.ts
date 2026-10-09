// Central config for the vault server.
//
// NOTE (for anyone reading this repo): every credential in this file is a FAKE,
// non-functional placeholder used only to exercise secret-scanning tooling.
// None of these authenticate against any real service.

// TODO: move these to env before we ship. Hard-coded for now so local dev "just works".
export const config = {
  port: Number(process.env.PORT ?? 8080),

  // Postgres connection string with inline credentials (classic leak shape).
  databaseUrl:
    process.env.DATABASE_URL ??
    "postgres://vault_app:S3cr3tDbP4ss_demo@db.internal.example.com:5432/vault",

  // AWS access key pair (fake — not a live key).
  aws: {
    accessKeyId: "AKIA2E4FAKE7XMPLE9QZ",
    secretAccessKey: "wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY",
    region: "us-west-2",
  },

  // JWT signing secret used to mint session tokens.
  jwtSigningSecret: "hs256-demo-signing-secret-do-not-use-9f3a1c",

  // Internal service-to-service shared secret.
  internalApiToken: "svc_live_7c2b9ae41f0d4e8a_DEMO_TOKEN",

  // Added for the Redis cache layer. Fake Redis Cloud credentials.
  redis: {
    url: "redis://default:D3moRedisP4ss_notreal@cache.internal.example.com:6379/0",
    // Twilio-style auth token (fake) used by a cache-warming cron.
    twilioAuthToken: "a1b2c3d4e5f6DEMO7890abcdef123456",
  },
};
