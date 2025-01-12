<script setup>
import {Card} from "primevue";
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {useRoute} from "vue-router";
const editFormStore = useEditFormStore()
const route = useRoute()

editFormStore.getForm(route.params.id)
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

        </template>


    </Card>

</template>

<style scoped>
.qr_code{
    border: 5px solid white;
}
</style>
