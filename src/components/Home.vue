<template>
  <div class="home">
    <h1>Cadastro realizado com sucesso!</h1>
    <p>Obrigado por se cadastrar. Agora você pode acessar sua conta.</p>

    <button @click="resetForm">Voltar para o Formulário</button>
  </div>
</template>

<script setup>
import { ref } from "vue";

function resetForm() {
  localStorage.removeItem("isSuccess");
  window.location.reload();
}
</script>

<style scoped>
.home {
  text-align: center;
  padding: 20px;
}

button {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
}
</style>
