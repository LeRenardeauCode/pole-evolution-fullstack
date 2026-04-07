import nodemailer from "nodemailer";

let transporter = null;

function getTransporter() {
  if (!transporter) {
    console.log('🔧 Configuration du transporter email...');
    console.log('EMAIL_HOST:', process.env.EMAIL_HOST);
    console.log('EMAIL_PORT:', process.env.EMAIL_PORT);
    console.log('EMAIL_USER:', process.env.EMAIL_USER);
    console.log('NODE_ENV:', process.env.NODE_ENV);

    const transportConfig = process.env.EMAIL_HOST && process.env.EMAIL_PORT
      ? {
          host: process.env.EMAIL_HOST,
          port: parseInt(process.env.EMAIL_PORT),
          secure: parseInt(process.env.EMAIL_PORT) === 465,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
          tls: {
            rejectUnauthorized: process.env.NODE_ENV === 'production'
          }
        }
      : {
          service: process.env.EMAIL_SERVICE || "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        };

    console.log('📧 Transporter config mode:', process.env.EMAIL_HOST ? 'SMTP' : 'SERVICE');
    transporter = nodemailer.createTransport(transportConfig);
  }
  return transporter;
}

export const sendWelcomeEmail = async ({ email, prenom, validationUrl }) => {
  const mailOptions = {
    from: `"Pôle Evolution" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Bienvenue chez Pôle Evolution - Validez votre email",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF1966 0%, #D41173 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Bienvenue chez Pôle Evolution</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Votre passion pour la pole dance commence ici !</p>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Bonjour ${prenom},</p>
          
          <p style="color: #666; line-height: 1.6;">
            Merci d'avoir créé votre compte Pôle Evolution ! Nous sommes ravis de vous accueillir dans notre communauté.
          </p>

          <p style="color: #666; line-height: 1.6;">
            Pour finaliser votre inscription et accéder à toutes les fonctionnalités, veuillez valider votre adresse email en cliquant sur le bouton ci-dessous :
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${validationUrl}" style="background-color: #FF1966 !important; background: #FF1966 !important; color: white !important; padding: 14px 40px; text-decoration: none !important; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px; border: 2px solid #FF1966; font-family: Arial, sans-serif;">
              Valider mon email
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            Ou copier-coller ce lien dans votre navigateur :<br/>
            <span style="word-break: break-all; color: #FF1966;">${validationUrl}</span>
          </p>

          <div style="background: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin-top: 20px; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460; font-size: 14px;">
              ℹ️ <strong>Prochaines étapes :</strong><br/>
              • Validez votre email<br/>
              • Explorez notre planning de cours<br/>
              • Réservez votre première séance !
            </p>
          </div>
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
      Bienvenue chez Pôle Evolution !

      Bonjour ${prenom},

      Merci d'avoir créé votre compte. Pour finaliser votre inscription, veuillez valider votre adresse email en accédant au lien suivant :
      ${validationUrl}

      À bientôt sur nos barres !

      © ${new Date().getFullYear()} Pôle Evolution
    `,
  };

  try {
    await getTransporter().sendMail(mailOptions);
    return { success: true, message: "Email de bienvenue envoyé avec succès" };
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de bienvenue:", error);
    throw new Error(`Erreur lors de l'envoi de l'email: ${error.message}`);
  }
};

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
            <a href="${resetUrl}" style="background-color: #FF1966; color: white !important; padding: 14px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
              <span style="color: white; text-decoration: none;">Réinitialiser mon mot de passe</span>
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
    console.log('📧 Envoi email reset-password à:', email);
    console.log('🔗 URL de reset:', resetUrl.substring(0, 50) + '...');
    const result = await getTransporter().sendMail(mailOptions);
    console.log('✅ Email envoyé avec succès!', result);
    return { success: true, message: "Email envoyé avec succès" };
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email reset-password:", error);
    console.error("Erreur complète:", error.toString());
    throw new Error(`Erreur lors de l'envoi de l'email: ${error.message}`);
  }
};

