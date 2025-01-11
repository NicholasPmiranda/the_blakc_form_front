<script setup>
import { useEditFormStore } from "@/stores/EditFormStore.js";
import { DatePicker } from "primevue";
import {ref} from "vue";

const ediFormStore = useEditFormStore();

const locale = ref({
        firstDayOfWeek: 0,
        dayNames: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"],
        dayNamesShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
        dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
        monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
        monthNamesShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
        today: 'Hoje',
        clear: 'Limpar'
    })
;</script>

<template>
    <div>
        <input autofocus v-model="ediFormStore.questao_select.titulo"
               value="qual sua pergunta ?"
               class="input-pergunta" />

        <input v-model="ediFormStore.questao_select.descricao"
               value="Sua opinião é muito importante pra gente."
               class="input-descricao" />

        <div class="mt-20">
            <DatePicker v-model="date"
                        :locale="locale"
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
