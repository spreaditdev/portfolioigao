// Follow this setup guide to integrate the Deno runtime into your Supabase project:
// https://supabase.com/docs/guides/functions/deploy-edge-functions

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { SmtpClient } from "https://deno.land/x/smtp@v0.7.0/mod.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { to, from, subject, name, message } = await req.json();

    // Validate required fields
    if (!to || !from || !subject || !name || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    // Configure SMTP client
    const client = new SmtpClient();

    // Connect to SMTP server - replace with your SMTP settings
    // For example, for Gmail:
    await client.connectTLS({
      hostname: Deno.env.get("SMTP_HOSTNAME") || "smtp.gmail.com",
      port: parseInt(Deno.env.get("SMTP_PORT") || "465"),
      username: Deno.env.get("SMTP_USERNAME") || "",
      password: Deno.env.get("SMTP_PASSWORD") || "",
    });

    // Send email
    await client.send({
      from: Deno.env.get("SMTP_FROM_EMAIL") || "noreply@yourportfolio.com",
      to,
      subject,
      content: `
        <html>
          <body>
            <h2>Nova mensagem de contato do portfólio</h2>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${from}</p>
            <p><strong>Assunto:</strong> ${subject}</p>
            <h3>Mensagem:</h3>
            <p>${message.replace(/\n/g, "<br>")}</p>
          </body>
        </html>
      `,
      html: true,
    });

    await client.close();

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
