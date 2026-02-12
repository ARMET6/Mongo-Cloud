require('dotenv').config();
const express = require('express');
const connectDB = require('./db');
const User = require('./models/User'); // Importante: Verifica que la ruta sea correcta

const app = express();
const PORT = process.env.PORT || 5000;

// 1. Conexión a la Base de Datos
connectDB();

// 2. Middleware (Para que Express entienda el formato JSON)
app.use(express.json());

// 3. Rutas
app.get('/', (req, res) => {
    res.send('¡Servidor funcionando correctamente!');
});

// RUTA GET: Para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ mensaje: "Error al obtener usuarios", error: err.message });
    }
});

// RUTA POST: Para crear un nuevo usuario
app.post('/usuarios', async (req, res) => {
    try {
        const { nombre, email } = req.body;
        const nuevoUsuario = new User({ nombre, email });
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ mensaje: "Error al crear usuario", error: err.message });
    }
});

// 4. Encendido del servidor
app.listen(PORT, () => {    
    console.log(`Server is running on port ${PORT}`);
});