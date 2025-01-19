# Desafio MB Web

### Instruções para Funcionamento
- Realizar as instalações do pacotes do npm com npm install
- Realizar o build do projeto: npm run dev
- Abrir nova aba e ir para a pasta "backend"
- Rodar novamente o comando npm install
- Rodar o comando node index.js

### Cliente
- **Vue.js 3** (Composition API com `<script setup>` e Vite)
- **JavaScript puro** (sem bibliotecas adicionais para gerenciamento de estado ou requisições HTTP)
- **CSS** (estilização desenvolvida manualmente)

### Servidor
- **Node.js** com **Express**
- APIs simples para simulação de cadastro

### Aplicação Cliente
1. **Cadastro modular**: Dividido em 4 passos:
    - Passo 1: E-mail e tipo de cadastro (Pessoa Física ou Jurídica)
    - Passo 2: Informações específicas (PF ou PJ)
    - Passo 3: Definição de senha
    - Passo 4: Revisão dos dados e confirmação
2. **Validação de campos**: Garantia de que todos os campos são preenchidos corretamente, como formato de e-mail, CPF, CNPJ, e datas válidas.
3. **Responsividade**: Layout adaptável para diferentes tamanhos de tela.

