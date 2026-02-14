# 📧 Guide de Configuration et Test des Emails - Pôle Evolution

## 📋 Vue d'ensemble

Le système d'emails de Pôle Evolution gère 4 types d'envois :
1. **Email de bienvenue** (création de compte + validation email)
2. **Reset password** (mot de passe oublié)
3. **Formulaire de contact** (notification admin + confirmation utilisateur)
4. **Notifications admin** (via le système de notifications)

---

## 🔧 Configuration des Variables d'Environnement

### Fichier `.env` (backend)

```env
# Email Configuration
EMAIL_SERVICE=gmail
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=votre-mot-de-passe-application
EMAIL_FROM=Pole Evolution <contact@pole-evolution.fr>

# Frontend URL (pour les liens dans les emails)
FRONTEND_URL=http://localhost:3000

# Contact Info (affiché dans les emails)
TELEPHONE_CONTACT=07 67 26 94 71
ADRESSE_STUDIO=123 Rue de la Danse, 62136 Lestrem
```

---

## 🧪 Option 1 : Test avec Ethereal Email (RECOMMANDÉ pour dev)

**Avantages :**
- ✅ Gratuit et sans limite
- ✅ Pas besoin de vrai compte email
- ✅ Visualisation des emails envoyés
- ✅ Aucun risque d'envoi accidentel

### Étapes de configuration :

1. **Créer un compte de test** : https://ethereal.email/create

2. **Copier les credentials générés** et les mettre dans `.env` :
   ```env
   EMAIL_SERVICE=
   EMAIL_HOST=smtp.ethereal.email
   EMAIL_PORT=587
   EMAIL_USER=votre-user@ethereal.email
   EMAIL_PASSWORD=votre-password-ethereal
   ```

3. **Modifier `emailService.js`** temporairement :
   ```javascript
   const transporter = nodemailer.createTransport({
     host: process.env.EMAIL_HOST || 'smtp.ethereal.email',
     port: process.env.EMAIL_PORT || 587,
     auth: {
       user: process.env.EMAIL_USER,
       pass: process.env.EMAIL_PASSWORD,
     },
   });
   ```

4. **Consulter les emails** : https://ethereal.email/messages
   - Tous les emails "envoyés" apparaissent ici
   - Visualisation HTML + Texte brut
   - Inspection du code source

---

## 📮 Option 2 : Gmail (pour PRODUCTION)

### 1️⃣ Activer l'authentification à 2 facteurs sur Gmail

### 2️⃣ Générer un mot de passe d'application :
- Aller sur : https://myaccount.google.com/apppasswords
- Sélectionner "Mail" et "Autre"
- Nom : "Pole Evolution Backend"
- Copier le mot de passe généré (16 caractères)

### 3️⃣ Configuration `.env` :
```env
EMAIL_SERVICE=gmail
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
```

### ⚠️ Limitations Gmail :
- **500 emails/jour** (compte gratuit)
- **100 emails/jour** (G Suite)
- Risque de blocage si trop d'envois rapides

---

## 🧪 Tests Manuels

### Test 1 : Formulaire de Contact

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Tester l'endpoint
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Dupont",
    "prenom": "Marie",
    "email": "marie.test@example.com",
    "telephone": "0612345678",
    "sujet": "Test Email",
    "message": "Ceci est un test de formulaire de contact."
  }'
```

**Résultat attendu :**
- ✅ Message enregistré en BDD
- ✅ Notification créée dans le système
- ✅ Email envoyé à l'admin (votre EMAIL_USER)
- ✅ Email de confirmation envoyé à marie.test@example.com

### Test 2 : Reset Password

1. **Créer un compte test ou utiliser un existant**

2. **Demander reset password :**
   ```bash
   curl -X POST http://localhost:5000/api/auth/forgot-password \
     -H "Content-Type: application/json" \
     -d '{
       "email": "marie.dupont@example.com"
     }'
   ```

3. **Vérifier l'email reçu** avec le bouton "Réinitialiser mon mot de passe"

4. **Cliquer sur le lien** ou tester manuellement :
   ```
   http://localhost:3000/reset-password?token=XXXX&email=marie.dupont@example.com
   ```

### Test 3 : Email de Bienvenue (TODO)

> ⚠️ **Note :** La fonction `sendWelcomeEmail` est créée mais **pas encore intégrée** dans le controller auth.

**Pour l'intégrer :** Modifier `auth.controller.js` dans la fonction `register()` :

```javascript
import { sendWelcomeEmail } from '../utils/emailService.js';

