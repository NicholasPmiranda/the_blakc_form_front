<script setup>
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {DatePicker} from "primevue";
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";

const questionarioStore = useQuestionarioStore();


;</script>

<template>
    <div>
        <input v-model="questionarioStore.questao_select.titulo" class="input-pergunta"
               readonly/>

        <input v-model="questionarioStore.questao_select.descricao" class="input-descricao"
               readonly/>
        <div class="mt-20">
            <DatePicker v-if="questionarioStore.questao_select.config.tipo_calendario === 'data simples'"
                        v-model="questionarioStore.resposta"
                        class="w-full sm:w-[30rem]"
                        dateFormat="dd/mm/yy"
            />

            <DatePicker v-if="questionarioStore.questao_select.config.tipo_calendario === 'multiplas datas'"
                        v-model="questionarioStore.resposta"                        :locale="locale"
                        class="w-full sm:w-[30rem]"
                        dateFormat="dd/mm/yy"
                        selectionMode="multiple"
            />

            <DatePicker v-if="questionarioStore.questao_select.config.tipo_calendario === 'intervalo de datas'"
                        v-model="questionarioStore.resposta"
                        :locale="locale"
                        class="w-full sm:w-[30rem]"
                        dateFormat="dd/mm/yy"
                        selectionMode="range"
            />

        </div>
    </div>
</template>

<style scoped>
.input-pergunta {
    all: unset;
    display: inline-block;
    cursor: text;
    padding: 0.5rem;
    font-size: 25px;
    width: 100%;
    color: white;
    transition: background-color 0.3s ease;
}

.input-descricao {
    all: unset;
    display: inline-block;
    cursor: text;
    font-size: 16px;
    width: 100%;
    color: white;
    transition: background-color 0.3s ease;
}

.input-pergunta:hover,
.input-descricao:hover {
    background-color: #1a142a;
}
</style>
