const User = require('./User'); // Importa el modelo

// RUTA PARA CREAR UN USUARIO (POST)
app.post('/usuarios', async (req, res) => {
    try {
        const nuevoUsuario = new User(req.body);
        await nuevoUsuario.save();
        res.status(201).json(nuevoUsuario);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

// RUTA PARA VER LOS USUARIOS (GET)
app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await User.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});