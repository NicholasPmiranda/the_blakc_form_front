<script setup>
import {Button, Dialog, InputText, DataTable, Column,Toast} from "primevue";
import {ref} from "vue";
import {useGtmStore} from "@/stores/GoogleTagManagerStore.js";
import {useRoute} from "vue-router";
import {useToast} from "primevue/usetoast";
import {usePixelStore} from "@/stores/PixelFacebookStore.js";

const gtmStore = useGtmStore()
const pixelStore = usePixelStore()
const route = useRoute()
const toast = useToast()
const gmt_modal = ref(false)
const pixel_modal = ref(true)

function openGmt(){
    gtmStore.getTags(route.params.id)
    gmt_modal.value = true
}

function openPixel(){
    pixelStore.getPixel(route.params.id)
    pixel_modal.value = true
}

function deleteGtm(index ,id){
    gtmStore.deleteTag(id,index)
    toast.add({severity:'success', detail:'Tag removida com sucesso',summary:'sucesso'})

}
</script>

<template class="fle">
    <div class="flex justify-center">
        <div class=" w-1/2 ">
            <div class=" flex justify-around space-y-2">
                <div class="flex">
                    <Button @click="openGmt" variant="text" icon="pi pi-cog"/>
                    <img @click="openGmt" width="50" src="../../../../assets/logos/google-tag-assistant.svg"/>
                </div>
                <div class="flex">
                    <Button @click="openPixel" variant="text" icon="pi pi-cog"/>
                    <img @click="openPixel" width="50" src="../../../../assets/logos/fb.svg"/>
                </div>

            </div>
        </div>
    </div>

    <Dialog v-model:visible="pixel_modal" modal header="PixelFacebook" :style="{ width: '75rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Gerencie seus pixel do facebook</span>
        <div class="gap-y-4">
            <div class="flex flex-col">
                <label>Nome</label>
                <InputText v-model="pixelStore.nome"/>
            </div>

            <div class="flex flex-col ">
                <label>codigo do pixel</label>
                <InputText v-model="pixelStore.codigo"/>
            </div>



            <div class="flex mt-8 justify-end">
                <Button label="Salvar" @click="pixelStore.savePixel(route.params.id)"/>
            </div>
        </div>
        <hr class="mt-4">

        <div>
            <DataTable :value="pixelStore.list" tableStyle="min-width: 50rem">
                <Column field="nome" header="Nome"></Column>
                <Column field="codigo" header="Codigo"></Column>
                <Column field="Action" header="acoes">
                    <template #body="{data, index}">
                        <Button variant="text" @click="deleteGtm (index,data.id)" icon="pi pi-trash" />
                    </template>
                </Column>
            </DataTable>
        </div>

    </Dialog>

    <Dialog v-model:visible="gmt_modal" modal header="Google Tag Manager" :style="{ width: '75rem' }">
        <span class="text-surface-500 dark:text-surface-400 block mb-8">Gerencie suas tags do google</span>
        <div class="gap-y-4">
            <div class="flex flex-col">
                <label>Nome</label>
                <InputText v-model="gtmStore.nome"/>
            </div>

            <div class="flex mt-4  gap-2 justify-between">
                <div class="flex flex-col w-1/2">
                    <label>header</label>
                    <InputText v-model="gtmStore.header"/>
                </div>
                <div class="flex flex-col w-1/2">
                    <label>body</label>
                    <InputText v-model="gtmStore.body"/>
                </div>
            </div>

            <div class="flex mt-8 justify-end">
                <Button label="Salvar" @click="gtmStore.saveTags(route.params.id)"/>
            </div>
        </div>
        <hr class="mt-4">

        <div>
            <DataTable :value="gtmStore.list" tableStyle="min-width: 50rem">
                <Column field="nome" header="Nome"></Column>
                <Column field="header" header="Header"></Column>
                <Column field="body" header="Body"></Column>
                <Column field="Action" header="acoes">
                    <template #body="{data, index}">
                        <Button variant="text" @click="deleteGtm (index,data.id)" icon="pi pi-trash" />
                    </template>
                </Column>
            </DataTable>
        </div>

    </Dialog>

</template>

<style scoped>

</style>
