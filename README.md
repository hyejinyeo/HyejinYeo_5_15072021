# ORINOCO
Projet 5 du parcours développeur web d’OpenClassrooms


## Scénario
Je travaille en tant que développeuse front-end par Orinoco, une entreprise de commerce en ligne. Son credo est se démarquer des grands site e-commerce comme Amazon en créant des applications thématiques ne vendant qu’un seul groupe de produits. Il y a par exemple Oribook pour les livres ou Oritextil pour les vêtements.

Le fondateur de l’entreprise souhaite créer un premier MVP pour démontrer le fonctionnement de ses applications à ses investisseurs. L’équipe est constituée d'une développeuse back-end travaillant sur les API et moi, pour la partie front-end. 

J'ai créé un MVP qui vend des ours en peluche faits à la main - Orinobears 🐻 

L'application web est composée de 4 pages:
- une page de vue sous forme de liste, montrant tous les articles disponibles à la vente ;
- une page “produit”, qui affiche de manière dynamique l'élément sélectionné par l'utilisateur et lui permet de personnaliser le produit et de l'ajouter à son panier ;
- une page “panier” contenant un résumé des produits dans le panier, le prix total et un formulaire permettant de passer une commande ;
- une page de confirmation de commande, remerciant l'utilisateur pour sa commande, et indiquant le prix total et l'identifiant de commande envoyé par le serveur.

## Technologies utilisées
HTML, CSS, Bootstrap, JavaScript

## Compétences acquises
- Création du frontend d'un site e-commerce à partir d'une API existante
- Récupération et envoi des données via une API
- Affichage des produits et de leurs options
- Gestion du panier et de la commande
- Validation des données à l'aide des expressions régulières
- Rédaction d'un plan de tests unitaires

## Instruction
### Prérequis
Vous devrez avoir Node.js et npm installés localement sur votre machine.

### Frontend

1) Clonez ce repository du frontend

### Backend

1) Clonez le repository du backend à partir de l'adresse suivante : https://github.com/OpenClassrooms-Student-Center/JWDP5.git

2) Placez le dossier "JWDP5" dans le dossier frontend.

3) Ouvrez le dossier "JWDP5" dans un terminal et exécutez la commande : 
```bash
npm install
```
4) Puis exécutez la commande :
```bash 
node server
```
Le serveur doit s'exécuter sur localhost avec le port par défaut 3000. Vous aurez un message comme celui-ci sur votre terminal :
```bash
Listening on port 3000
```