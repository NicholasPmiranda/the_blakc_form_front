<script setup>
import {Checkbox} from "primevue";
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";

const questionario = useQuestionarioStore()


</script>

<template>
    <div class="flex justify-center flex-col ">
        <p class="input-pergunta ">{{ questionario.questao_select.titulo }}</p>
        <p class="input-descricao text-center">{{ questionario.questao_select.descricao }}</p>

        <div class="mt-4">
            <div class="flex items-center" v-for="alternativa in questionario.questao_select.alternativas">
                <Checkbox @change="questionario.checkboxUpdate" v-model="questionario.resposta" name="alternativa" :value="alternativa.name" />
                <input class="input-descricao" :value="alternativa.name" readonly/>
            </div>
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

}

.input-descricao {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    color: white;
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
