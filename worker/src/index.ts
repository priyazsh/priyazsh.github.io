interface ContactBody {
  name?: string;
  email?: string;
  message?: string;
}

interface Env {
  CONTACT_WEBHOOK: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== "POST") {
      return new Response("Method not allowed", { status: 405 });
    }

    if (request.headers.get("content-type") !== "application/json") {
      return new Response("Unsupported media type", { status: 415 });
    }

    let body: ContactBody;
    try {
      body = await request.json();
    } catch {
      return Response.json({ error: "Invalid request body." }, { status: 400 });
    }

    const name = body.name?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!name || !message) {
      return Response.json({ error: "Name and message are required." }, { status: 400 });
    }

    const webhookUrl = env.CONTACT_WEBHOOK;
    if (!webhookUrl) {
      return Response.json({ error: "Contact form is not configured." }, { status: 500 });
    }

    const discordBody = {
      content: `**New contact form submission**\n**Name:** ${name}\n**Email:** ${email || "Not provided"}\n**Message:** ${message}`,
    };

    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(discordBody),
    });

    if (!res.ok) {
      const text = await res.text();
      console.error("Webhook error:", res.status, text);
      return Response.json({ error: "Failed to send message. Please try again later." }, { status: 502 });
    }

    return Response.json({ success: true });
  },
} satisfies ExportedHandler<Env>;
