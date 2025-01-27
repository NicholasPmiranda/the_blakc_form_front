<script setup>
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {computed, ref, watch} from "vue";
import {useConfigGeral} from "@/stores/ConfigGeralStore.js";
import {Slider} from "primevue";
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";

const questionario = useQuestionarioStore()
const intpuValor = ref()


</script>

<template>
    <div class="w-full md:w-1/2">
        <p class="input-pergunta text-center">{{ questionario.questao_select.titulo }}</p>
        <p class="input-descricao text-center">{{ questionario.questao_select.descricao }}</p>

        <div class="mt-20 text-center">
            <Slider v-model="intpuValor"
                    :orientation="questionario.questao_select.config.orientacao"
                    :step="questionario.questao_select.config.steps"
                    :range="questionario.questao_select.config.invervalos"
                    :min="questionario.questao_select.config.valor_inical"
                    :max="questionario.questao_select.config.valor_final"
            />

            <div  class="text-center mt-8" v-if="Array.isArray(intpuValor)">
                Valor inicial: {{intpuValor[0]}}
                <br>
                Valor final: {{intpuValor[1]}}
            </div>
            <div v-else>
                {{intpuValor}}
            </div>
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

.input-text-area {
    all: unset;
    display: inline-block;
    cursor: text;
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
