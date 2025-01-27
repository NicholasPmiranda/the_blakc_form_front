<script setup>
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";

const questionario = useQuestionarioStore()

</script>

<template>
    <div>
        <p class="input-pergunta ">{{ questionario.questao_select.titulo }}</p>
        <p class="input-descricao ">{{ questionario.questao_select.descricao }}</p>


        <textarea v-model="questionario.resposta" class="input-text-area">Uma resposta simples</textarea>
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

@media screen and (max-width: 425px) {
    .input-text-area{
        width: 350px;
    }

}

@media screen and (max-width: 375px) {
    .input-text-area{
        width: 300px;
    }

}

@media screen and (max-width: 320px) {
    .input-text-area{
        width: 250px;
    }

}


</style>
