const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 📌 CONEXÃO CORRETA (rede pública)
const db = mysql.createPool({
    host: process.env.MYSQLHOST,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});



app.post("/pessoa", (req, res) => {
    const { nome, email, telefone, mensagem } = req.body;

    const sql = `INSERT INTO pessoa (nome, email, telefone, mensagem) VALUES (?, ?, ?, ?)`;

    db.query(sql, [nome, email, telefone, mensagem], (err, result) => {
        if (err) {
            console.error("Erro ao inserir:", err);
            return res.status(500).send("Erro ao inserir.");
        }
        res.send({ message: "Pessoa cadastrada com sucesso!" });
    });
});

app.listen(process.env.PORT || 3000, () =>
    console.log("Servidor rodando!")
);


