<script setup>
import {useRoute} from "vue-router";
import {Button, ButtonGroup, Card} from "primevue";
import {reactive, ref} from "vue";
import EditoForm from "@/components/admin/form/EditorForm.vue";
import ConfigForm from "@/components/admin/form/ConfigForm.vue";
import Compartilhar from "@/components/admin/form/Compartilhar.vue";
import Analitics from "@/components/admin/form/Analitic/Analitics.vue";
import RespostaForm from "@/components/admin/form/respostaForm/RespostaForm.vue";

const lista_questao = reactive([1, 2, 3, 4])
const route = useRoute()
const tab_select = ref('editor')
const tipos_pergunta = reactive([
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
                    <Button icon="pi pi-arrow-left" label="volvar" size="small" variant="text"/>
                </div>
                <div class=" flex">
                    <Button :variant="tab_select === 'editor' ? 'outlined' : 'text'"
                            aria-label="Filter" icon="pi pi-pencil"
                            label="Editar" size="small"
                            @click="setTab('editor')"
                    />
                    <Button :variant="tab_select === 'opcao' ? 'outlined' : 'text'"
                            icon="pi pi-trash" label="opcoes" size="small"
                            @click="setTab('opcao')"/>
                    <Button :variant="tab_select === 'compartilhar' ? 'outlined' : 'text'"
                            icon="pi pi-times" label="Compartilhar" size="small"
                            @click="setTab('compartilhar')"/>
                    <Button :variant="tab_select === 'analicts' ? 'outlined' : 'text'"
                            icon="pi pi-chart-line" label="analytics" size="small"
                            @click="setTab('analicts')"/>
                    <Button :variant="tab_select === 'respostas' ? 'outlined' : 'text'"
                            icon="pi pi-times" label="respostas" size="small"
                            @click="setTab('respostas')"/>
                </div>
                <div>
                    <ButtonGroup>
                        <Button icon="pi pi-check" label="Ver" variant="text"/>
                        <Button icon="pi pi-trash" label="Publicar" variant="text"/>
                    </ButtonGroup>
                </div>
            </div>
        </template>
    </card>

    <div class="flex  ">
        <EditoForm v-if="tab_select === 'editor'"/>
        <ConfigForm v-if="tab_select === 'opcao'"/>
        <Compartilhar v-if="tab_select === 'compartilhar'"/>
        <Analitics v-if="tab_select === 'analicts'"/>
        <RespostaForm  v-if="tab_select === 'respostas'"/>
    </div>
</template>

<style scoped>

.ative-componente {
    background-color: #1a142a;
}

</style>
