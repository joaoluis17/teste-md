<template>
  <div>
    <h2>Revise os seus dados</h2>
    <form @submit.prevent="$emit('confirm')">
      <div>
        <label for="tipoCadastro">Tipo de Cadastro</label>
        <select id="tipoCadastro" v-model="formData.tipoCadastro">
          <option value="" disabled>Selecione</option>
          <option value="PF">Pessoa Física</option>
          <option value="PJ">Pessoa Jurídica</option>
        </select>
      </div>

      <template v-if="formData.tipoCadastro === 'PF'">
        <div>
          <label for="nome">Nome</label>
          <input id="nome" v-model="formData.nome" type="text" />
        </div>
        <div>
          <label for="cpf">CPF</label>
          <input id="cpf" v-model="formData.cpf" type="text" />
        </div>
        <div>
          <label for="dataNascimento">Data de Nascimento</label>
          <input id="dataNascimento" v-model="formData.dataNascimento" type="date" />
        </div>
        <div>
          <label for="telefone">Telefone</label>
          <input id="telefone" v-model="formData.telefone" type="tel" />
        </div>
      </template>

      <template v-if="formData.tipoCadastro === 'PJ'">
        <div>
          <label for="razaoSocial">Razão Social</label>
          <input id="razaoSocial" v-model="formData.razaoSocial" type="text" />
        </div>
        <div>
          <label for="cnpj">CNPJ</label>
          <input id="cnpj" v-model="formData.cnpj" type="text" />
        </div>
        <div>
          <label for="dataAbertura">Data de Abertura</label>
          <input id="dataAbertura" v-model="formData.dataAbertura" type="date" />
        </div>
        <div>
          <label for="telefone">Telefone</label>
          <input id="telefone" v-model="formData.telefone" type="tel" />
        </div>
      </template>

      <button type="button" @click="$emit('back')">Voltar</button>
      <button type="submit">Confirmar</button>
    </form>
  </div>
</template>

<script setup>
const props = defineProps({
  formData: Object,
});

function filterNumericInput(field) {
  props.formData[field] = props.formData[field].replace(/\D/g, "");
};
</script>