export const sendContactNotificationToAdmin = async ({ nom, prenom, email, telephone, sujet, message }) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;
  
  const mailOptions = {
    from: `"Notifications Pôle Evolution" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    replyTo: email,
    subject: `[NOUVEAU MESSAGE] ${sujet}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #100249; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">📧 Nouveau Message Contact</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="border-left: 4px solid #FF1966; padding-left: 15px; margin-bottom: 20px;">
            <h2 style="color: #FF1966; margin: 0 0 10px 0;">Informations expéditeur</h2>
            <p style="margin: 5px 0;"><strong>Nom :</strong> ${nom}</p>
            <p style="margin: 5px 0;"><strong>Prénom :</strong> ${prenom || 'Non renseigné'}</p>
            <p style="margin: 5px 0;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #FF1966;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
            <p style="margin: 5px 0;"><strong>Sujet :</strong> ${sujet}</p>
          </div>

          <div style="background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd;">
            <h3 style="margin: 0 0 10px 0; color: #333;">Message :</h3>
            <p style="color: #666; line-height: 1.6; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <a href="mailto:${email}?subject=Re: ${encodeURIComponent(sujet)}" style="background-color: #FF1966; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              <span style="color: white; text-decoration: none;">Répondre à ${prenom || nom}</span>
            </a>
          </div>
        </div>
      </div>
    `,
    text: `
      Nouveau message de contact

      De : ${prenom || ''} ${nom}
      Email : ${email}
      Téléphone : ${telephone || 'Non renseigné'}
      Sujet : ${sujet}

      Message :
      ${message}

      Répondre à : ${email}
    `,
  };

  try {
    await getTransporter().sendMail(mailOptions);
    return { success: true, message: "Notification admin envoyée" };
  } catch (error) {
    console.error("Erreur notification admin:", error);
    throw new Error(`Erreur notification admin: ${error.message}`);
  }
};

export const sendContactConfirmationToUser = async ({ email, prenom, nom }) => {
  const mailOptions = {
    from: `"Pôle Evolution" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Message bien reçu - Pôle Evolution",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF1966 0%, #D41173 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">Pôle Evolution</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Message bien reçu !</p>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Bonjour ${prenom || nom},</p>
          
          <p style="color: #666; line-height: 1.6;">
            Nous avons bien reçu votre message et nous vous remercions de nous avoir contacté.
          </p>

          <p style="color: #666; line-height: 1.6;">
            Notre équipe reviendra vers vous dans les plus brefs délais, généralement sous 24 à 48 heures.
          </p>

          <div style="background: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460; font-size: 14px;">
              📞 <strong>Besoin d'une réponse urgente ?</strong><br/>
              N'hésitez pas à nous appeler au ${process.env.TELEPHONE_CONTACT || '07 67 26 94 71'}
            </p>
          </div>

          <p style="color: #666; line-height: 1.6;">
            À très bientôt,<br/>
            <strong>L'équipe Pôle Evolution</strong>
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
      Bonjour ${prenom || nom},

      Nous avons bien reçu votre message et nous vous remercions de nous avoir contacté.

      Notre équipe reviendra vers vous dans les plus brefs délais, généralement sous 24 à 48 heures.

      Besoin d'une réponse urgente ?
      Appelez-nous au ${process.env.TELEPHONE_CONTACT || '07 67 26 94 71'}

      À très bientôt,
      L'équipe Pôle Evolution

      © ${new Date().getFullYear()} Pôle Evolution
    `,
  };

  try {
    await getTransporter().sendMail(mailOptions);
    return { success: true, message: "Email de confirmation envoyé" };
  } catch (error) {
    console.error("Erreur confirmation utilisateur:", error);
    // Non bloquant - ne pas throw l'erreur
    return { success: false, message: "Erreur lors de l'envoi de la confirmation" };
  }
};

export const sendReservationNotificationToAdmin = async ({
  nomEleve,
  prenomEleve,
  emailEleve,
  telephoneEleve,
  niveauPole,
  nomCours,
  typeCours,
  dateDebut,
  montant,
  reservationId,
}) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"Pôle Evolution - Réservations" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    replyTo: emailEleve,
    subject: `[NOUVELLE RÉSERVATION] ${prenomEleve || ""} ${nomEleve} - ${nomCours}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #100249; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">📋 Nouvelle Réservation</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <div style="border-left: 4px solid #FF1966; padding-left: 15px; margin-bottom: 20px;">
            <h2 style="color: #FF1966; margin: 0 0 10px 0;">Informations élève</h2>
            <p style="margin: 5px 0;"><strong>Nom :</strong> ${nomEleve}</p>
            <p style="margin: 5px 0;"><strong>Prénom :</strong> ${prenomEleve || "Non renseigné"}</p>
            <p style="margin: 5px 0;"><strong>Email :</strong> <a href="mailto:${emailEleve}" style="color: #FF1966;">${emailEleve}</a></p>
            <p style="margin: 5px 0;"><strong>Téléphone :</strong> ${telephoneEleve || "Non renseigné"}</p>
            <p style="margin: 5px 0;"><strong>Niveau Pole :</strong> ${niveauPole}</p>
          </div>

          <div style="border-left: 4px solid #FF1966; padding-left: 15px; margin-bottom: 20px;">
            <h2 style="color: #FF1966; margin: 0 0 10px 0;">Détails du cours</h2>
            <p style="margin: 5px 0;"><strong>Cours :</strong> ${nomCours}</p>
            <p style="margin: 5px 0;"><strong>Type :</strong> ${typeCours}</p>
            <p style="margin: 5px 0;"><strong>Date/Heure :</strong> ${new Date(dateDebut).toLocaleString("fr-FR")}</p>
            <p style="margin: 5px 0;"><strong>Montant :</strong> ${montant}€</p>
          </div>

          <div style="background: #fff3cd; border-left: 4px solid #FF1966; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; color: #856404; font-size: 14px;">
              ⚠️ <strong>Action requise :</strong> Vérifiez et confirmez cette réservation dans l'admin.
            </p>
          </div>

          <div style="text-align: center; margin: 20px 0;">
            <a href="${process.env.FRONTEND_URL}/admin/reservations/${reservationId}" style="background-color: #FF1966; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              <span style="color: white; text-decoration: none;">Voir la réservation</span>
            </a>
          </div>
        </div>

        <div style="background: #100249; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
          <p style="margin: 0;">
            © ${new Date().getFullYear()} Pôle Evolution - Tous droits réservés
          </p>
        </div>
      </div>
    `,
    text: `
      Nouvelle Réservation

      Élève : ${prenomEleve || ""} ${nomEleve}
      Email : ${emailEleve}
      Téléphone : ${telephoneEleve || "Non renseigné"}
      Niveau Pole : ${niveauPole}

      Cours : ${nomCours} (${typeCours})
      Date : ${new Date(dateDebut).toLocaleString("fr-FR")}
      Montant : ${montant}€

      Veuillez valider cette réservation dans l'admin.
    `,
  };

  try {
    await getTransporter().sendMail(mailOptions);
    return { success: true, message: "Notification admin envoyée" };
  } catch (error) {
    console.error("Erreur notification réservation admin:", error);
    throw new Error(`Erreur notification admin: ${error.message}`);
  }
};

export const sendReservationConfirmationToUser = async ({
  nomEleve,
  prenomEleve,
  emailEleve,
  nomCours,
  dateDebut,
  lienValidation = null,
}) => {
  const mailOptions = {
    from: `"Pôle Evolution" <${process.env.EMAIL_USER}>`,
    to: emailEleve,
    subject: `Confirmation de réservation - ${nomCours}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF1966 0%, #D41173 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">✅ Réservation Confirmée</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Pôle Evolution</p>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Bonjour ${prenomEleve || nomEleve},</p>
          
          <p style="color: #666; line-height: 1.6;">
            Nous confirmons votre réservation pour le cours <strong>${nomCours}</strong>.
          </p>

          <div style="background: white; border-left: 4px solid #FF1966; padding: 20px; margin: 20px 0; border-radius: 5px;">
            <h3 style="margin: 0 0 10px 0; color: #FF1966;">📅 Détails du cours</h3>
            <p style="margin: 5px 0;"><strong>Cours :</strong> ${nomCours}</p>
            <p style="margin: 5px 0;"><strong>Date et heure :</strong> ${new Date(dateDebut).toLocaleString("fr-FR")}</p>
          </div>

          ${
            lienValidation
              ? `
          <p style="color: #666; line-height: 1.6;">
            Veuillez confirmer votre réservation en cliquant sur le bouton ci-dessous :
          </p>

          <div style="text-align: center; margin: 30px 0;">
            <a href="${lienValidation}" style="background-color: #FF1966; color: white !important; padding: 14px 40px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block; font-size: 16px;">
              <span style="color: white; text-decoration: none;">Confirmer ma réservation</span>
            </a>
          </div>

          <p style="color: #666; font-size: 14px;">
            Ou copier-coller ce lien dans votre navigateur :<br/>
            <span style="word-break: break-all; color: #FF1966;">${lienValidation}</span>
          </p>
          `
              : ""
          }

          <div style="background: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460; font-size: 14px;">
              ℹ️ <strong>À retenir :</strong><br/>
              • Arrivez 10-15 minutes avant le début du cours<br/>
              • Munissez-vous de votre pièce d'identité<br/>
              • Portez des vêtements confortables et des chaussures de sport
            </p>
          </div>

          <p style="color: #666; line-height: 1.6;">
            En cas de question, n'hésitez pas à nous contacter.<br/>
            À bientôt sur les barres !<br/>
            <strong>L'équipe Pôle Evolution</strong>
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
      Réservation Confirmée

      Bonjour ${prenomEleve || nomEleve},

      Nous confirmons votre réservation pour le cours ${nomCours}.

      Date et heure : ${new Date(dateDebut).toLocaleString("fr-FR")}

      ${
        lienValidation
          ? `Veuillez confirmer votre réservation : ${lienValidation}`
          : ""
      }

      À retenir :
      • Arrivez 10-15 minutes avant le début du cours
      • Munissez-vous de votre pièce d'identité
      • Portez des vêtements confortables

      À bientôt sur les barres !
      L'équipe Pôle Evolution

      © ${new Date().getFullYear()} Pôle Evolution
    `,
  };

  try {
    await getTransporter().sendMail(mailOptions);
    return { success: true, message: "Confirmation réservation envoyée" };
  } catch (error) {
    console.error("Erreur confirmation réservation:", error);
    throw new Error(`Erreur confirmation réservation: ${error.message}`);
  }
};

export const isEmailServiceConfigured = () => {
  return (
    process.env.EMAIL_USER &&
    process.env.EMAIL_PASSWORD &&
    process.env.FRONTEND_URL
  );
};

export const sendNewUserNotificationToAdmin = async ({ prenom, nom, email, telephone, niveauPole }) => {
  const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER;

  const mailOptions = {
    from: `"Notifications Pôle Evolution" <${process.env.EMAIL_USER}>`,
    to: adminEmail,
    subject: `[NOUVELLE INSCRIPTION] ${prenom} ${nom}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #100249; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">👤 Nouvelle Inscription</h1>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;">Un nouvel utilisateur vient de s'inscrire sur Pôle Evolution :</p>

          <div style="border-left: 4px solid #FF1966; padding-left: 15px; margin-bottom: 20px;">
            <p style="margin: 5px 0;"><strong>Prénom :</strong> ${prenom}</p>
            <p style="margin: 5px 0;"><strong>Nom :</strong> ${nom}</p>
            <p style="margin: 5px 0;"><strong>Email :</strong> <a href="mailto:${email}" style="color: #FF1966;">${email}</a></p>
            <p style="margin: 5px 0;"><strong>Téléphone :</strong> ${telephone || 'Non renseigné'}</p>
            <p style="margin: 5px 0;"><strong>Niveau :</strong> ${niveauPole || 'Non précisé'}</p>
          </div>

          <div style="background: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460; font-size: 14px;">
              ℹ️ Ce compte est en attente de validation. Rendez-vous dans le back-office pour l'approuver ou le rejeter.
            </p>
          </div>

          <div style="margin-top: 20px; text-align: center;">
            <a href="${process.env.FRONTEND_URL}/admin/eleves" style="background-color: #FF1966; color: white !important; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
              <span style="color: white; text-decoration: none;">Voir les élèves</span>
            </a>
          </div>
        </div>

        <div style="background: #100249; color: white; padding: 15px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
          <p style="margin: 0;">© ${new Date().getFullYear()} Pôle Evolution</p>
        </div>
      </div>
    `,
    text: `
      Nouvelle inscription sur Pôle Evolution

      Prénom : ${prenom}
      Nom : ${nom}
      Email : ${email}
      Téléphone : ${telephone || 'Non renseigné'}
      Niveau : ${niveauPole || 'Non précisé'}

      Ce compte est en attente de validation admin.

      © ${new Date().getFullYear()} Pôle Evolution
    `,
  };

  try {
    await getTransporter().sendMail(mailOptions);
    return { success: true, message: "Notification nouvel utilisateur envoyée" };
  } catch (error) {
    console.error("Erreur notification nouvel utilisateur:", error);
    throw new Error(`Erreur notification nouvel utilisateur: ${error.message}`);
  }
};
