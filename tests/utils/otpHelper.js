import imaps from "imap-simple";
import { simpleParser } from "mailparser";

const DEFAULT_TIMEOUT = 90000;   // 90s
const POLL_INTERVAL = 5000;      // 5s

export async function fetchOTP({
  user,
  password,
  host,
  port = 993,
  tls = true,
  otpRegex = /(\d{6})/,   // default 6-digit
  mailbox = "INBOX",
  timeout = DEFAULT_TIMEOUT,
  expectedTo
}) {

  const config = {
    imap: {
      user,
      password,
      host,
      port,
      tls,
      authTimeout: 20000,
      tlsOptions: { rejectUnauthorized: false }
    }
  };

  console.log(`📩 Waiting for OTP on: ${user}`);
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

        const receivedTo =
          parsed.to?.value?.map(v => v.address.toLowerCase()) || [];

        console.log(`📨 Email received: ${parsed.subject}`);
        console.log(`📬 To: ${receivedTo.join(", ")}`);

        // Filter by expected recipient
        if (expectedTo) {
          const expected = expectedTo.toLowerCase();
          if (!receivedTo.includes(expected)) {
            console.log(`⏭ Skipping (not for ${expected})`);
            continue;
          }
        }

       // Convert HTML → plain text
const body = (parsed.html || parsed.text || "")
  .replace(/<style[\s\S]*?<\/style>/gi, " ")
  .replace(/<script[\s\S]*?<\/script>/gi, " ")
  .replace(/<[^>]+>/g, " ")      // remove HTML tags
  .replace(/&nbsp;/g, " ")
  .replace(/\s+/g, " ")
  .trim();
console.log("Clean Body:", body);
        const match = body.match(otpRegex);
        if (match) {
          console.log(`✅ OTP Found: ${match[1]}`);
          await connection.end();
          return match[1];
        }
      }

      await connection.end();

    } catch (err) {
      console.log("OTP fetch retrying...", err.message);
      if (connection) {
        try { await connection.end(); } catch {}
      }
    }

    await new Promise(r => setTimeout(r, POLL_INTERVAL));
  }

  throw new Error("❌ OTP not received within timeout");
}
