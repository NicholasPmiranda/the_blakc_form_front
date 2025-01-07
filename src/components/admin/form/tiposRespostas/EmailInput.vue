<script setup>
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {watch} from "vue";

const ediFormStore = useEditFormStore()
watch(
    () => ediFormStore.questao_select.titulo,
    async (newVal, oldVal) => {
        if (ediFormStore.saveTimeout) {
            clearTimeout(ediFormStore.saveTimeout)
        }
        ediFormStore.saveTimeout = setTimeout(async () => {
            if (newVal !== oldVal) {
                await ediFormStore.updateTitulo()
            }
        }, 2000)
    },
    { deep: true }
)

watch(
    () => ediFormStore.questao_select.descricao,
    async (newVal, oldVal) => {
        if (ediFormStore.saveTimeout) {
            clearTimeout(ediFormStore.saveTimeout)
        }
        ediFormStore.saveTimeout = setTimeout(async () => {
            if (newVal !== oldVal) {
                await ediFormStore.updateDescricao()
            }
        }, 2000)
    },
    { deep: true }
)

</script>

<template>
    <div>
        <input v-model="ediFormStore.questao_select.titulo"  value="qual sua pergunta ?"
                 class="input-pergunta"/>
        <input v-model="ediFormStore.questao_select.descricao" value="Sua opinião é muito importante pra gente."
                  class="input-descricao"/>

        <input class="input-text-area" value="email@email.com" type="email">
    </div>
</template>

<style scoped>
.input-pergunta{
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 25px;
    width: 100%;
    color: white;

}
.input-descricao{
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    color: white;
}
.input-text-area{
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    text-align: start;
    width: 100%;
    color: white;
    border-bottom: 1px solid  #B182FF;

}
.input-text-area:hover{
    background-color: #1a142a;
}

.input-pergunta:hover{
    background-color: #1a142a;
}


.input-descricao:hover{
    background-color: #1a142a;
}
</style>
