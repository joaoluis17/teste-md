<template>
  <div id="app">
    <component
        :is="steps[currentStep]"
        :formData="formData"
        @next="nextStep"
        @back="prevStep"
        @submit="submitForm"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

import Step1 from "./components/Step1.vue";
import Step2 from "./components/Step2.vue";
import Step3 from "./components/Step3.vue";
import Step4 from "./components/Step4.vue";

const steps = [Step1, Step2, Step3, Step4];

const currentStep = ref(0);

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

function nextStep() {
  if (currentStep.value < steps.length - 1) currentStep.value++;
}

function prevStep() {
  if (currentStep.value > 0) currentStep.value--;
}

async function submitForm() {
  try {
    const response = await fetch("http://localhost:3000/cadastro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData.value),
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.error);

    alert(result.message);
  } catch (error) {
    alert(`Erro no cadastro: ${error.message}`);
  }
}
</script>

<style>
/* Adicione estilos globais aqui, se necessário */
</style>
