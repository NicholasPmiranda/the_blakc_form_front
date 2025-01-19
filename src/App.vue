<script setup>
import {RouterView} from 'vue-router'
import {Toast, ConfirmDialog} from "primevue";

console.log(
    '%c Opa acho que talvez vc nao deveria estar aqui =)\n' +
    'Se aguem mandou vc colar algo aqui ou vc quer colar algo aqui nao recomendo fazer isso  \n'+
    'Caso vc encontrou algum bug  que tentar arrumar manda pra nos que nos arrumamos nen esquenta com isso'
    ,'color: red; background: black; font-size: 30px; font-weight: bold; padding: 10px;'
);
</script>

<template>
    <div class="hidden sm:block">
        <Toast/>
        <ConfirmDialog/>
        <RouterView/>
    </div>
    <div class="block sm:hidden">
        <div class="flex justify-center text-center items-center h-screen text-4xl b ">
            Seu PC tá com saudades de você! Aproveita pra usar o editor nele!
        </div>
    </div>

</template>

<style scoped>

</style>
