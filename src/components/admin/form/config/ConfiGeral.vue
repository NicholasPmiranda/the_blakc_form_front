<script setup>
import {FloatLabel, InputText} from "primevue";
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {useRoute} from "vue-router";
import {onMounted} from "vue";
import {useToast} from "primevue/usetoast";

const formStore = useEditFormStore()
const route = useRoute()
const toast = useToast()

async function salvar() {
    await formStore.updateName(route.params.id)

    toast.add({severity: 'success', summary: 'sucesso', detail: 'Formulario salvo com sucesso', life: 3000});
}

onMounted(async () => {
    await formStore.getForm(route.params.id)

})
</script>

<template class="fle">
    <div class="flex justify-center">
        <div class=" w-1/4">
            <div class="">
                <FloatLabel>
                    <InputText id="nome_form" v-model="formStore.form.nome" class="w-full" @blur="salvar()"/>
                    <label for="nome_form">Nome formulario</label>
                </FloatLabel>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
