# Strategie de tests – Gym Management System

## 1. Introduction

Le projet **Gym Management System** est une application fullstack de gestion de salle de sport. Elle permet aux utilisateurs de consulter leur abonnement, réserver ou annuler des cours, et aux administrateurs de gérer les utilisateurs, les cours et les abonnements. Elle s'appuie sur une architecture moderne :

- **Frontend** : Vue.js 3 + Pinia + Vue Router
- **Backend** : Node.js + Express + Prisma (PostgreSQL)
- **DevOps** : Docker, Nginx, CI/CD

Cette stratégie vise à garantir la **fiabilité**, la **robustesse** et la **sécurité** de l'application via des tests couvrant l'ensemble des couches (front et back) et typologies (unitaires, intégration, E2E, charge, sécurité).

---

## 2. Fonctionnalités critiques

|          Fonctionnalité          |                            Description                             | Criticité  |
|----------------------------------|--------------------------------------------------------------------|------------|
| Réservation de cours             | Prise en compte des conflits horaires, vérification de la capacité | Forte      |
| Annulation / no-show             | Politique d'annulation (2h avant) et pénalités                     | Forte      |
| Gestion des abonnements          | Types d'abonnements et conséquences sur les droits                 | Forte      |
| Authentification / Autorisation  | Connexion, JWT, rôles, accès restreints                            | Forte      |
| Facturation                      | Calcul dynamique avec pénalités selon les no-shows                 | Moyenne    |
| Dashboard admin                  | Statistiques (revenus, réservations), actions sur les utilisateurs | Moyenne    |
| Dashboard utilisateur            | Activité personnelle, historique, abonnements                      | Faible     |

---

## 3. Couverture par typologie de test

### Tests Unitaires (TU)
- **Quoi** : Ciblent principalement les services backend, avec tests précis sur les méthodes de `bookingService`, `subscriptionService`, `userService`, etc. Côté frontend, tests sur les fonctions du store Pinia (`auth.js`), les services d'appel API (`gymService.js`), et composants Vue complexes (ex : formulaires avec validation).
- **Pourquoi** : Garantir que la logique métier (calculs, vérifications, transformations) est correcte, isolée de toute dépendance (DB, réseau).
- **Outils** : Jest (backend), Vitest (frontend)
- **Exclusions** : Composants Vue purement visuels ou statiques (ex : cartes d'information), fichiers de configuration

### Tests d'intégration (TI)
- **Quoi** : Endpoints REST backend (auth, bookings, classes), mécanismes Prisma, logique des middlewares, chaîne route > controller > service > repo.
- **Pourquoi** : Vérifier que l'application backend fonctionne comme un tout cohérent, avec base de données et logique réelle.
- **Outils** : Supertest + Jest + seed de données PostgreSQL
- **Exclusions** : Routes simples retournant un tableau sans logique métier (GET /classes non filtré, etc.)

### Tests end-to-end (E2E)
- **Quoi** : Scénarios utilisateur critiques, par rôle :
- **Utilisateur** : Connexion / Déconnexion, création / annulation de réservation, affichage du dashboard, vérification de l'abonnement, consultation de l'historique
- **Administrateur** : Accès au dashboard admin, création / suppression de cours, gestion des utilisateurs et abonnements
- **Pourquoi** : S'assurer que l'application est fonctionnelle dans des scénarios réels et complets, incluant l'UI et l'API.
- **Outils** : Playwright ou Cypress avec fixtures ou seed de données
- **Exclusions** : Pages sans interactions critiques ni actions utilisateur (ex : mentions légales, CGU, pages d'accueil informatives)

### Tests de charge
- **Quoi** : Réservations massives, connexion simultanée, suppression groupée
- **Pourquoi** : Détecter les goulets d'étranglement backend
- **Outils** : K6 (load/stress/soak), JMeter (spike)
- **Exclusions** : Frontend, qui ne subit pas directement les effets de la charge serveur

### Tests de sécurité
- **Quoi** : Authentification, accès API, dépendances, injection
- **Pourquoi** : Éviter les failles et vulnérabilités critiques
- **Outils** : OWASP ZAP, npm audit, eslint-plugin-security
- **Exclusions** : Composants publics sans interaction sensible (ex : mentions légales, CGU)

---

## 4. Approche par couche

| Couche    | Tests couverts  | Spécificités           |
|-----------|-----------------|------------------------|
| Backend   | TU, TI, charge, | Services, contrôleurs, |
|           | sécurité        | DB, auth               |
|           |                 |                        |
| Frontend  | TU, E2E         | Vues critiques,        |
|           |                 | navigation, store      |
---

## 5. Planification et priorités

| Ordre |            Tâche             |               Détails                |
|-------|------------------------------|--------------------------------------|
|   1	  |  Tests unitaires backend	   | Services : règles métier critiques   |
|   2	  |  Tests d'intégration backend | API + Prisma                         |
|   3	  |  Tests unitaires frontend	   | Store, services Vue                  |
|   4	  |  Tests end-to-end frontend	 | Login, réservation, admin dashboard  |
|   5	  |  Tests de charge backend	   | Scénarios réalistes avec K6/JMeter   |
|   6	  |  Tests de sécurité backend   | Scanners et analyse                  |

---

## 6. Indicateurs de succès

|        Indicateur        |              Objectif               |
|--------------------------|-------------------------------------|
| Couverture TU backend    | ≥ 80% services métier critiques     |
| Couverture frontend      | ≥ 70% composants sensibles          |
| Succès E2E               | 100% des parcours critiques passent |
| Temps de réponse API     | < 300ms pour 95% des requêtes       |
| Charge soutenue          | 500 req/s pendant 5+ minutes        |
| Vulnérabilité critique   | Aucune selon audit/npm/ZAP          |    

