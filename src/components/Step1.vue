<template>
  <div>
    <p>Etapa 1 de 4</p>
    <h2>Seja bem vindo(a)!</h2>

    <form @submit.prevent="next">
      <div>
        <label for="email">E-mail:</label>
        <input id="email" v-model="formData.email" type="email" required />
      </div>
      <div>
        <label for="tipoCadastro">Tipo de Cadastro:</label>
        <select id="tipoCadastro" v-model="formData.tipoCadastro" required>
          <option value="PF">Pessoa Física</option>
          <option value="PJ">Pessoa Jurídica</option>
        </select>
      </div>
      <button type="button" @click="$emit('back')">Voltar</button>
      <button type="submit">Continuar</button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: Object
});
const emit = defineEmits(["next", "back"]);

function next() {
  if (props.formData.email && props.formData.tipoCadastro) {
    emit("next");
  } else {
    alert("Preencha todos os campos.");
  }
}
</script>
