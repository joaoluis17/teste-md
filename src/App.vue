<template>
  <div id="app">
    <SuccessPage v-if="isSuccess" />

    <div v-else>
      <component
          :is="steps[currentStep]"
          :formData="formData"
          @next="nextStep"
          @back="prevStep"
          @confirm="submitForm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";
import Step4 from "./components/Step4.vue";
import SuccessPage from "./components/Home.vue";

const steps = [Step1, Step2, Step3, Step4];
const currentStep = ref(0);
const isSuccess = ref(false);

const formData = ref({
  email: "",
  tipoCadastro: "",
  nome: "",
  cpf: "",
  dataNascimento: "",
  telefone: "",
  razaoSocial: "",
  cnpj: "",
  dataAbertura: "",
  senha: "",
});

onMounted(() => {
  const success = localStorage.getItem("isSuccess");
  if (success === "true") {
    isSuccess.value = true;
  }
});

const errors = ref({
  email: "",
  nome: "",
  cpf: "",
  telefone: "",
  senha: "",
});

function validateStep() {
  Object.keys(errors.value).forEach((key) => (errors.value[key] = ""));

  const onlyNumbers = /^\d+$/;

  if (currentStep.value === 0) {
    if (!formData.value.email) {
      errors.value.email = "O email é obrigatório.";
    }
    return formData.value.email !== "";
  } else if (currentStep.value === 1) {
    if (formData.value.tipoCadastro === "PF") {
      if (!formData.value.nome) {
        errors.value.nome = "O nome é obrigatório.";
      }
      if (!formData.value.cpf || !onlyNumbers.test(formData.value.cpf) || formData.value.cpf.length !== 11) {
        errors.value.cpf = "O CPF deve conter apenas 11 números.";
      }
      if (!formData.value.telefone || !onlyNumbers.test(formData.value.telefone) || (formData.value.telefone.length !== 10 && formData.value.telefone.length !== 11)) {
        errors.value.telefone = "O telefone deve ter 10 ou 11 dígitos.";
      }
      return formData.value.nome && formData.value.cpf && formData.value.telefone;
    }
    else if (formData.value.tipoCadastro === "PJ") {
      if (!formData.value.razaoSocial) {
        errors.value.razaoSocial = "A razão social é obrigatória.";
      }
      if (!formData.value.cnpj || !onlyNumbers.test(formData.value.cnpj) || formData.value.cnpj.length !== 14) {
        errors.value.cnpj = "O CNPJ deve conter apenas 14 números.";
      }
      if (!formData.value.telefone || !onlyNumbers.test(formData.value.telefone) || (formData.value.telefone.length !== 10 && formData.value.telefone.length !== 11)) {
        errors.value.telefone = "O telefone deve ter 10 ou 11 dígitos.";
      }
      return formData.value.razaoSocial && formData.value.cnpj && formData.value.telefone;
    }
  } else if (currentStep.value === 2) {
    if (!formData.value.senha) {
      errors.value.senha = "A senha é obrigatória.";
    }
    return formData.value.senha !== "";
  }
}

function nextStep() {
  if (validateStep()) {
    if (currentStep.value < steps.length - 1) {
      currentStep.value++;
    }
  } else {
    console.log("Validação falhou no passo atual.");
  }
}

function prevStep() {
  if (currentStep.value > 0) {
    currentStep.value--;
  }
}

async function submitForm(event) {
  if (event) event.preventDefault();

  if (currentStep.value !== steps.length - 1) {
    return;
  }

  const filteredData = { ...formData.value };

  if (formData.value.tipoCadastro === "PJ") {
    delete filteredData.nome;
    delete filteredData.cpf;
    delete filteredData.dataNascimento;
  } else if (formData.value.tipoCadastro === "PF") {
    delete filteredData.razaoSocial;
    delete filteredData.cnpj;
    delete filteredData.dataAbertura;
  }

  if (filteredData.tipoCadastro === "PJ" && (!filteredData.razaoSocial || !filteredData.cnpj || !filteredData.dataAbertura)) {
    console.error("Campos obrigatórios de PJ não preenchidos.");
    return;
  } else if (filteredData.tipoCadastro === "PF" && (!filteredData.nome || !filteredData.cpf || !filteredData.dataNascimento)) {
    console.error("Campos obrigatórios de PF não preenchidos.");
    return;
  }

  try {
    const response = await fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(filteredData),
    });

    if (!response.ok) {
      const result = await response.json();
      console.error("Erro no cadastro:", result.error || "Erro desconhecido.");
      return;
    }

    const result = await response.json();
    console.log("Cadastro realizado com sucesso:", result);

    localStorage.setItem("isSuccess", "true");
    isSuccess.value = true;

    formData.value = {
      email: "",
      tipoCadastro: "",
      nome: "",
      cpf: "",
      dataNascimento: "",
      telefone: "",
      razaoSocial: "",
      cnpj: "",
      dataAbertura: "",
      senha: "",
    };
  } catch (error) {
    console.error("Erro ao enviar o formulário:", error.message);
  }
}
</script>

