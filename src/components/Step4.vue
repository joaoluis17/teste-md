<template>
  <div>
    <p>Etapa 4 de 4</p>
    <h2>Revise suas informações</h2>

    <div v-if="formData.tipoCadastro === 'PF'">
      <p><strong>Nome:</strong> {{ formData.nome }}</p>
      <p><strong>CPF:</strong> {{ formData.cpf }}</p>
      <p><strong>Data de Nascimento:</strong> {{ formData.dataNascimento }}</p>
      <p><strong>Telefone:</strong> {{ formData.telefone }}</p>
    </div>

    <div v-else-if="formData.tipoCadastro === 'PJ'">
      <p><strong>Razão Social:</strong> {{ formData.razaoSocial }}</p>
      <p><strong>CNPJ:</strong> {{ formData.cnpj }}</p>
      <p><strong>Data de Abertura:</strong> {{ formData.dataAbertura }}</p>
      <p><strong>Telefone:</strong> {{ formData.telefone }}</p>
    </div>

    <button type="button" @click="$emit('back')">Voltar</button>
    <button type="submit" @click="confirm">Confirmar</button>

  </div>
</template>

<script setup>
const props = defineProps(["formData"]);
const emit = defineEmits(["confirm", "back"]);

function confirm() {
  emit("confirm");
}
</script>

<style scoped>

</style>
