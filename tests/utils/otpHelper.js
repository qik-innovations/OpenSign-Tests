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
  otpRegex = /(\d{6})/,
  mailbox = "INBOX",
  timeout = DEFAULT_TIMEOUT
}) {

  const config = {
    imap: {
      user,
      password,
      host,
      port,
      tls,
      authTimeout: 20000,
      tlsOptions: {
        rejectUnauthorized: false   // ⭐ Fix self-signed certificate error
      }
    }
  };

  console.log(`📩 Waiting for OTP on: ${user}`);

  const start = Date.now();

  while (Date.now() - start < timeout) {
    let connection;

    try {
      connection = await imaps.connect(config);
      await connection.openBox(mailbox);

      const searchCriteria = ["UNSEEN"];
      const fetchOptions = { bodies: [""], markSeen: true };

      const messages = await connection.search(searchCriteria, fetchOptions);

      for (const msg of messages.reverse()) {
        const parsed = await simpleParser(msg.parts[0].body);
       const body = (parsed.text || parsed.html || "").replace(/\r/g, "").replace(/\n/g, " ").replace(/\s+/g, " ").trim();
        console.log(`📨 Email received: ${parsed.subject}`);
        const match = body.match(otpRegex);
        if (match) {
          console.log(`✅ OTP Found: ${match[0]}`);
          await connection.end();
          return match[0];
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
