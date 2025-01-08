<script setup>
import {Select, FloatLabel, InputNumber, Checkbox} from "primevue";
import {ref, watch} from "vue";
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
</script>

<template>
<div >
    <FloatLabel class="w-full  mt-8">
        <Select v-model="formStore.questao_select.config.orientacao" inputId="over_label" :options="tipos"  class="w-full" />
        <label for="over_label">Orientacao</label>
    </FloatLabel>

    <FloatLabel class="w-full  mt-8">
        <InputNumber v-model="formStore.questao_select.config.steps"    fluid />
        <label for="over_label">invertvalo das etapas</label>
    </FloatLabel>

    <div class="flex items-center gap-2 w-full  mt-8">
        <Checkbox v-model="formStore.questao_select.config.invervalos" binary />
        <label for="ingredient1"> Ativar intervalos </label>
    </div>

    <FloatLabel class="w-full  mt-8">
        <InputNumber v-model="formStore.questao_select.config.valor_inicial"   fluid />
        <label for="over_label">Valor inicial</label>
    </FloatLabel>

    <FloatLabel class="w-full  mt-8">
        <InputNumber v-model="formStore.questao_select.config.valor_final"   fluid />
        <label for="over_label">Valor final</label>
    </FloatLabel>
</div>


</template>

<style scoped>

</style>
