<script setup>
import {ref} from "vue";
import {Button, Card, Dialog, InputGroup, InputGroupAddon, InputText, Menu} from "primevue";
import {useToast} from "primevue/usetoast";
import {useRouter} from "vue-router";
import {useHomeStore} from "@/stores/homeStore.js";


const homeStore = useHomeStore()
const toast = useToast();
const router = useRouter();
const mainMenu = ref();
const visible = ref(false)
const form_name = ref('')

homeStore.getlista()


const mainItems = ref([
    {
        items: [
            {label: 'Configurações', icon: 'pi pi-cog'},
            {label: 'Sair', icon: 'pi pi-sign-out'}
        ]
    }
]);


async function createForm() {
    visible.value = false;
    await homeStore.cadastrarForm(form_name.value)
    toast.add({severity: 'success', detail: 'Form cadastrado com sucesso'})
}
</script>

<template>
    <Card class="card w-full">
        <template #content>
            <div class="flex justify-between items-center">
                <div>
                    UMA LOGO BONITA BEM AQUI
                </div>
                <div>
                    <Button type="button" severity="secondary" icon="pi pi-ellipsis-v" @click="toggleMainMenu"
                            aria-haspopup="true" aria-controls="overlay_menu"/>
                    <Menu ref="mainMenu" id="overlay_menu" :model="mainItems" :popup="true"/>
                </div>
            </div>
        </template>
    </Card>

    <div class="mt-4 w-full flex justify-center">
        <div class="flex w-3/4 justify-between">
            <InputGroup>
                <InputGroupAddon>
                    <i class="pi pi-search"></i>
                </InputGroupAddon>
                <InputText placeholder="Buscar"/>
                <InputGroupAddon>
                    <Button class="b" label="Criar Formulário" @click="visible = !visible"/>
                </InputGroupAddon>
            </InputGroup>
        </div>
    </div>

    <div class="mt-8 flex justify-center">
        <div class="w-3/4">
            <Card class="mt-4" v-for="form in homeStore.list_form" :key="form.id">
                <template #content>
                    <div class="flex justify-between items-center gap-4 hover-componente">
                        <div class="w-1/12">
                            <img class="logo-card"
                                 src="https://res.cloudinary.com/ddxwdqwkr/image/upload/f_auto/v1689120136/patterns.dev/Images/vue/og-images/introduction.png"
                                 alt="Logo"/>
                        </div>
                        <div class="w-full">
                            <h2>{{ form.nome }}</h2>
                            <p>Total de respostas: {{ form.qt_respostas }}</p>
                        </div>
                        <div class="w-1/12 flex justify-center">
                            <router-link :to="`/edit-form/${form.id}`">
                                <Button type="button" variant="outlined" icon="pi pi-cog"/>
                            </router-link>
                        </div>
                    </div>
                </template>
            </Card>
        </div>
    </div>

    <Dialog v-model:visible="visible" modal header="Cadastrar formulario" :style="{ width: '25rem' }">
        <div class="flex flex-col  mb-4">
            <label for="username" class="font-semibold w-24">Nome</label>
            <InputText label id="username" v-model="form_name" class="flex-auto" autocomplete="off"/>
        </div>

        <div class="flex justify-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="createForm"></Button>
        </div>
    </Dialog>
</template>


<style>
.logo-card {
    width: 140px;
}


</style>
