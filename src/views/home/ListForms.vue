<script setup>
import {ref} from "vue";
import {Button, Card, Dialog, InputGroup, InputGroupAddon, InputText, Paginator, Password} from "primevue";
import {useToast} from "primevue/usetoast";
import {useHomeStore} from "@/stores/homeStore.js";


const homeStore = useHomeStore()
const toast = useToast();

const visible = ref(false)
const form_name = ref('')
homeStore.getlista()




const  form_load = ref(false)
async function createForm() {
    form_load.value = true
    await homeStore.cadastrarForm(form_name.value)
    toast.add({severity: 'success', detail: 'Form cadastrado com sucesso'})
    visible.value = false;
    form_load.value = false;
}
function onPageChange(event) {
    homeStore.page = event.page + 1;
    homeStore.per_page = event.rows;
    homeStore.getlista();
}

</script>

<template>
    <div class="hidden mt-4 w-full sm:flex justify-center">
        <div class="flex w-3/4 justify-between">
            <InputGroup size="small">
                <InputText size="small" v-model="homeStore.buscar" placeholder="Buscar"/>
                <InputGroupAddon>
                    <Button size="small" icon="pi pi-search" label="Buscar" @click="homeStore.getlista()"/>
                </InputGroupAddon>
                <InputGroupAddon >
                    <Button size="small" class="hidden" label="Criar Formulário" @click="visible = !visible"/>
                </InputGroupAddon>
            </InputGroup>
        </div>
    </div>

    <div class="mt-8 flex justify-center">
        <div class="w-3/4">
            <Card class="mt-4" v-for="form in homeStore.list_form" :key="form.id">
                <template #content>
                    <div class="flex justify-between items-center gap-4 hover-componente">

                        <div class="w-full">
                            <h2>Formulario: {{ form.nome }}</h2>
                            <p>Total de respostas: {{ form.qt_respostas }}</p>
                        </div>
                        <div class="w-1/12 flex justify-center">
                            <router-link :to="`/edit-form/${form.id}`">
                                <Button size="small" type="button" variant="outlined" icon="pi pi-cog"/>
                            </router-link>
                        </div>
                    </div>
                </template>
            </Card>

            <Paginator class="mt-10" :rows="15" :totalRecords="homeStore.total" @page="onPageChange">
                <template #container="{ first, last, page, pageCount, prevPageCallback, nextPageCallback, totalRecords }">
                    <div class="flex items-center gap-4  border-primary bg-transparent rounded-full w-full py-1 px-2 justify-between">
                        <Button icon="pi pi-chevron-left" rounded text @click="prevPageCallback" :disabled="page === 0" />
                        <div class="text-color font-medium">
                            <span class="block sm:hidden">pagina {{ page + 1 }} de {{ pageCount }}</span>
                            <span class="hidden sm:block">mostrando {{ first }} para {{ last }} de {{ totalRecords }}</span>
                        </div>
                        <Button icon="pi pi-chevron-right" rounded text @click="nextPageCallback" :disabled="page === pageCount - 1" />
                    </div>
                </template>
            </Paginator>
        </div>
    </div>


    <Dialog v-model:visible="visible" modal header="Cadastrar formulario" :style="{ width: '25rem' }">
        <div class="flex flex-col  mb-4">
            <label for="username" class="font-semibold w-24">Nome</label>
            <InputText label id="username" v-model="form_name" class="flex-auto" autocomplete="off"/>
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" :loading="form_load" label="Save" @click="createForm"></Button>
        </div>
    </Dialog>
</template>


<style>
.logo-card {
    width: 140px;
}


</style>
