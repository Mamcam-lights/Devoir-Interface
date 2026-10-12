# API du Port de Plaisance de Russell
Application web de gestion des réservations de catways pour la capitainerie du port de plaisance de Russell : API privée Express/MongoDB, tableau de bord et documentation.

-**Site déployé** : <https://devoir-interface.onrender.com>
-**Documentation de l'API** : <https://devoir-interface.onrender.com>/api-docs

## Fonctionnalités

- Gestion des **catways** : créer, lister, consulter, modifier l'état, supprimer
- Gestion des **réservations** par catway, avec contrôle des dates et des chevauchements
- Gestion des **utilisateurs** : mots de passe hachés (bcrtpt)
- **Authentification** par jwt stocké dans un cookie (`/login`, `/logout`)
- Page d'acceuil avec connexion et tableau de bord (CRUD)
- Documenttation Swagger

## Technologies

Node.js, Express, MongoDB (Atlas), Mongoose, bcrypt, jsonwebtoken, cooki-parser, env-cmd, Swagger UI.

## Installation
```bash
git clone < https://github.com/Mamcam-lights/Devoir-Interface >
cd Devoir-Interface/russell-api
npm install
```

## Configuration 
Créer un dossier `env/` avec un fichier ` .env.dev` :

```
Port=3000
Mongo_URI=<chaine de connexion MongoDB>
JWT_SECRET=<phrase secrète>
```
Importe les données d'example ` catways.json ` et ` reservation.json ` dans les collections ` catways` et ` reservations` de la base.

## Lancement

```bash
npm run dev          # développement (nodemon + .env.dev)
npm start            # production
```

Le serveur démarre sur http://localhost:3000.

## Routes principales
| Méthode | Route | Description |
|---|---|---|
|POST | /login | Connexion |
| GET | /logout | Déconnexion |
| GET, POST | /catways | Lister, créer |
| GET, PUT, DELETE | /catways/:id | Détails, modifier l'état, supprimer |
| GET, POST, | /catways/:id/reservations | Lister, créer |
| GET, PUT, DELETE | /catways/:id/reservations/:idreservation | Détails, modifier, supprimer |
| GET, POST | /users | Lister, créer |
| GET, PUT, DELETE | /users/: email | Détails, modifier, supprimer |

Toutes les routes sauf `/login` et `/logout`, nécessitent d'être connecté. Le details est dans la documentation Swagger.

## Auteure
<CAMARA MARIAM> - projet de formation, centre euproéen de formation