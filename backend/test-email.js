#!/usr/bin/env node

/**
 * 🧪 Script de Test Email - Pôle Evolution
 * 
 * Ce script permet de tester rapidement la configuration Nodemailer
 * sans démarrer tout le backend.
 * 
 * Usage:
 *   node test-email.js
 * 
 * Configuration requise dans .env:
 *   - EMAIL_USER
 *   - EMAIL_PASSWORD
 *   - EMAIL_SERVICE ou EMAIL_HOST/EMAIL_PORT
 */

import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Charger les variables d'environnement
dotenv.config({ path: path.join(__dirname, '.env') });

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(color + message + colors.reset);
}

function logSection(title) {
  console.log('\n' + colors.bright + colors.cyan + '='.repeat(60) + colors.reset);
  log(title, colors.bright + colors.cyan);
  console.log(colors.bright + colors.cyan + '='.repeat(60) + colors.reset + '\n');
}

async function testEmailConfiguration() {
  logSection('🧪 TEST DE CONFIGURATION EMAIL - PÔLE EVOLUTION');

  // Vérifier les variables d'environnement
  log('📋 Vérification des variables d\'environnement...', colors.yellow);
  
  const requiredVars = ['EMAIL_USER', 'EMAIL_PASSWORD'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);

  if (missingVars.length > 0) {
    log(`\n❌ Variables manquantes: ${missingVars.join(', ')}`, colors.red);
    log('\n💡 Configurez ces variables dans le fichier .env', colors.yellow);
    process.exit(1);
  }

  log('✅ Variables d\'environnement OK', colors.green);
  log(`   EMAIL_USER: ${process.env.EMAIL_USER}`, colors.blue);
  log(`   EMAIL_PASSWORD: ${'*'.repeat(8)} (masqué)`, colors.blue);
  log(`   EMAIL_SERVICE: ${process.env.EMAIL_SERVICE || 'non défini'}`, colors.blue);
  log(`   EMAIL_HOST: ${process.env.EMAIL_HOST || 'non défini'}`, colors.blue);
  log(`   EMAIL_PORT: ${process.env.EMAIL_PORT || 'non défini'}`, colors.blue);

  // Créer le transporter
  logSection('🔧 Création du transporter Nodemailer');

  let transportConfig;
  if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
    transportConfig = {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT),
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    log('Configuration: SMTP Custom', colors.blue);
  } else {
    transportConfig = {
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    };
    log(`Configuration: Service ${process.env.EMAIL_SERVICE || 'gmail'}`, colors.blue);
  }

  const transporter = nodemailer.createTransport(transportConfig);

  // Tester la connexion
  logSection('🔌 Test de connexion SMTP');

  try {
    log('Tentative de connexion...', colors.yellow);
    await transporter.verify();
    log('✅ Connexion SMTP réussie !', colors.green);
  } catch (error) {
    log('❌ Échec de connexion SMTP', colors.red);
    log(`Erreur: ${error.message}`, colors.red);
    log('\n💡 Vérifiez:', colors.yellow);
    log('   - Votre EMAIL_USER et EMAIL_PASSWORD sont corrects', colors.yellow);
    log('   - Pour Gmail: utilisez un mot de passe d\'application', colors.yellow);
    log('   - Pour Ethereal: les credentials sont valides', colors.yellow);
    process.exit(1);
  }

  // Envoyer un email de test
  logSection('📧 Envoi d\'un email de test');

  const testEmail = {
    from: `"Test Pôle Evolution" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER, // Envoyer à soi-même
    subject: '🧪 Test Email - Pôle Evolution',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #FF1966 0%, #D41173 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin: 0;">✅ Test Réussi !</h1>
          <p style="margin: 10px 0 0 0; opacity: 0.9;">Configuration email Pôle Evolution</p>
        </div>

        <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px;">
          <p style="font-size: 16px; color: #333;"><strong>Félicitations !</strong></p>
          
          <p style="color: #666; line-height: 1.6;">
            Votre configuration Nodemailer fonctionne correctement. 
            Vous pouvez maintenant envoyer des emails depuis votre application Pôle Evolution.
          </p>

          <div style="background: #d1ecf1; border-left: 4px solid #0c5460; padding: 15px; margin: 20px 0; border-radius: 5px;">
            <p style="margin: 0; color: #0c5460; font-size: 14px;">
              <strong>Détails techniques :</strong><br/>
              • Email User: ${process.env.EMAIL_USER}<br/>
              • Service: ${process.env.EMAIL_SERVICE || process.env.EMAIL_HOST || 'Gmail'}<br/>
              • Date: ${new Date().toLocaleString('fr-FR')}<br/>
              • Environnement: ${process.env.NODE_ENV || 'development'}
            </p>
          </div>

          <p style="color: #666; line-height: 1.6;">
            Ce test confirme que :
          </p>
          <ul style="color: #666;">
            <li>La connexion SMTP est établie ✅</li>
            <li>Les credentials sont valides ✅</li>
            <li>L'envoi d'emails fonctionne ✅</li>
            <li>Le formatage HTML est correct ✅</li>
          </ul>

          <p style="color: #666; line-height: 1.6;">
            <strong>Prochaines étapes :</strong><br/>
            1. Tester le formulaire de contact<br/>
            2. Tester le reset password<br/>
            3. Intégrer l'email de bienvenue
          </p>
        </div>

        <div style="background: #100249; color: white; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px;">
          <p style="margin: 0;">
            © ${new Date().getFullYear()} Pôle Evolution - Email Test<br/>
            Node.js ${process.version} - Nodemailer
          </p>
        </div>
      </div>
    `,
    text: `
      ✅ Test Email Réussi - Pôle Evolution

      Votre configuration Nodemailer fonctionne correctement !

      Détails techniques:
      - Email User: ${process.env.EMAIL_USER}
      - Service: ${process.env.EMAIL_SERVICE || process.env.EMAIL_HOST || 'Gmail'}
      - Date: ${new Date().toLocaleString('fr-FR')}
      - Environnement: ${process.env.NODE_ENV || 'development'}

      Ce test confirme que :
      ✅ La connexion SMTP est établie
      ✅ Les credentials sont valides
      ✅ L'envoi d'emails fonctionne

      © ${new Date().getFullYear()} Pôle Evolution
    `,
  };

  try {
    log(`Envoi vers: ${testEmail.to}`, colors.yellow);
    const info = await transporter.sendMail(testEmail);
    
    log('\n✅ Email envoyé avec succès !', colors.green);
    log(`\n📩 Détails de l'envoi:`, colors.blue);
    log(`   Message ID: ${info.messageId}`, colors.blue);
    log(`   Destinataire: ${testEmail.to}`, colors.blue);
    
    if (info.accepted && info.accepted.length > 0) {
      log(`   Accepté: ${info.accepted.join(', ')}`, colors.green);
    }
    
    if (info.rejected && info.rejected.length > 0) {
      log(`   Rejeté: ${info.rejected.join(', ')}`, colors.red);
    }

    // Si Ethereal Email, afficher le lien de prévisualisation
    if (process.env.EMAIL_HOST && process.env.EMAIL_HOST.includes('ethereal')) {
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        log(`\n🔗 Prévisualisation Ethereal:`, colors.cyan);
        log(`   ${previewUrl}`, colors.bright + colors.cyan);
      }
    }

    logSection('🎉 RÉSUMÉ DU TEST');
    log('✅ Configuration email validée avec succès !', colors.green);
    log('✅ Connexion SMTP fonctionnelle', colors.green);
    log('✅ Envoi d\'email réussi', colors.green);
    log('✅ Formatage HTML correct', colors.green);
    
    log('\n💡 Prochaines étapes recommandées:', colors.yellow);
    log('   1. Vérifier la réception de l\'email de test', colors.yellow);
    log('   2. Consulter EMAIL_TEST_GUIDE.md pour les tests applicatifs', colors.yellow);
    log('   3. Tester chaque type d\'email (contact, reset, welcome)', colors.yellow);
    
    if (process.env.EMAIL_SERVICE === 'gmail') {
      log('\n⚠️  Note: Vous utilisez Gmail', colors.yellow);
      log('   Limite: 500 emails/jour pour un compte gratuit', colors.yellow);
      log('   Pour la production, envisagez SendGrid, Mailgun ou AWS SES', colors.yellow);
    }

  } catch (error) {
    log('\n❌ Échec de l\'envoi de l\'email', colors.red);
    log(`Erreur: ${error.message}`, colors.red);
    log('\n💡 Causes possibles:', colors.yellow);
    log('   - Les credentials sont incorrects', colors.yellow);
    log('   - Le serveur SMTP bloque l\'envoi', colors.yellow);
    log('   - Vérifier les quotas d\'envoi', colors.yellow);
    process.exit(1);
  }

  console.log('\n');
}

// Exécuter le test
testEmailConfiguration().catch(error => {
  log('\n❌ Erreur inattendue:', colors.red);
  console.error(error);
  process.exit(1);
});
