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
    const {
        email,
        tipoCadastro,
        nome,
        cpf,
        dataNascimento,
        telefone,
        senha
    } = req.body;

    // Verificar campos obrigatórios
    if (!email || !tipoCadastro || !nome || !telefone || !senha) {
        return res.status(400).json({ error: "Todos os campos são obrigatórios." });
    }

    // Validações adicionais
    if (tipoCadastro === "PF" && (!cpf || !dataNascimento)) {
        return res.status(400).json({ error: "CPF e data de nascimento são obrigatórios para Pessoa Física." });
    }

    // Sucesso
    res.status(200).json({ message: "Cadastro realizado com sucesso!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
