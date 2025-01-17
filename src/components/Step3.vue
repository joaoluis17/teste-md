<template>
  <div>
    <p>Etapa 3 de 4</p>
    <h2>Senha de acesso</h2>

    <form @submit.prevent="next">
      <label for="senha">Digite a sua senha:</label>
      <input id="senha" v-model="formData.senha" type="password" required />

      <label for="confirmarSenha">Confirme a sua senha:</label>
      <input id="confirmarSenha" v-model="confirmarSenha" type="password" required />

      <button type="button" @click="$emit('back')">Voltar</button>
      <button type="button" @click="$emit('next')">Continuar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps(["formData"]);
const emit = defineEmits(["next", "back"]);

const confirmarSenha = ref("");

function next() {
  if (!props.formData.senha || props.formData.senha !== confirmarSenha.value) {
    return alert("As senhas não coincidem ou estão vazias.");
  }

  emit("next");
}
</script>

<style scoped>
</style>
