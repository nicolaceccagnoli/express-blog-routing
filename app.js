// Importo Express
const express = require('express');

// Invoco Express
const app = express();
const port = 3000;

// Invoco il controller
const postsRouter = require("./routers/posts.js");

const { path } = require('./utils.js');

// Middleware per i file statici
app.use(express.static('./public'));

// Definisco le mie rotte
app.use('/posts', postsRouter);

app.listen(port, () => {
    console.log(`Server avviato su http://localhost:${port}`);
});