<script setup>
import {RouterView} from 'vue-router'
import {Toast, ConfirmDialog} from "primevue";
import {pensamentoDoDia} from "@/extra/FraseDoDia.js";

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
