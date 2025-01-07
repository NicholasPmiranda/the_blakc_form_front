<script setup>
import {Button, Dialog, InputText} from "primevue";
import {ref} from "vue";
import {useRdStore} from "@/stores/RdStationStore.js";
import {useRoute} from "vue-router";

const rd_modal = ref(false)
const route = useRoute()
const rdStore = useRdStore()


function getRd() {
    rdStore.get(route.params.id)
    rd_modal.value = true;
}

function salvarRd() {
    rdStore.save(route.params.id)
    rd_modal.value = false;
}
</script>

<template class="fle">
    <div class="flex justify-center">
        <div class=" w-1/2 ">
            <div class=" flex justify-around space-y-2">
                <div class="flex">
                    <Button variant="text" icon="pi pi-cog"/>
                    <img width="200" src="../../../../assets/logos/activeCampaing.svg"/>
                </div>
                <div class="flex">
                    <Button variant="text" icon="pi pi-cog" @click="getRd"/>
                    <img  @click="getRd" width="200" src="../../../../assets/logos/rd.svg"/>
                </div>

                <div class="flex">
                    <Button variant="text" icon="pi pi-cog"/>
                    <img width="200" src="../../../../assets/logos/google-sheets.svg"/>
                </div>
            </div>
        </div>
    </div>

    <Dialog v-model:visible="rd_modal" modal header="Integrar Rd stattion" :style="{ width: '25rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Cadastre ou atualize os dados</span>
        <div class="flex flex-col mb-8">
            <label for="token" class="font-semibold w-200">Token</label>
            <InputText id="token" v-model="rdStore.token" class="flex-auto" autocomplete="off"/>
        </div>
        <div class="flex flex-col mb-8">
            <label for="identificacao" class="font-semibold w-50">identficacao de conversao</label>
            <InputText id="identificacao" v-model="rdStore.identificacao" class="flex-auto" autocomplete="off"/>
        </div>
        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="salvar" @click="salvarRd()"></Button>
        </div>
    </Dialog>
</template>

<style scoped>

</style>
