<script setup>
import {useRoute} from "vue-router";
import {Button, ButtonGroup, Card} from "primevue";
import {reactive, ref} from "vue";
import EditoForm from "@/components/admin/form/EditorForm.vue";
import ConfigForm from "@/components/admin/form/ConfigForm.vue";
import Compartilhar from "@/components/admin/form/Compartilhar.vue";

const lista_questao = reactive([1, 2, 3, 4])
const route = useRoute()
const tab_select = ref('editor')
const tipos_pergunta= reactive([
    'texto simples',
    'alternativas',
    'range'
])
const tipo_select = ref('texto simples')

function setTab(tab) {
    tab_select.value = tab
}

</script>

<template>
    <card>
        <template #content>
            <div class="flex justify-between">
                <div>
                    <Button variant="text" size="small" label="volvar" icon="pi pi-arrow-left"/>
                </div>
                <div class=" flex">
                    <Button :variant="tab_select === 'editor' ? 'outlined' : 'text'"
                            aria-label="Filter" size="small"
                            label="Editar" icon="pi pi-pencil"
                            @click="setTab('editor')"
                    />
                    <Button :variant="tab_select === 'opcao' ? 'outlined' : 'text'"
                            label="opcoes" icon="pi pi-trash" size="small"
                            @click="setTab('opcao')"/>
                    <Button :variant="tab_select === 'compartilhar' ? 'outlined' : 'text'"
                            label="Compartilhar" icon="pi pi-times" size="small"
                            @click="setTab('compartilhar')"/>
                    <Button :variant="tab_select === 'respostas' ? 'outlined' : 'text'"
                            label="respostas" icon="pi pi-times" size="small"
                            @click="setTab('respostas')"/>
                </div>
                <div>
                    <ButtonGroup>
                        <Button variant="text" label="Ver" icon="pi pi-check"/>
                        <Button variant="text" label="Publicar" icon="pi pi-trash"/>
                    </ButtonGroup>
                </div>
            </div>
        </template>
    </card>

    <div class="flex  ">
        <EditoForm v-if="tab_select === 'editor'"/>
        <ConfigForm v-if="tab_select === 'opcao'"/>
        <Compartilhar v-if="tab_select === 'compartilhar'"/>
    </div>
</template>

<style scoped>

.ative-componente {
    background-color: #1a142a;
}

</style>
