# Frontend - Employee Management App

Ce dossier contient l'application frontend de gestion des employés, développée avec **React**.

---

## Fonctionnalités

- Affichage de la liste des employés (consommation de l'API backend)
- Appels API configurables via la variable d'environnement `REACT_APP_API_URL`
- Tests unitaires automatisés avec React Testing Library et Jest
- Dockerisation prête pour la production
- Intégration CI/CD complète (lint, tests, analyse sécurité, build/push image)

---

## Prérequis

- Node.js (>=18) et npm
- (Optionnel) Docker
- (Optionnel) Compte Azure et GitHub pour CI/CD

---

## Installation & Lancement local

1. **Installer les dépendances**

```bash
npm install
```

3. **Lancer l'application**

```bash
npm start
```


## Tests unitaires

Les tests sont situés dans `tests/App.test.js` et couvrent les principaux comportements de l'interface.

### Lancer les tests

```bash
npm test
```

### Détail des tests

- Vérification de l'affichage du titre et de la liste des employés
- Vérification de l'appel à l'API backend
- Gestion du cas où la liste est vide
- Les appels API sont mockés pour garantir des tests rapides et fiables

---

## Docker

Le frontend est prêt à être conteneurisé pour la production.

### Exemple de build et run

```bash
docker build -f Dockerfile.prod -t employee-frontend .
docker run -e REACT_APP_API_URL=... -p 80:80 employee-frontend
```

#### Détail du Dockerfile.prod

- Étape de build avec Node.js
- Build statique de l'application React
- Servi via Nginx en production
- Expose le port 80

---

## Intégration continue (CI) & Analyse de code

L'intégration continue est assurée via **GitHub Actions** avec plusieurs workflows dédiés au frontend :

### Objectifs

- Automatiser la qualité et la sécurité du code à chaque push/PR
- Garantir la non-régression via les tests unitaires
- Générer et publier une image Docker sécurisée

### Étapes de la pipeline CI

- **Lint** du code JavaScript (ESLint)
- **Tests unitaires** avec React Testing Library et Jest
- **Analyse statique de sécurité** avec CodeQL (JavaScript)
- **Scan de vulnérabilités** de l'image Docker avec Trivy
- **Build** de l'image Docker frontend
- **Push** de l'image Docker sur GitHub Container Registry (GHCR) si tout est OK

### Fichiers de workflow principaux

- `.github/workflows/codeql-frontend.yml` : Lint, tests, analyse CodeQL
- `.github/workflows/trivy-frontend.yml` : Scan Trivy de l'image Docker
- `.github/workflows/docker-publish-frontend.yml` : Build & push de l'image Docker frontend

### Secrets nécessaires

- Token GitHub pour push sur GHCR

### Livrables

- Pipeline CI fonctionnelle
- Images Docker frontend disponibles sur GHCR
- Rapport de tests généré à chaque exécution de la CI

---

## Structure des fichiers

- `src/App.js` : Composant principal React
- `src/index.js` : Point d'entrée de l'application
- `src/index.css` : Styles CSS
- `tests/App.test.js` : Tests unitaires
- `Dockerfile.prod` : Image Docker pour la production
- `.github/workflows/` : Pipelines CI/CD GitHub Actions

---
