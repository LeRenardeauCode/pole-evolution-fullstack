# 📧 Configuration Email avec Gmail

Ce guide explique comment configurer **nodemailer avec Gmail** pour l'envoi d'emails en production.

## ⚠️ Important : Mot de passe d'application

**N'utilisez JAMAIS votre mot de passe Gmail principal !**  
Google exige l'utilisation d'un **"Mot de passe d'application"** pour des raisons de sécurité.

---

## 🔐 Étape 1 : Activer la validation en deux étapes

1. Allez sur : **https://myaccount.google.com/security**
2. Dans la section **"Connexion à Google"**, cliquez sur **"Validation en deux étapes"**
3. Suivez les instructions pour l'activer (obligatoire pour créer des mots de passe d'application)

---

## 🔑 Étape 2 : Générer un mot de passe d'application

1. Allez sur : **https://myaccount.google.com/apppasswords**
2. Connectez-vous si demandé
3. Dans **"Sélectionner l'application"**, choisissez **"Autre (nom personnalisé)"**
4. Saisissez : `Pole Evolution Backend`
5. Cliquez sur **"Générer"**
6. Google affiche un mot de passe de **16 caractères** (format : `xxxx xxxx xxxx xxxx`)
7. **Copiez ce mot de passe immédiatement** (il ne sera plus accessible après)

---

## ⚙️ Étape 3 : Configuration du fichier .env

Éditez votre fichier `backend/.env` :

```env
EMAIL_SERVICE=gmail
EMAIL_USER=jelvibm@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx
EMAIL_FROM=Pole Evolution <jelvibm@gmail.com>
```

**Remplacez** :
- `EMAIL_PASSWORD` par le mot de passe d'application généré à l'étape 2
- Les espaces dans le mot de passe sont optionnels (vous pouvez les retirer)

---

## ✅ Étape 4 : Tester l'envoi d'email

### Option 1 : Via l'inscription d'un utilisateur

1. Démarrez le serveur backend : `npm start` (depuis `backend/`)
2. Créez un compte utilisateur via l'API `/api/auth/register`
3. Vérifiez la réception de l'email de bienvenue dans la boîte de réception

### Option 2 : Via une inscription frontend

1. Utilisez votre formulaire d'inscription
2. Vérifiez l'email de bienvenue

---

## 📋 Configuration complète

Voici les différentes fonctions d'envoi d'email disponibles :

| Fonction | Déclencheur | Email envoyé |
|----------|-------------|--------------|
| `sendWelcomeEmail` | Inscription utilisateur | Email de bienvenue avec lien de vérification |
| `sendResetPasswordEmail` | Mot de passe oublié | Email de réinitialisation |
| `sendContactNotificationToAdmin` | Message de contact | Notification admin |
| `sendContactConfirmationToUser` | Message de contact | Confirmation utilisateur |
| `sendReservationNotificationToAdmin` | Nouvelle réservation | Notification admin |
| `sendReservationConfirmationToUser` | Nouvelle réservation | Confirmation utilisateur |

---

## 🔍 Dépannage

### Erreur : "Invalid login: 535-5.7.8 Username and Password not accepted"

**Solution** : Vérifiez que vous utilisez bien un mot de passe d'application, pas votre mot de passe principal.

### Erreur : "Missing credentials"

**Solution** : Vérifiez que les variables `EMAIL_USER` et `EMAIL_PASSWORD` sont bien définies dans `.env`

### Les emails ne sont pas reçus

1. Vérifiez d'abord le dossier **Spam/Courrier indésirable**
2. Vérifiez que l'adresse `jelvibm@gmail.com` est correcte
3. Consultez les logs du serveur pour voir les erreurs éventuelles

### Limite d'envoi Gmail

Gmail a des limites :
- **500 emails/jour** pour un compte Gmail gratuit
- **2000 emails/jour** pour Google Workspace

Pour une application en production à fort volume, envisagez :
- **SendGrid** (100 emails/jour gratuits)
- **Mailgun** (premiers 10 000 emails gratuits)
- **AWS SES** (très économique)

---

## 🔒 Sécurité

### ✅ Bonnes pratiques

- ✅ Utilisez un mot de passe d'application
- ✅ Ne committez JAMAIS le fichier `.env` (il est dans `.gitignore`)
- ✅ Utilisez des variables d'environnement en production
- ✅ Changez le mot de passe d'application si compromis

### ❌ À éviter

- ❌ Ne partagez jamais votre mot de passe d'application
- ❌ N'utilisez pas votre mot de passe Gmail principal
- ❌ Ne hardcodez jamais les credentials dans le code

---

## 📞 Support

En cas de problème persistant :
1. Vérifiez les logs du serveur backend
2. Testez avec un autre compte Gmail si possible
3. Consultez la documentation officielle : https://nodemailer.com/usage/using-gmail/

---

**Date de création** : 15 février 2026  
**Dernière mise à jour** : 15 février 2026  
**Email configuré** : jelvibm@gmail.com
