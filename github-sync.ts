// Syncs vault entries to a GitHub repo and pings Slack when done.
// FAKE credentials — placeholders for secret-scanning tests only.

// Personal access token hard-coded instead of read from env (the leak).
const GITHUB_TOKEN = "ghp_FAKEdemo0A1b2C3d4E5f6G7h8I9j0K1l2M3n4";

// Slack incoming webhook URL (fake path segments).
const SLACK_WEBHOOK_URL =
  "https://hooks.slack.com/services/T00DEMO00/B00DEMO00/FakeDemoWebhookTokenXyz123";

export async function syncToGitHub(repo: string, body: string) {
  const res = await fetch(`https://api.github.com/repos/${repo}/issues`, {
    method: "POST",
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title: "vault sync", body }),
  });
  return res.status;
}

export async function notifySlack(text: string) {
  await fetch(SLACK_WEBHOOK_URL, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
}