// Dans register(), après création de l'utilisateur :
const validationToken = crypto.randomBytes(32).toString('hex');
user.tokenVerificationEmail = validationToken;
await user.save();

const validationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${validationToken}&email=${email}`;

try {
  await sendWelcomeEmail({
    email: user.email,
    prenom: user.prenom,
    validationUrl
  });
} catch (emailError) {
  console.error('Erreur envoi email bienvenue:', emailError.message);
}
```

---

## 🎯 Checklist de Vérification

### Configuration de base
- [ ] Variables `.env` configurées
- [ ] `EMAIL_USER` et `EMAIL_PASSWORD` renseignés
- [ ] `FRONTEND_URL` correct (http://localhost:3000 en dev)
- [ ] Backend démarre sans erreur

### Test Formulaire Contact
- [ ] Message enregistré en BDD
- [ ] Notification admin créée
- [ ] Email reçu par l'admin
- [ ] Email de confirmation reçu par l'utilisateur
- [ ] HTML correctement formaté
- [ ] Bouton "Répondre" fonctionne

### Test Reset Password
- [ ] Email reçu avec lien de reset
- [ ] Lien redirige vers la bonne page
- [ ] Token valide pendant 30 minutes
- [ ] Reset fonctionne correctement
- [ ] Message de succès affiché

### Test Email de Bienvenue (quand intégré)
- [ ] Email envoyé lors de l'inscription
- [ ] Lien de validation présent
- [ ] Design cohérent avec la charte

---

## 🐛 Dépannage

### Erreur : "Invalid login: 535-5.7.8 Username and Password not accepted"
**Solution :** Vérifier que le mot de passe d'application Gmail est correct (16 caractères sans espaces)

### Emails non reçus (Gmail)
**Solutions :**
- Vérifier le dossier Spam
- Vérifier les quotas Gmail (500/jour)
- Attendre quelques minutes (délai Gmail)

### Erreur : "ECONNREFUSED"
**Solution :** Vérifier que `EMAIL_HOST` et `EMAIL_PORT` sont corrects (smtp.gmail.com:587)

### Emails avec mise en forme cassée
**Solution :** Les templates HTML sont inline-CSS, devraient fonctionner partout. Si problème, vérifier la console backend.

---

## 📊 Monitoring en Production

### Logs à surveiller
```javascript
// Backend logs
console.log('Email envoyé avec succès'); // ✅
console.error('Erreur envoi email:', error); // ❌
```

### Recommandations Production
1. **Utiliser un service SMTP professionnel** :
   - SendGrid (100 emails/jour gratuit)
   - Mailgun (5000 emails/mois gratuit)
   - AWS SES (62000 emails/mois gratuit)

2. **Ajouter un système de queue** (Bull, Bee-Queue) pour :
   - Retry automatique en cas d'échec
   - Rate limiting
   - Logs détaillés

3. **Monitoring** :
   - Taux de délivrabilité
   - Bounces
   - Opens/clicks (si tracking activé)

---

## 🚀 Commandes Rapides

```bash
# Tester la config email
node -e "console.log(require('dotenv').config()); console.log(process.env.EMAIL_USER);"

# Lancer le backend en mode debug
DEBUG=nodemailer:* npm run dev

# Voir les logs en temps réel
tail -f logs/email.log  # (si logs configurés)
```

---

## 📞 Support

En cas de problème :
1. Vérifier ce guide
2. Consulter les logs backend
3. Tester avec Ethereal Email d'abord
4. Contacter l'équipe technique

---

**Date de dernière mise à jour :** 13 février 2026
**Version :** 1.0.0
