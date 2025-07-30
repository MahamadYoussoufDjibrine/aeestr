import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    console.log("Sending contact notification email for:", { name, email });

    // Send notification email to AEESTR
    const emailResponse = await resend.emails.send({
      from: "AEESTR Contact <onboarding@resend.dev>",
      to: ["aeestr235@gmail.com"], // AEESTR's email
      subject: `Nouveau message de contact - ${name}`,
      html: `
        <h2>Nouveau message de contact reçu</h2>
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Informations du contact :</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
        </div>
        <div style="background: #fff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
          <h3>Message :</h3>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <hr style="margin: 30px 0;">
        <p style="color: #666; font-size: 12px;">
          Ce message a été envoyé depuis le site web AEESTR.
        </p>
      `,
    });

    // Send confirmation email to user
    await resend.emails.send({
      from: "AEESTR <onboarding@resend.dev>",
      to: [email],
      subject: "Confirmation de réception - AEESTR",
      html: `
        <h2>Merci pour votre message, ${name}!</h2>
        <p>Nous avons bien reçu votre message et nous vous répondrons dans les plus brefs délais.</p>
        <div style="background: #f0f8ff; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Votre message :</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        <p>Cordialement,<br>L'équipe AEESTR</p>
        <hr>
        <p style="color: #666; font-size: 12px;">
          Association des Étudiants et Élèves Stagiaires Tchadiens au Rwanda<br>
          Email: contact@aeestr.org
        </p>
      `,
    });

    console.log("Emails sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);