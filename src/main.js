import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App).mount('#app')

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/cadastro", (req, res) => {
    res.status(200).json({ message: "API para cadastro de usuários funcionando!" });
});

app.post("/cadastro", (req, res) => {
    const { email, tipoCadastro } = req.body;

    if (!email || !tipoCadastro) {
        return res.status(400).json({ error: "Os campos 'email' e 'tipoCadastro' são obrigatórios." });
    }

    res.status(200).json({ message: "Cadastro realizado com sucesso!", data: { email, tipoCadastro } });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
