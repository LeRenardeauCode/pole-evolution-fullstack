# 🚀 Démarrage Rapide - Tests Email

## ⚡ Configuration en 5 minutes

### 1️⃣ Créer un compte Ethereal Email (service de test gratuit)

```bash
# Ouvrir dans le navigateur:
https://ethereal.email/create
```

Vous obtiendrez des credentials comme :
```
Username: rusty.bayer88@ethereal.email
Password: 9BXbxYFNNdQCVjK2T6
```

### 2️⃣ Configurer le `.env`

Modifier `backend/.env` :

```env
# Commenter ou supprimer EMAIL_SERVICE
# EMAIL_SERVICE=gmail

# Ajouter les credentials Ethereal:
EMAIL_HOST=smtp.ethereal.email
EMAIL_PORT=587
EMAIL_USER=rusty.bayer88@ethereal.email
EMAIL_PASSWORD=9BXbxYFNNdQCVjK2T6

# S'assurer que ces variables sont définies:
FRONTEND_URL=http://localhost:3000
TELEPHONE_CONTACT=07 67 26 94 71
```

### 3️⃣ Tester la configuration

```bash
cd backend
node test-email.js
```

**Résultat attendu :**
```
✅ Configuration email validée avec succès !
✅ Connexion SMTP fonctionnelle
✅ Envoi d'email réussi
✅ Formatage HTML correct

🔗 Prévisualisation Ethereal:
   https://ethereal.email/message/...
```

### 4️⃣ Visualiser l'email

1. Copier l'URL de prévisualisation affichée
2. Ou aller sur https://ethereal.email/messages
3. Voir l'email envoyé avec preview HTML

### 5️⃣ Tester le formulaire de contact

```bash
# Terminal 1 - Démarrer le backend
cd backend
npm run dev

# Terminal 2 - Envoyer un message test
curl -X POST http://localhost:5000/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "nom": "Test",
    "prenom": "User",
    "email": "test@example.com",
    "sujet": "Test Email System",
    "message": "Ceci est un test du système d email."
  }'
```

**Résultat attendu :**
- ✅ Console backend : logs d'envoi email
- ✅ Ethereal: 2 nouveaux emails
  - Email 1: Notification admin
  - Email 2: Confirmation utilisateur

### 6️⃣ Tester le reset password

```bash
# Demander un reset password
curl -X POST http://localhost:5000/api/auth/forgot-password \
  -H "Content-Type: application/json" \
  -d '{"email": "marie.dupont@example.com"}'
```

**Résultat attendu :**
- ✅ Email reçu sur Ethereal
- ✅ Contient un lien avec token
- ✅ Design HTML avec gradient rose

---

## 📋 Checklist Tests

### Configuration de base
- [ ] Variables `.env` configurées
- [ ] `node test-email.js` réussit
- [ ] Email de test reçu sur Ethereal

### Formulaire de Contact
- [ ] Backend démarre sans erreur
- [ ] Message enregistré en BDD
- [ ] Email admin reçu sur Ethereal
- [ ] Email confirmation reçu sur Ethereal
- [ ] Design HTML correct (gradient + logo)
- [ ] Lien "Répondre" présent dans email admin

### Reset Password
- [ ] Endpoint `/api/auth/forgot-password` fonctionne
- [ ] Email reçu sur Ethereal
- [ ] Lien de reset présent
- [ ] Token dans l'URL
- [ ] Design cohérent avec la charte

### Email de Bienvenue (optionnel)
- [ ] Fonction `sendWelcomeEmail` créée ✅
- [ ] Intégration dans `register()` (TODO)
- [ ] Email envoyé lors inscription
- [ ] Lien validation email présent

---

## 🐛 Problèmes connus

### "ECONNREFUSED"
**Solution :** Vérifier `EMAIL_HOST` et `EMAIL_PORT` dans`.env`

### "Invalid login"
**Solution :** Regénérer les credentials sur https://ethereal.email/create

### Emails non visibles sur Ethereal
**Solution :** Actualiser la page https://ethereal.email/messages

### Backend plante au démarrage
**Solution :** Vérifier que toutes les variables sont définies dans `.env`

---

## 🎯 Pour aller en production

Quand tout fonctionne en dev avec Ethereal :

### Option 1 : Gmail (simple)
```env
EMAIL_SERVICE=gmail
EMAIL_USER=votre-email@gmail.com
EMAIL_PASSWORD=xxxx xxxx xxxx xxxx  # Mot de passe d'application
```

### Option 2 : SendGrid (recommandé)
```env
EMAIL_HOST=smtp.sendgrid.net
EMAIL_PORT=587
EMAIL_USER=apikey
EMAIL_PASSWORD=votre-sendgrid-api-key
```

### Option 3 : AWS SES (évolutif)
```env
EMAIL_HOST=email-smtp.eu-west-1.amazonaws.com
EMAIL_PORT=587
EMAIL_USER=votre-iam-user
EMAIL_PASSWORD=votre-iam-password
```

---

## 📞 Support

**Erreur dans les tests ?**
1. Consulter `EMAIL_TEST_GUIDE.md` (guide complet)
2. Vérifier les logs backend (`console.log`)
3. Tester avec un nouveau compte Ethereal
4. Vérifier que Nodemailer est installé (`npm list nodemailer`)

---

**Date :** 13 février 2026  
**Version :** 1.0.0
