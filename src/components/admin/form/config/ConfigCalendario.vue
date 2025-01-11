<script setup>
import {Button, FloatLabel, Select} from "primevue";
import {ref} from "vue";

const tipos_calendario = ref([
    'data simples',
    'multiplas datas',
    'intervalo de datas'
])
</script>

<template>
    <div class="mt-8">
        <h1>Configurar Calendario</h1>
    </div>

    <div class="mt-8 ">
        <div class="mt-8 flex justify-center items-end   gap-3 w-full">
            <FloatLabel class="w-full  mt-8">
                <Select
                        :options="tipos_calendario"
                        filte
                        class="w-full"
                />
                <label >Tipo de calendario</label>
            </FloatLabel>
        </div>
    </div>
</template>

<style scoped>

</style>
