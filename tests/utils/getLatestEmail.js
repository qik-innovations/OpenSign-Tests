import imaps from "imap-simple";
import { simpleParser } from "mailparser";

const DEFAULT_TIMEOUT = 120000; // 90s
const POLL_INTERVAL = 5000; // 5s

export async function getLatestEmail({
  user,
  password,
  host,
  port = 993,
  tls = true,
  mailbox = "INBOX",
  timeout = DEFAULT_TIMEOUT,
  expectedTo,
  subjectContains,
  allowNoEmail = false
}) {
  const config = {
    imap: {
      user,
      password,
      host,
      port,
      tls,
      authTimeout: 50000,
      tlsOptions: { rejectUnauthorized: false }
    }
  };

  console.log(`📩 Waiting for email on: ${user}`);

  const start = Date.now();

  while (Date.now() - start < timeout) {
    let connection;

    try {
      connection = await imaps.connect(config);
      await connection.openBox(mailbox);

      const messages = await connection.search(["UNSEEN"], {
        bodies: [""],
        markSeen: true
      });

      for (const msg of messages.reverse()) {
        const parsed = await simpleParser(msg.parts[0].body);

        const receivedTo = (() => {
          const to = parsed.to;
          if (!to) return [];

          if (Array.isArray(to)) {
            // Array of AddressObject — each may have a `value` array
            return to.flatMap((t) =>
              (t && t.value ? t.value : []).map((v) => String(v.address).toLowerCase())
            );
          }

          if (to.value) {
            return to.value.map((v) => String(v.address).toLowerCase());
          }

          return [];
        })();

        console.log(`📨 Subject: ${parsed.subject}`);
        console.log(`📬 To: ${receivedTo.join(", ")}`);

        // Filter by recipient
        if (expectedTo) {
          const expected = expectedTo.toLowerCase();

          if (!receivedTo.includes(expected)) {
            console.log(`⏭ Skipping - not sent to ${expected}`);
            continue;
          }
        }

        // Filter by subject
        if (
          subjectContains &&
          !parsed.subject?.toLowerCase().includes(subjectContains.toLowerCase())
        ) {
          console.log(`⏭ Skipping - subject does not match`);
          continue;
        }
        const toText = Array.isArray(parsed.to)
          ? parsed.to.map((t) => t.text).join(", ")
          : (parsed.to && parsed.to.text) || "";

        await connection.end();

        return {
  subject: parsed.subject || "",
  text: parsed.text || "",
  html:
    typeof parsed.html === "string"
      ? parsed.html
      : parsed.html?.toString() || "",
  from: parsed.from?.text || "",
  to: toText,
  date: parsed.date,
  attachments: parsed.attachments || []
};
      }

      await connection.end();
    } catch (err) {
      console.log(
        "Email fetch retrying...",
        err instanceof Error ? err.message : String(err)
      );

      if (connection) {
        try {
          await connection.end();
        } catch {}
      }
    }

    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
  }

  if (allowNoEmail) {
  console.log("✅ No email received within timeout (expected)");
  return null;
}

throw new Error("❌ Email not received within timeout");
}