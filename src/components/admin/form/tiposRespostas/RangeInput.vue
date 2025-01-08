<script setup>
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {computed, ref, watch} from "vue";
import {useConfigGeral} from "@/stores/ConfigGeralStore.js";
import {Slider} from "primevue";

const ediFormStore = useEditFormStore()
const configTema = useConfigGeral()
const intpuValor = ref()



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
        }, 2000)
    },
    {deep: true}
)

</script>

<template>
    <div>
        <input autofocus v-model="ediFormStore.questao_select.titulo" value="qual sua pergunta ?"
               class="input-pergunta" />

        <input v-model="ediFormStore.questao_select.descricao" value="Sua opinião é muito importante pra gente."
               class="input-descricao"/>

        <div class="mt-20 text-center">
            <Slider v-model="intpuValor"
                    :orientation="ediFormStore.questao_select.config.orientacao"
                    :step="ediFormStore.questao_select.config.steps"
                    :range="ediFormStore.questao_select.config.invervalos"
                    :min="ediFormStore.questao_select.config.valor_inical"
                    :max="ediFormStore.questao_select.config.valor_final"
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
