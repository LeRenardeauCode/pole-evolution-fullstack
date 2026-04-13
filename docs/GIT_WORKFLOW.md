# Workflow Git

## Branches

- `main` : branche de production
- `develop` : branche d'intégration
- `feature/*` : nouvelle fonctionnalité
- `hotfix/*` : correctif urgent lié à la production

## Règle simple d'intervention

### Nouvelle évolution
1. Se baser sur `develop`
2. Créer une branche `feature/nom-court`
3. Développer et tester
4. Ouvrir une PR vers `develop`
5. Recetter sur `develop`
6. Fusionner `develop` vers `main` pour livrer

### Correctif urgent production
1. Créer `hotfix/nom-court` depuis `main`
2. Corriger et tester
3. Fusionner vers `main`
4. Reporter le correctif vers `develop`

## Bonnes pratiques

- ne jamais coder directement sur `main`
- garder les PR petites et lisibles
- vérifier build et tests avant merge
- utiliser des messages de commit explicites

## Checklist avant merge vers `main`

- lint frontend OK
- tests backend/frontend OK
- build frontend OK
- variables d'environnement documentées
- impacts prod identifiés
