# Photobox

Site web de visualisation de photos alimenté par une API

## Installation sur machine personnelle

Pour utiliser au mieux photobox : 
dans le dossier `/js` utiliser la commande 

		npm install

afin d'installer l'ensemble des modules nécessaires au bon fonctionnement de photobox.

La plupart des navigateurs nécessitent des URL débutant par http(s) pour exécuter les scripts, il est donc nécessaire d'avoir accès à un serveur (même localhost)

#### Requêtes POST 
Le serveur WebEtu ne laissant pas l'accès aux requêtes POST depuis les réseaux extérieurs, il est nécessaire 
- soit d'héberger le site sur le serveur webEtu, 
- soit d'utiliser sa version locale depuis le réseau de l'IUT

#### Dépendances

- Axios : gestion des promesses et requêtes
- FontAwesome : icônes

## Version en ligne du projet

[Accès WebEtu](https://webetu.iutnc.univ-lorraine.fr/www/keller73u/photobox/)

## Fonctionnalités

- Accès au travers de l'API à différentes informations sur les photos
- Affichage de liste de photos
- Affichage de la lightbox
- Navigation entre les différentes galeries
- Affichage de détails sur les photos
- Affichage des commentaires sur les photos
- Ajout de commentaires sur chacun des photos
- Navigation depuis la lightbox
- Pagination gérée avec la navigation de la lightbox


### Fonctionnalité(s) supplémentaire(s) :

- Choix de la taille des miniatures


Keller Guillaume @ IUTNC 2019-2020