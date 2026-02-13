import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

/**
 * Envoyer un email de réinitialisation de mot de passe
 * @param {Object} options - Options pour l'email
 * @param {string} options.email - Adresse email du destinataire
 * @param {string} options.prenom - Prénom de l'utilisateur
 * @param {string} options.resetUrl - URL de réinitialisation avec token
 */
export const sendResetPasswordEmail = async ({ email, prenom, resetUrl }) => {
  const mailOptions = {
    from: `"Pôle Evolution" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Réinitialiser votre mot de passe - Pôle Evolution",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF1966 0%, #D41173 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Pôle Evolution</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Réinitialiser votre mot de passe</p>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Bonjour ${prenom},</p>
          
          <p style="color: #666; line-height: 1.6;">
            Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte. 
            Si vous n'avez pas fait cette demande, ignorez simplement cet email.
          </p>

          <p style="color: #666; line-height: 1.6;">
            Pour réinitialiser votre mot de passe, cliquez sur le bouton ci-dessous :
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" style="background: linear-gradient(135deg, #FF1966 0%, #D41173 100%); color: white; padding: 14px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
              Réinitialiser mon mot de passe
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            Ou copier-coller ce lien dans votre navigateur :<br/>
            <span style="word-break: break-all; color: #FF1966;">${resetUrl}</span>
          </p>

          <div style="background: #fff3cd; border-left: 4px solid #FF1966; padding: 15px; margin-top: 20px; border-radius: 5px;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              ⚠️ <strong>Important :</strong> Ce lien de réinitialisation est valide pendant 30 minutes uniquement.
            </p>
          </div>

          <p style="color: #999; font-size: 12px; margin-top: 30px; text-align: center;">
            Si vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet email.<br/>
            Votre compte reste sécurisé.
          </p>
        </div>

        <div style="background: #100249; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
          <p style="margin: 0;">
            © ${new Date().getFullYear()} Pôle Evolution - Tous droits réservés<br/>
            <a href="${process.env.FRONTEND_URL}" style="color: #FF1966; text-decoration: none;">Visiter notre site</a>
          </p>
        </div>
      </div>
    `,
    text: `
      Bonjour ${prenom},

      Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte.

      Pour réinitialiser votre mot de passe, veuillez accéder au lien suivant :
      ${resetUrl}

      Ce lien est valide pendant 30 minutes uniquement.

      Si vous n'avez pas demandé cette réinitialisation, ignorez simplement cet email. Votre compte reste sécurisé.

      © ${new Date().getFullYear()} Pôle Evolution
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true, message: "Email envoyé avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw new Error(`Erreur lors de l'envoi de l'email: ${error.message}`);
  }
};

export const isEmailServiceConfigured = () => {
  return (
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASSWORD &&
    process.env.FRONTEND_URL
  );
};
