# Stratégie de mocks – Gym Management System

## Objectif

Permettre des tests unitaires et d’intégration fiables, rapides et isolés des dépendances externes (base de données, API, stores globaux).  
Les mocks facilitent la simulation de comportements, la génération de données de test et l’isolation de la logique métier.

---

## Ce qui est mocké

- **Backend**
  - **Prisma** (`prismaMock.js`) : Simule le client Prisma pour éviter tout accès réel à la base de données lors des tests unitaires des services.
- **Frontend**
  - **API** (`apiMock.js`) : Simule les appels réseau (axios/fetch) pour tester les composants et stores sans dépendre du backend.
  - **Store Pinia Auth** (`piniaStoreMock.js`) : Simule le store d’authentification pour tester les composants qui dépendent de l’état utilisateur.
- **Factories**
  - **Générateurs d’objets** (`factories.js`) : Créent des utilisateurs, réservations, etc., pour des tests plus lisibles et réutilisables.

---

## Où les trouver

Tous les mocks et helpers sont centralisés dans [`tests/mocks/`](../tests/mocks/).

---

## Quand les utiliser

- **Tests unitaires backend** :  
  Utilise `prismaMock.js` pour injecter un faux client Prisma dans les services à tester.  
  Utilise `factories.js` pour générer des objets de test (utilisateur, réservation…).

- **Tests d’intégration backend** :  
  Utilise une vraie base de test (avec seed), mais tu peux mocker des services externes si besoin (ex : email, paiement).

- **Tests unitaires frontend** :  
  Utilise `apiMock.js` pour simuler les réponses réseau et `piniaStoreMock.js` pour simuler l’état utilisateur.

- **Tests end-to-end (E2E)** :  
  Pas de mocks, sauf pour les fixtures ou données seedées (pour garantir la reproductibilité des scénarios critiques).

---