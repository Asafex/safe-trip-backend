const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 📌 Conexão com o MySQL da Railway
const db = mysql.createConnection({
    host: "mysql.railway.internal",
    user: "root",
    password: "MRPspnBuFIxGgmuVBibNTyqmCtJLEGBQ",
    database: "railway",
    port: 3306
});

// Teste da conexão
db.connect((err) => {
    if (err) {
        console.error("Erro ao conectar no MySQL:", err);
        return;
    }
    console.log("Conectado ao MySQL da Railway!");
});

// Rota da API - cadastrar pessoa
app.post("/pessoa", (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;

    const sql = `
        INSERT INTO pessoa (nome, email, telefone, mensagem)
        VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [nome, email, telefone, mensagem], (err, result) => {
        if (err) {
            console.error("Erro ao inserir:", err);
            return res.status(500).send("Erro ao inserir.");
        }
        res.send({ message: "Pessoa cadastrada com sucesso!" });
    });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));


