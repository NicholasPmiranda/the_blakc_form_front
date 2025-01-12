<script setup>
import {useEditFormStore} from "@/stores/EditFormStore.js";

const ediFormStore = useEditFormStore()

</script>

<template>
    <div>
        <input v-model="ediFormStore.questao_select.titulo" class="input-pergunta" readonly
               value="qual sua pergunta ?"/>
        <input v-model="ediFormStore.questao_select.descricao" class="input-descricao"
               readonly
               value="Sua opinião é muito importante pra gente."/>

        <input class="input-text-area" type="file"/>
    </div>
</template>

<style scoped>
.input-pergunta {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: pointer; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 25px;
    width: 100%;
    color: white;

}

.input-descricao {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: pointer; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    color: white;
}

.input-text-area {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: pointer; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    text-align: start;
    width: 100%;
    color: white;
    border-bottom: 1px solid #B182FF;

}

.input-text-area:hover {
    background-color: #1a142a;
}

.input-pergunta:hover {
    background-color: #1a142a;
}


.input-descricao:hover {
    background-color: #1a142a;
}
</style>
