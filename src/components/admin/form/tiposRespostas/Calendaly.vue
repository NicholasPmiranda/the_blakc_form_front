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
        }, 1000)
    },
    {deep: true}
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
        }, 1000)
    },
    {deep: true}
)
watch(
    () => ediFormStore.questao_select.config,
    async (newVal, oldVal) => {
        if (ediFormStore.saveTimeout) {
            clearTimeout(ediFormStore.saveTimeout)
        }
        ediFormStore.saveTimeout = setTimeout(async () => {
            await ediFormStore.updateConfig()

        }, 1000)
    },
    {deep: true}
)


</script>

<template>
    <div class="w-1/2">
        <input v-model="ediFormStore.questao_select.titulo" autofocus class="input-pergunta"
               value="qual sua pergunta ?"/>
        <input v-model="ediFormStore.questao_select.descricao" class="input-descricao"
               value="Sua opinião é muito importante pra gente."/>

        <small>
            Coloque o link do evento criado no calendaly
        </small>
        <input v-model="ediFormStore.questao_select.config.url_agenda" class="input-pergunta"
               value="https://calendly.com/XXXX/XXX"/>
        <div>

        </div>


    </div>
</template>

<style scoped>
.input-pergunta {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 25px;
    width: 100%;
    color: white;
    transition: background-color 0.3s ease;


}

.input-descricao {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    color: white;
    transition: background-color 0.3s ease;

}

.input-text-area {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    text-align: start;
    width: 100%;
    color: white;
    border-bottom: 1px solid #B182FF;
    transition: background-color 0.3s ease;


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
