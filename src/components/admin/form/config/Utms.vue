<script setup>
import {Button, Column, DataTable, FloatLabel, InputText} from "primevue";
import {ref} from "vue";
import {useUtmStore} from "@/stores/UtmStore.js";
import {useRoute} from "vue-router";


const route = useRoute()
const utmStore = useUtmStore()


utmStore.getUtm(route.params.id)
</script>

<template class="fle">
    <div class="flex justify-center">
        <div class=" w-1/2 ">
            <h1>Cadastrar </h1>

            <div class="flex gap-2 mt-8">
                <div>
                    <FloatLabel>
                        <InputText id="nome_utm" v-model="utmStore.nome" class="w-full"/>
                        <label for="nome_utm">utm</label>
                    </FloatLabel>
                </div>
                <div>
                    <FloatLabel>
                        <InputText id="valor_utm" v-model="utmStore.valor" class="w-full"/>
                        <label for="valor_utm">valor</label>
                    </FloatLabel>
                </div>
                <div>
                    <Button label="Salvar" @click="utmStore.saveUtm(route.params.id)"/>
                </div>
            </div>


            <div>
                <DataTable :value="utmStore.list" >
                    <Column field="nome" header="Nome"></Column>
                    <Column field="valor" header="Valor"></Column>
                    <Column field="Action" header="acoes">
                        <template #body="{data, index}">
                            <Button icon="pi pi-trash" variant="text" @click="utmStore.deleteUtm(data.id,index)"/>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
    </div>


</template>

<style scoped>

</style>
