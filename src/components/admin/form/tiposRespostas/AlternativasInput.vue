<script setup>
import {reactive, ref, watch} from "vue";
import {Button, Checkbox} from "primevue";
import draggable from "vuedraggable";
import {useEditFormStore} from "@/stores/EditFormStore.js";

const editFormStore = useEditFormStore()

const categories = ref([
    {name: "Accounting", key: 1},
    {name: "Marketing", key: 2},
    {name: "Production", key: 3},
    {name: "Research", key: 4}
]);

const selectedCategories = ref(['Marketing']);

function addAlternativa() {
    categories.value.push(
        {name: "Research", key: "R"}
    )
}
watch(
    () => editFormStore.questao_select.descricao,
    async (newVal, oldVal) => {
        if (editFormStore.saveTimeout) {
            clearTimeout(editFormStore.saveTimeout)
        }
        editFormStore.saveTimeout = setTimeout(async () => {
            if (newVal !== oldVal) {
                await editFormStore.updateDescricao()
            }
        }, 2000)
    },
    { deep: true }
)
watch(
    () => editFormStore.questao_select.titulo,
    async (newVal, oldVal) => {
        if (editFormStore.saveTimeout) {
            clearTimeout(editFormStore.saveTimeout)
        }
        editFormStore.saveTimeout = setTimeout(async () => {
            if (newVal !== oldVal) {
                await editFormStore.updateTitulo()
            }
        }, 1000)
    },
    { deep: true }
)
watch(
    () => editFormStore.questao_select.alternativas,
    async (newVal, oldVal) => {
        if (editFormStore.saveTimeout) {
            clearTimeout(editFormStore.saveTimeout)
        }
        editFormStore.saveTimeout = setTimeout(async () => {
            await editFormStore.updateAlernativas()
        }, 1000)
    },
    { deep: true }
)
</script>

<template>
    <div class="">
        <input  v-model="editFormStore.questao_select.titulo" @blur="editFormStore.updateTitulo" class="input-pergunta"/>
        <input  v-model="editFormStore.questao_select.descricao" @blur="editFormStore.updateDescricao"  class="input-descricao"/>

        <div class="mt-4">
            <draggable
                v-model="editFormStore.questao_select.alternativas"
                group="people"
                @start="drag=true"
                @end="drag=false"
                item-key="id">
                <template #item="{element, index}">
                    <div class="flex items-center">
<!--                        <Button variant="text" size="small" icon="pi pi-arrows-v" />-->
                        <Button variant="text" size="small" icon="pi pi-bars" />
                        <Checkbox  name="category" :value="element.name"/>
                        <input class="input-descricao" v-model="element.name"/>
                        <Button variant="text" size="small" @click="editFormStore.removerAlterternativa(index)"  severity="danger" icon="pi pi-trash" />
                    </div>
                </template>
            </draggable>
        </div>


        <Button @click="editFormStore.addAlterternativa()" class="mt-8"
                icon="pi pi-plus"
                size="small" variant="outlined"
                label="Add alternativas"/>

    </div>

</template>

<style scoped>
.input-pergunta {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 25px;
    width: 100%;
    color: white;

}

.input-descricao {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    width: 100%;
    color: white;
}

.input-text-area {
    all: unset;
    display: inline-block; /* Necessário para inputs que perdem estilo */
    cursor: text; /* Mostra o cursor de ponteiro no input */
    padding: 0.5rem;
    font-size: 16px;
    text-align: start;
    width: 100%;
    color: white;
    border-bottom: 1px solid #B182FF;

}

.input-text-area:hover {
    background-color: #1a142a;
}

.input-pergunta:hover {
    background-color: #1a142a;
}


.input-descricao:hover {
    background-color: #1a142a;
}
</style>
