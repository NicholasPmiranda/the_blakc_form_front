<script setup>
import {Button, FloatLabel, InputText} from "primevue";
import {ref} from "vue";
const utm = ref('source')
const valor = ref('insta')
</script>

<template class="fle">
    <div class="flex justify-center">
        <div class=" w-1/2 ">
            <h1>Cadastrar </h1>

            <div class="flex gap-2 mt-8">
                <div>
                    <FloatLabel>
                        <InputText class="w-full" id="nome_utm" v-model="utm"/>
                        <label for="nome_utm">utm</label>
                    </FloatLabel>
                </div>
                <div >
                    <FloatLabel>
                        <InputText v-model="valor" class="w-full" id="valor_utm"/>
                        <label for="valor_utm">valor</label>
                    </FloatLabel>
                </div>
                <div>
                    <Button label="Salvar" />
                </div>
            </div>


        </div>
    </div>


</template>

<style scoped>

</style>
