<script setup>
import {FloatLabel, Select} from "primevue";
import {computed, ref, watch} from "vue";
import {useEditFormStore} from "@/stores/EditFormStore.js";

const tipos = ref([
    'horizontal', 'vertical'
])

const formStore = useEditFormStore()
watch(
    () => formStore.questao_select.config,
    async (newVal, oldVal) => {
        if (formStore.saveTimeout) {
            clearTimeout(formStore.saveTimeout)
        }
        formStore.saveTimeout = setTimeout(async () => {
            await formStore.updateConfig()
        }, 500)
    },
    {deep: true}
)

const limite = computed(() => {
    var lista = [];
    var loop = 1
    formStore.questao_select.alternativas.forEach(() => {
        lista.push(loop)
        loop = loop + 1
    })


    return lista
})

</script>

<template class="">
    <h1 class="mt-10 text-xl">Configurar alternativas</h1>
    <p>selecione o numero maximo de alternativas para resposta</p>
    <div>
        <FloatLabel class="w-full  mt-8">
            <Select v-model="formStore.questao_select.config.limite_respostas"  :options="limite" class="w-full"
                         inputId="over_label" min="1"/>
            <label for="over_label">Limite de alternativas</label>
        </FloatLabel>
    </div>
</template>

<style scoped>

</style>
