<template>
  <div>
    <p>Etapa 2 de 4</p>
    <h2>{{ titulo }}</h2>

    <form @submit.prevent="next">
      <div v-if="formData.tipoCadastro === 'PF'">
        <label for="nome">Nome:</label>
        <input id="nome" v-model="formData.nome" type="text" required />

        <label for="cpf">CPF:</label>
        <input
            id="cpf"
            v-model="formData.cpf"
            type="text"
            inputmode="numeric"
            @input="filterNumericInput('cpf')"
            @blur="validateLength('cpf', 11)"
            required
        />
        <p class="error" v-if="errors.cpf">{{ errors.cpf }}</p>

        <label for="dataNascimento">Data de Nascimento:</label>
        <input id="dataNascimento" v-model="formData.dataNascimento" type="date" required />

        <label for="telefone">Telefone:</label>
        <input
            id="telefone"
            v-model="formData.telefone"
            type="text"
            inputmode="numeric"
            @input="filterNumericInput('telefone')"
            @blur="validateLength('telefone', 10)"
            required
        />
        <p class="error" v-if="errors.telefone">{{ errors.telefone }}</p>
      </div>

      <div v-else-if="formData.tipoCadastro === 'PJ'">
        <label for="razaoSocial">Razão Social:</label>
        <input id="razaoSocial" v-model="formData.razaoSocial" type="text" required />

        <label for="cnpj">CNPJ:</label>
        <input
            id="cnpj"
            v-model="formData.cnpj"
            type="text"
            inputmode="numeric"
            @input="filterNumericInput('cnpj')"
            @blur="validateLength('cnpj', 14)"
            required
        />
        <p class="error" v-if="errors.cnpj">{{ errors.cnpj }}</p>

        <label for="dataAbertura">Data de Abertura:</label>
        <input id="dataAbertura" v-model="formData.dataAbertura" type="date" required />

        <label for="telefone">Telefone:</label>
        <input
            id="telefone"
            v-model="formData.telefone"
            type="text"
            inputmode="numeric"
            @input="filterNumericInput('telefone')"
            @blur="validateLength('telefone', 10)"
            required
        />
        <p class="error" v-if="errors.telefone">{{ errors.telefone }}</p>
      </div>

      <button type="button" @click="$emit('back')">Voltar</button>
      <button type="submit">Continuar</button>
    </form>
  </div>
</template>

<script setup>
import { computed, reactive } from "vue";

const props = defineProps(["formData"]);
const emit = defineEmits(["next", "back"]);

const titulo = computed(() =>
    props.formData.tipoCadastro === "PF"
        ? "Pessoa Física"
        : props.formData.tipoCadastro === "PJ"
            ? "Pessoa Jurídica"
            : "Tipo de Cadastro"
);

const errors = reactive({
  cpf: "",
  cnpj: "",
  telefone: "",
});

function filterNumericInput(field) {
  props.formData[field] = props.formData[field].replace(/\D/g, "");
}

function validateLength(field, length) {
  const fieldLength = props.formData[field]?.length || 0;
  if (fieldLength !== length) {
    errors[field] = `O campo deve ter exatamente ${length} dígitos.`;
    return false;
  } else {
    errors[field] = "";
    return true;
  }
}

function next() {
  let valid = true;

  if (props.formData.tipoCadastro === "PF") {
    valid =
        validateLength("cpf", 11) &&
        validateLength("telefone", 10) &&
        props.formData.nome &&
        props.formData.dataNascimento;

    if (!valid) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
  } else if (props.formData.tipoCadastro === "PJ") {
    valid =
        validateLength("cnpj", 14) &&
        validateLength("telefone", 10) &&
        props.formData.razaoSocial &&
        props.formData.dataAbertura;

    if (!valid) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
  }

  emit("next");
}
</script>


<style>
.error {
  color: red;
  font-size: 0.9em;
  margin-top: 4px;
}
</style>