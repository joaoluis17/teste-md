<template>
  <div class="form-container">
    <p class="step-indicator">Etapa <strong>2</strong> de 4</p>
    <h2 class="form-title">{{ titulo }}</h2>

    <form @submit.prevent="next" class="form">
      <div v-if="formData.tipoCadastro === 'PF'">
        <label for="nome" class="form-label">Nome:</label>
        <input id="nome" class="input" v-model="formData.nome" type="text" placeholder="João da Silva" required />

        <label for="cpf" class="form-label">CPF:</label>
        <input id="cpf" class="input" v-model="formData.cpf" type="text" inputmode="numeric" @input="filterNumericInput('cpf', 11)" placeholder="123.456.789-12" required />
        <p class="error" v-if="errors.cpf">{{ errors.cpf }}</p>

        <label for="dataNascimento" class="form-label">Data de Nascimento:</label>
        <input id="dataNascimento" class="input" v-model="formData.dataNascimento" type="date" required />

        <label for="telefone" class="form-label">Telefone:</label>
        <input id="telefone" class="input" v-model="formData.telefone" type="text" inputmode="numeric" @input="filterNumericInput('telefone', 11)" placeholder="(11) 91234-5678" required />
        <p class="error" v-if="errors.telefone">{{ errors.telefone }}</p>
      </div>

      <div v-else-if="formData.tipoCadastro === 'PJ'">
        <label for="razaoSocial" class="form-label">Razão Social:</label>
        <input id="razaoSocial" class="input" v-model="formData.razaoSocial" type="text" placeholder="Mercado Bitcoin" required />

        <label for="cnpj" class="form-label">CNPJ:</label>
        <input id="cnpj" class="input" v-model="formData.cnpj" type="text" inputmode="numeric" @input="filterNumericInput('cnpj', 14)" placeholder="10.123.456/0001-78" required/>
        <p class="error" v-if="errors.cnpj">{{ errors.cnpj }}</p>

        <label for="dataAbertura" class="form-label">Data de Abertura:</label>
        <input id="dataAbertura" class="input" v-model="formData.dataAbertura" type="date" required />

        <label for="telefone" class="form-label">Telefone:</label>
        <input id="telefone" class="input" v-model="formData.telefone" type="text" inputmode="numeric" @input="filterNumericInput('telefone', 11)" placeholder="(11) 91234-5678" required/>
        <p class="error" v-if="errors.telefone">{{ errors.telefone }}</p>
      </div>

      <div class="buttons">
        <button type="button" @click="$emit('back')" class="back-button">Voltar</button>
        <button type="submit" class="form-button">Continuar</button>
      </div>
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

function filterNumericInput(field, maxLength) {
  props.formData[field] = props.formData[field].replace(/\D/g, "");

  if (props.formData[field].length > maxLength) {
    props.formData[field] = props.formData[field].slice(0, maxLength);
  }
}

function validateLength(field, validLengths) {
  const fieldLength = props.formData[field]?.length || 0;
  if (!validLengths.includes(fieldLength)) {
    errors[field] = `O campo deve ter ${validLengths.join(' ou ')} dígitos.`;
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
        validateLength("cpf", [11]) &&
        validateLength("telefone", [10, 11]) &&
        props.formData.nome &&
        props.formData.dataNascimento;

    if (!valid) {
      alert("Preencha todos os campos corretamente.");
      return;
    }
  } else if (props.formData.tipoCadastro === "PJ") {
    valid =
        validateLength("cnpj", [14]) &&
        validateLength("telefone", [10, 11]) &&
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
