<script setup>
import {RouterView} from 'vue-router'
import {Toast, ConfirmDialog} from "primevue";
import {pensamentoDoDia} from "@/extra/FraseDoDia.js";
import { onMounted, onUnmounted, ref } from 'vue';

const isDarkMode = ref(false);

// Função para atualizar o favicon baseado no tema
const updateFavicon = (isDark) => {
  const favicon = document.querySelector('link[rel="icon"]');
  if (favicon) {
    favicon.href = isDark ? '/simbolo_branco_roxo.svg' : '/simbolo_preto_roxo.svg';
  }
};

// Função para detectar o tema do sistema
const checkColorScheme = () => {
  isDarkMode.value = window.matchMedia('(prefers-color-scheme: dark)').matches;
  updateFavicon(isDarkMode.value);
};

// Observer para mudanças no tema do sistema
let colorSchemeMediaQuery;

onMounted(() => {
  checkColorScheme();

  // Configurar listener para mudanças no tema do sistema
  colorSchemeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  colorSchemeMediaQuery.addEventListener('change', checkColorScheme);
});

onUnmounted(() => {
  // Remover listener quando componente for desmontado
  if (colorSchemeMediaQuery) {
    colorSchemeMediaQuery.removeEventListener('change', checkColorScheme);
  }
});

console.log(
    '%c Opa acho que talvez vc nao deveria estar aqui =)\n' +
    'Se aguem mandou vc colar algo aqui ou vc quer colar algo aqui nao recomendo fazer isso  \n'+
    'Caso vc encontrou algum bug  que tentar arrumar manda pra nos que nos arrumamos nen esquenta com isso'
    ,'color: red; background: black; font-size: 30px; font-weight: bold; padding: 10px;'
);

console.log(
    '%cFrase do dia\n' +
     pensamentoDoDia.pensamento+ ' \n'+
     pensamentoDoDia.autor,
    'color: blue; background: black; font-size: 20px; font-weight: bold; padding: 10px;'
);
</script>

<template>
    <div class="">
        <Toast/>
        <ConfirmDialog/>
        <RouterView/>
    </div>


</template>

<style scoped>

</style>
