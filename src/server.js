import jsonServer from 'json-server'
import multer from 'multer'
import cors from 'cors'
import path from 'path'

const server = jsonServer.create()
const router = jsonServer.router('db.json') // Spécifiez le fichier JSON à utiliser comme base de données
const middlewares = jsonServer.defaults()

// Configuration de Multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
})

const upload = multer({ storage: storage })

// Créez le répertoire de stockage des fichiers si nécessaire
import fs from 'fs'
const dir = 'public/uploads'

if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true })
}

// Ajout des middlewares
server.use(middlewares)

// Ajout d'un middleware pour le parsing du corps des requêtes POST, PUT, PATCH, DELETE
server.use(jsonServer.bodyParser)

// Ajout de la configuration CORS
server.use(cors())

// Route pour le téléchargement des images
server.post('/upload', upload.single('profilePhoto'), (req, res) => {
  const absoluteFilePath = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`
  res.json({ filePath: absoluteFilePath })
})

// Utilisation du routeur JSON Server
server.use(router)

// Démarrez le serveur
server.listen(3000, () => {
  console.log('JSON Server is running with multer')
})

// Pour démarrer le serveur dans un terminal
// json-server --watch db.json --port 3000
