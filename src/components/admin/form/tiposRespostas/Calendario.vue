<script setup>
import { useEditFormStore } from "@/stores/EditFormStore.js";
import { DatePicker } from "primevue";
import {ref} from "vue";

const editFormStore = useEditFormStore();

;</script>

<template>
    <div>
        <input autofocus v-model="editFormStore.questao_select.titulo"
               class="input-pergunta" />

        <input v-model="editFormStore.questao_select.descricao"
               class="input-descricao" />
        <div class="mt-20">
            <DatePicker v-model="date" v-if="editFormStore.questao_select.config.tipo_calendario === 'data simples'"
                        :locale="locale"
                        dateFormat="dd/mm/yy"
                        class="w-full sm:w-[30rem]" />

            <DatePicker v-model="date" v-if="editFormStore.questao_select.config.tipo_calendario === 'multiplas datas'"
                        :locale="locale"
                        selectionMode="multiple"
                        dateFormat="dd/mm/yy"
                        class="w-full sm:w-[30rem]" />

            <DatePicker v-model="date" v-if="editFormStore.questao_select.config.tipo_calendario === 'intervalo de datas'"
                        :locale="locale"
                        selectionMode="range"
                        dateFormat="dd/mm/yy"
                        class="w-full sm:w-[30rem]" />


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
