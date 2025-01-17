<template>
  <div class="form-container">
    <p class="step-indicator">Etapa <strong>4</strong> de 4</p>
    <h2 class="form-title">Revise os seus dados</h2>
    <form @submit.prevent="$emit('confirm')" class="form">
      <div class="select-tipoCadastro">
        <label>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="pf-icon">
            <path fill-rule="evenodd" d="M1 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H4a3 3 0 0 1-3-3V6Zm4 1.5a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2 3a4 4 0 0 0-3.665 2.395.75.75 0 0 0 .416 1A8.98 8.98 0 0 0 7 14.5a8.98 8.98 0 0 0 3.249-.604.75.75 0 0 0 .416-1.001A4.001 4.001 0 0 0 7 10.5Zm5-3.75a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm0 6.5a.75.75 0 0 1 .75-.75h2.5a.75.75 0 0 1 0 1.5h-2.5a.75.75 0 0 1-.75-.75Zm.75-4a.75.75 0 0 0 0 1.5h2.5a.75.75 0 0 0 0-1.5h-2.5Z" clip-rule="evenodd" />
          </svg>
          <input type="radio" v-model="formData.tipoCadastro" value="PF" class="pf" />
          Pessoa física
        </label>
        <label>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="pj-icon">
            <path d="M2.879 7.121A3 3 0 0 0 7.5 6.66a2.997 2.997 0 0 0 2.5 1.34 2.997 2.997 0 0 0 2.5-1.34 3 3 0 1 0 4.622-3.78l-.293-.293A2 2 0 0 0 15.415 2H4.585a2 2 0 0 0-1.414.586l-.292.292a3 3 0 0 0 0 4.243ZM3 9.032a4.507 4.507 0 0 0 4.5-.29A4.48 4.48 0 0 0 10 9.5a4.48 4.48 0 0 0 2.5-.758 4.507 4.507 0 0 0 4.5.29V16.5h.25a.75.75 0 0 1 0 1.5h-4.5a.75.75 0 0 1-.75-.75v-3.5a.75.75 0 0 0-.75-.75h-2.5a.75.75 0 0 0-.75.75v3.5a.75.75 0 0 1-.75.75h-4.5a.75.75 0 0 1 0-1.5H3V9.032Z" />
          </svg>
          <input type="radio" v-model="formData.tipoCadastro" value="PJ" class="pj" />
          Pessoa jurídica
        </label>
      </div>

      <template v-if="formData.tipoCadastro === 'PF'">
        <div>
          <label for="nome" class="form-label">Nome</label>
          <input id="nome" v-model="formData.nome" type="text" class="input" />
          <p class="error" v-if="!formData.nome">Nome é obrigatório.</p>
        </div>
        <div>
          <label for="cpf" class="form-label">CPF</label>
          <input id="cpf" v-model="formData.cpf" type="text" class="input" @input="filterNumericInput('cpf', 11)" />
          <p class="error">{{ errors.cpf }}</p>
        </div>
        <div>
          <label for="dataNascimento" class="form-label">Data de Nascimento</label>
          <input id="dataNascimento" v-model="formData.dataNascimento" type="date" class="input" />
          <p class="error" v-if="!formData.dataNascimento">Data de nascimento é obrigatória.</p>
        </div>
        <div>
          <label for="telefone" class="form-label">Telefone</label>
          <input id="telefone" v-model="formData.telefone" type="tel" class="input" @input="filterNumericInput('telefone', 11)" />
          <p class="error">{{ errors.telefone }}</p>
        </div>
      </template>

      <template v-if="formData.tipoCadastro === 'PJ'">
        <div>
          <label for="razaoSocial" class="form-label">Razão Social</label>
          <input id="razaoSocial" class="input" v-model="formData.razaoSocial" type="text" placeholder="Mercado Bitcoin" required />
          <p class="error" v-if="!formData.razaoSocial">Razão Social é obrigatória.</p>
        </div>
        <div>
          <label for="cnpj" class="form-label">CNPJ</label>
          <input id="cnpj" class="input" v-model="formData.cnpj" type="text" inputmode="numeric" @input="filterNumericInput('cnpj', 14)" placeholder="10.123.456/0001-78" required/>
          <p class="error">{{ errors.cnpj }}</p>
        </div>
        <div>
          <label for="dataAbertura" class="form-label">Data de Abertura</label>
          <input id="dataAbertura" class="input" v-model="formData.dataAbertura" type="date" required />
          <p class="error" v-if="!formData.dataAbertura">Data de abertura é obrigatória.</p>
        </div>
        <div>
          <label for="telefone" class="form-label">Telefone</label>
          <input id="telefone" class="input" v-model="formData.telefone" type="text" inputmode="numeric" @input="filterNumericInput('telefone', 11)" placeholder="(11) 91234-5678" required/>
          <p class="error">{{ errors.telefone }}</p>
        </div>
      </template>

      <div>
        <label for="senha" class="form-label">Senha</label>
        <input id="senha" v-model="formData.senha" type="password" class="input" />
        <p class="error" v-if="!formData.senha">Senha é obrigatória.</p>
      </div>

      <div class="buttons">
        <button type="button" @click="$emit('back')" class="back-button">Voltar</button>
        <button type="submit" class="form-button">Confirmar</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { reactive } from "vue";

const props = defineProps({
  formData: Object,
});

const errors = reactive({
  cpf: "",
  cnpj: "",
  telefone: "",
});

const emit = defineEmits(["confirm", "back"]);

function filterNumericInput(field, maxLength) {
  props.formData[field] = props.formData[field].replace(/\D/g, "");
  if (props.formData[field].length > maxLength) {
    props.formData[field] = props.formData[field].slice(0, maxLength);
  }
}

function validateLength(field, validLengths) {
  const fieldLength = props.formData[field]?.length || 0;
  if (!validLengths.includes(fieldLength)) {
    errors[field] = `O campo deve ter ${validLengths.join(" ou ")} dígitos.`;
    return false;
  } else {
    errors[field] = "";
    return true;
  }
}

function confirm() {
  let valid = true;

  if (props.formData.tipoCadastro === "PF") {
    valid =
        validateLength("cpf", [11]) &&
        validateLength("telefone", [10, 11]) &&
        props.formData.nome &&
        props.formData.dataNascimento;
  } else if (props.formData.tipoCadastro === "PJ") {
    valid =
        validateLength("cnpj", [14]) &&
        validateLength("telefone", [10, 11]) &&
        props.formData.razaoSocial &&
        props.formData.dataAbertura;
  }

  if (!valid || !props.formData.senha) {
    alert("Preencha todos os campos corretamente.");
    return;
  }

  emit("confirm");
}
</script>


<style>
.form-container {
  width: 100%;
  max-width: 400px;
  margin: 50px auto;
  font-family: Arial, sans-serif;
  text-align: center;
}

.step-indicator {
  font-size: 14px;
  color: #000;
  margin-bottom: 10px;
}

strong {
  color: #ff8c00;
}

.select-tipoCadastro {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

.pf, .pj {
  margin-right: 5px;
}
.pf-icon, .pj-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  vertical-align: middle;
}

.buttons {
  padding: 40px;
  display: inline-block;
}

.back-button {
  margin-right: 12px;
}

.form-button {
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  background-color: #ffa500;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.form-button:hover {
  background-color: #ff8c00;
  transform: scale(1.02);
}

.error {
  color: red;
  font-size: 12px;
  margin-top: 4px;
  text-align: left;
}
</style>
