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
  // Resetar os erros antes de validar
  Object.keys(errors.value).forEach(key => errors.value[key] = "");

  console.log(formData)

  if (currentStep.value === 0) {
    // Validação para o Step1
    if (!formData.value.email) {
      errors.value.email = "O email é obrigatório.";
    }
    if (!formData.value.nome) {
      errors.value.nome = "O nome é obrigatório.";
    }
    console.log(errors.value);
    return formData.value.email !== "" && formData.value.nome !== "";
  } else if (currentStep.value === 1) {
    // Validação para o Step2
    if (!formData.value.cpf) {
      errors.value.cpf = "O CPF é obrigatório.";
    }
    if (!formData.value.dataNascimento) {
      errors.value.dataNascimento = "A data de nascimento é obrigatória.";
    }
    return formData.value.cpf !== "" && formData.value.dataNascimento !== "";
  } else if (currentStep.value === 2) {
    // Validação para o Step3
    if (!formData.value.telefone) {
      errors.value.telefone = "O telefone é obrigatório.";
    }
    return formData.value.telefone !== "";
  } else if (currentStep.value === 3) {
    // Validação para o Step4
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
      console.log("Deu bom!")
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

  try {
    const response = await fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData.value),
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
