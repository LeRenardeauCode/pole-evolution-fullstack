# Maintenance

## Monitoring léger

Le projet supporte un monitoring optionnel avec Sentry.

### Activation backend
- renseigner `SENTRY_DSN`
- redéployer le backend

### Activation frontend
- renseigner `VITE_SENTRY_DSN`
- redéployer le frontend

## Contact et anti-spam

Le formulaire de contact supporte un CAPTCHA conditionnel.

### Activation
- renseigner `RECAPTCHA_SECRET_KEY`
- renseigner `VITE_RECAPTCHA_SITE_KEY`
- redéployer frontend et backend

Sans ces clés, le formulaire continue de fonctionner sans CAPTCHA.

## Points de contrôle réguliers

- endpoint `/health`
- envoi du formulaire de contact
- connexion utilisateur
- réservation membre et invité
- accès au back-office admin

## Journal d'intervention recommandé

Pour chaque intervention en production, noter :

- date
- branche utilisée
- objectif
- fichiers touchés
- tests réalisés
- résultat du déploiement
