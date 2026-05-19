import { Resend } from "resend";
import { ENV } from "./env.js";

const hasResendKey = Boolean(ENV.RESEND_API_KEY);

export const resendClient = hasResendKey
  ? new Resend(ENV.RESEND_API_KEY)
  : {
      emails: {
        send: async () => ({
          data: null,
          error: { message: "RESEND_API_KEY is not configured" },
        }),
      },
    };

if (!hasResendKey) {
  console.warn("RESEND_API_KEY is not set. Email sending is disabled.");
}

export const sender = {
  email: ENV.EMAIL_FROM || "noreply@example.com",
  name: ENV.EMAIL_FROM_NAME || "Chatify",
};
