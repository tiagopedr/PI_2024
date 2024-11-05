const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000; // Porta que o servidor vai ouvir

// Configuração da conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost', // Endereço do servidor MySQL (ajuste conforme necessário)
    user: 'root', // Usuário do MySQL
    password: 'Dunk7200!m', // Senha do MySQL
    database: 'teste' // Nome do banco de dados
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados MySQL');
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Rota principal para exibir o formulário e os dados
app.get('/', (req, res) => {
    db.query('SELECT * FROM usuarios', (err, results) => {
        if (err) throw err;
        res.render('index', { data: results });
    });
});

// Rota para salvar os dados
app.post('/submit', (req, res) => {
    const { nome, rg } = req.body;
    const sql = 'INSERT INTO usuarios (nome, rg) VALUES (?, ?)';

    db.query(sql, [nome, rg], (err, results) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
