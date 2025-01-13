<script setup>
import {Card, MultiSelect} from "primevue";
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {useRoute} from "vue-router";
import {useUtmStore} from "@/stores/UtmStore.js";
const editFormStore = useEditFormStore()
const utmStore = useUtmStore()
const route = useRoute()

editFormStore.getForm(route.params.id)
utmStore.getUtm(route.params.id)
</script>

<template>
    <Card class="w-full">
        <template #content>
            <div class="w-full flex justify-center ">
                <div class=" text-center">
                    <h1>Qr code</h1>
                    <img class="qr_code" :src="editFormStore.form_select.qr_code_path"/>
                </div>
            </div>

            <div class="mt-10">
                <div class="w-full flex justify-center ">
                    <div class=" text-center">
                        <h1>Gerar Link com Utm</h1>
                        <MultiSelect @change="utmStore.updateLink" v-model="utmStore.utmSlecionada" :options="utmStore.lista_formatada"  filter placeholder="Select Cities"
                                     :maxSelectedLabels="3" class="w-full md:w-80" />

                    </div>
                </div>
                <div class="w-full flex justify-center mt-10 ">
                    {{utmStore.link}}
                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.qr_code{
    border: 5px solid white;
}
</style>
