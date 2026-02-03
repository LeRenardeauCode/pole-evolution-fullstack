# PROMPTS ASSISTANT TECHNIQUE - NE GÉNÈRE JAMAIS DE CODE
Rôle : ANALYSE, DEBUG, REFACTOR, TESTS, OPTIMISATION.
Respecte dictionnaire données + cahier des charges.

## 🐛 DEBUGGING

Debug [CODE SELECTIONNÉ]. Erreur : [MESSAGE ERREUR].
Contexte : [FICHIER/LIGNE]. Vérifie :

1. Mongoose schema/validation/indexes

2. Express middleware order (helmet/cors/auth)

3. React useEffect deps/states

4. MongoDB populate/$lookup/aggregation

5. Sécurité JWT/rate-limit/input sanitization
Checklist correction + impact perf/sécurité.


## 🔄 REFACTORISATION

Refactorise [CODE/FONCTION]. Objectifs : [perf/sécurité/readability/maintenabilité].
Vérifie respect dictionnaire données + Mongoose schemas.
Propose :

1. Structure avant/après

2. Avantages (perf, sécurité, lisibilité)

3. Tests à ajouter

4. Impact API frontend


## 🧪 TESTS UNITAIRES

Analyse [FONCTION/COMPONENT/ROUTE]. Test cases Jest/RTL :

1. Happy path

2. Edge cases (null/undefined/empty)

3. Erreurs 400/401/500

4. Mocks nécessaires (mongoose/axios)

5. Couverture attendue 80%+
Checklist mocks + assertions.


## ⚡ PERFORMANCE

Optimise [FONCTION/QUERY/COMPONENT]. Problèmes identifiés :

- MongoDB : indexes manquants ? populate vs aggregation ?

- React : re-renders inutiles ? useMemo/useCallback ?

- API : N+1 queries ? pagination ?
Checklist optim + métriques avant/après.


## 🔒 SÉCURITÉ

Audit sécurité [CODE/ROUTE]. Vérifie :

1. JWT middleware (role:admin)

2. Input validation/sanitization

3. Helmet headers CSP

4. Rate limiting

5. MongoDB injection ($regex, $where)

6. RGPD (consentement, durée conservation)
Checklist correctifs + priorités.


## 📱 MOBILE/RESPONSIVE

Analyse responsive [COMPONENT MUI]. Problèmes :

1. Grid breakpoints (xs/sm/md)

2. Typography scaling

3. Touch targets (boutons/forms)

4. FullCalendar mobile
Checklist MUI Theme + media queries.


## 🐳 DOCKER/DEPLOY

Debug [docker-compose.yml/Dockerfile]. Erreur : [MESSAGE].
Vérifie :

1. Ports exposés (3000 frontend, 5000 backend, 27017 mongo)

2. Volumes persistants

3. Env vars (MONGO_URI, JWT_SECRET)

4. Healthchecks
Checklist fix + .env.example.


## 🚨 ERREURS FREQUENTES POLE EVOLUTION

Problèmes connus :

- placesRestantes : findOneAndUpdate atomique requis

- Planning : FullCalendar refetch après réservation

- Auth : middleware order helmet→cors→auth

- MUI : ThemeProvider manquant

- MongoDB : populate('idCours') vs lean()
undefined
