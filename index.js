    require('dotenv').config(); // <-- Añade esto al principio
    const express = require('express');
    const connectDB = require('./db');

    const app = express();
    // Ahora process.env.PORT sí funcionará si lo defines en el .env
    const PORT = process.env.PORT || 5000;



    // Connect to MongoDB
    connectDB();

    app.use(express.json());

    app.get('/', (req, res) => {
        res.send('Hello Mongo!');
    });

    app.listen(PORT, () => {    
        console.log(`Server is running on port ${PORT}`);
    });