<script setup>
import {FloatLabel, InputText} from "primevue";
</script>

<template class="fle">
    <div class="flex justify-center">
        <div class=" w-1/4">
            <div class="">
                <FloatLabel>
                    <InputText id="nome_form" v-model="value1" class="w-full"/>
                    <label for="nome_form">Nome formulario</label>
                </FloatLabel>
            </div>
        </div>
    </div>

</template>

<style scoped>

</style>
