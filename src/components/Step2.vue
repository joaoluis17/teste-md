<template>
  <div>
    <h2>Etapa 2 de 4</h2>
    <form @submit.prevent="next">
      <div v-if="formData.tipoCadastro === 'PF'">
        <label for="nome">Nome:</label>
        <input id="nome" v-model="formData.nome" type="text" required />

        <label for="cpf">CPF:</label>
        <input id="cpf" v-model="formData.cpf" type="text" required />

        <label for="dataNascimento">Data de Nascimento:</label>
        <input id="dataNascimento" v-model="formData.dataNascimento" type="date" required />

        <label for="telefone">Telefone:</label>
        <input id="telefone" v-model="formData.telefone" type="text" required />
      </div>

      <div v-else-if="formData.tipoCadastro === 'PJ'">
        <label for="razaoSocial">Razão Social:</label>
        <input id="razaoSocial" v-model="formData.razaoSocial" type="text" required />

        <label for="cnpj">CNPJ:</label>
        <input id="cnpj" v-model="formData.cnpj" type="text" required />

        <label for="dataAbertura">Data de Abertura:</label>
        <input id="dataAbertura" v-model="formData.dataAbertura" type="date" required />

        <label for="telefone">Telefone:</label>
        <input id="telefone" v-model="formData.telefone" type="text" required />
      </div>

      <button type="button" @click="$emit('back')">Voltar</button>
      <button type="submit">Continuar</button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps(["formData"]);
const emit = defineEmits(["next", "back"]);

function next() {
  // Validação básica
  if (props.formData.tipoCadastro === "PF") {
    if (
        !props.formData.nome ||
        !props.formData.cpf ||
        !props.formData.dataNascimento ||
        !props.formData.telefone
    ) {
      return alert("Preencha todos os campos.");
    }
  } else if (props.formData.tipoCadastro === "PJ") {
    if (
        !props.formData.razaoSocial ||
        !props.formData.cnpj ||
        !props.formData.dataAbertura ||
        !props.formData.telefone
    ) {
      return alert("Preencha todos os campos.");
    }
  }
  emit("next");
}
</script>
