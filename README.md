# groupomania-P7

Mission: <br> 
-> Création d'un réseau social interne pour les employés de Groupomania afin de pour favoriser les échanges entre collègues.

Objectifs: <br> 
-> Authentifier un utilisateur et maintenir sa session <br>
-> Personnaliser le contenu envoyé à un client web <br>
-> Gérer un stockage de données à l'aide de SQL <br>
-> Implémenter un stockage de données sécurisé en utilisant SQ <br>

Technologies utilisées: <br>
-> HTML, CSS, JavaScript, Vue.js, Node.js, Express.js, MySQL et SQL <br>

Pour pouvoir utiliser ce repo vous devez avoir installé en amont sur votre machine: <br>
-> Nodejs version 12 ou ulterieure, Mysql, vue CLI <br>


Frontend : <br>
-> A partir du dossier frontend, exécutez npm install puis npm run serve ; <br>
-> Le frontend de l'application doit fonctionner sur localhost avec le port par défaut 8080.<br>

Backend : <br>
-> A partir du dossier backend, exécutez npm install puis nodemon server ; <br>
-> Le backend de l'application doit fonctionner sur localhost avec le port 3000.<br>

#Backend

// Langages & technologies
 - Javascript
 - NodeJs
 - Express
 - Sequelize
 - Mysql
 
// Installation Backend
- cloner ce repo dans Backend
- installer les packages via le terminal avec  : nmp i
- insaller Nodemon (optionnel)
- installer les dépendences du projet
- créer un fichier.env à la racine du Backend : (copier contenu point env)
    JWT_TOKEN=lacledevotrechoix
    ADMIN_PASSWORD=lemotdepassedevotrechoix 
    MYSQL_ID=<votreidentifiantsql>
    MYSQL_PWD=<votremotdepassesql>
    (Note:) le mot de passe ADMIN_PASSWORD doit être choisi lors de l'inscription d'un utilisateur côté frontend pour lui donner le rôle d'admin.
    
- lancer le Backend via le terminal intégré avec la commande Nodemon server

#base de données :

technologie : 
mysql

création d'une bdd Mysql nommée : groupomania.
