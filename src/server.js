import jsonServer from 'json-server'
import cors from 'cors'

const server = jsonServer.create()
const router = jsonServer.router('db.json') // Spécifiez le fichier JSON à utiliser comme base de données
const middlewares = jsonServer.defaults()

// Ajout des middlewares
server.use(middlewares)

// Ajout d'un middleware pour le parsing du corps des requêtes POST, PUT, PATCH, DELETE
server.use(jsonServer.bodyParser)

// Ajout de la configuration CORS
server.use(cors())

// Utilisation du routeur JSON Server
server.use(router)

// Démarrez le serveur
server.listen(3000, () => {
  console.log('JSON Server is running');
});


//Pour démarrer le serveur dans un terminal
//json-server --watch db.json --port 3000