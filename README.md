
# API

## Install
* Install node, npm & sqlite3
* Run `npm install`
* Set a secret in config.js

## Setup
Décommenter le bloc /setup pour initialiser le serveur.  
A la racine, lancer node app/server.js

Appeler `GET/ http://localhost:8080/setup` afin de créér la table user

## Créer un utilisateur :
`POST/ http://localhost:8080/api/users/create`
**Headers :**
Content-Type application/x-www-form-urlencoded

**Body :** 
username : "username"  
password : "password"  
mail : "mail@mail.fr"

## Authentification :
`POST/ http://localhost:8080/api/authenticate`
**Headers :**
Content-Type application/x-www-form-urlencoded

**Body :** 
username : "username"  
password : "password"  
