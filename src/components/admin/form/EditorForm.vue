<script setup>
import {Badge, Button, Card, Drawer, Select, ToggleSwitch, ConfirmDialog} from "primevue";
import {onMounted, reactive, ref, watch} from "vue";
import TextoSimplesInput from "@/components/admin/form/tiposRespostas/TextoSimplesInput.vue";
import AlternativasInput from "@/components/admin/form/tiposRespostas/AlternativasInput.vue";
import EmailInput from "@/components/admin/form/tiposRespostas/EmailInput.vue";

import {useEditFormStore} from "@/stores/EditFormStore.js";
import {useRoute} from "vue-router";
import draggable from "vuedraggable";
import {useConfirm} from "primevue/useconfirm";
import {useToast} from "primevue/usetoast";
import ArquivoInput from "@/components/admin/form/tiposRespostas/ArquivoInput.vue";
import RangeInput from "@/components/admin/form/tiposRespostas/RangeInput.vue";
import ConfigRange from "@/components/admin/form/config/ConfigRange.vue";
import RegrasRespostas from "@/components/admin/form/regrasRespostas/RegrasRespostas.vue";
import Calendario from "@/components/admin/form/tiposRespostas/Calendario.vue";
import ConfigCalendario from "@/components/admin/form/config/ConfigCalendario.vue";

const confirm = useConfirm();
const toast = useToast();


const editFormStore = useEditFormStore()
const route = useRoute()
const visibleConfig = ref(false)
const tipos_pergunta = reactive([
    'texto_simples',
    'alternativas',
    'email',
    'range',
    'arquivo',
    'data'

])
const badge_map = reactive({
    texto_simples: 'primary',
    alternativas: 'success',
    email: 'warn',
    data: 'warn',
    range: 'info',
    arquivo: 'danger'
})

function getSeverity(tipo) {
    return badge_map[tipo]
}

function deleteQuestao(questao, index) {
    confirm.require({
        message: 'Voce realmente ques remover esta questao ' + questao.titulo,
        header: 'Confirmar',
        icon: 'pi pi-exclamation-triangle',
        rejectProps: {
            label: 'Cancelar',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Deletar',
            severity: 'danger',

        },
        accept: () => {
            editFormStore.removerQuestao(questao.id, index)
            toast.add({severity: 'success', summary: 'sucesso', detail: 'Questao removida com sucesso', life: 3000});
        },

    });
}

async function updateObrigatorio() {
    await editFormStore.updateObrigatorio()

    toast.add({severity: 'success', summary: 'sucesso', detail: 'Questao atualizada com sucesso', life: 3000});

}


editFormStore.listarQuestoes(route.params.id)

function openConfig(element) {
    visibleConfig.value = true

}


</script>

<template>
    <div class="w-2/6">
        <Card class="h-screen-minus-100  overflow-scroll">

            <template #content class=" ">
                <div class="flex justify-center">
                    <Button size="small" icon="pi pi-plus" label="Adicionar questao"
                            @click="editFormStore.salvarQuestao(route.params.id)"/>
                </div>
                <draggable
                    v-model="editFormStore.lista_questao"
                    @start="drag=true"
                    @end="drag=false"
                    @update="editFormStore.updateOrder"
                    item-key="order">
                    <template #item="{element, index}">
                        <div class="flex justify-between   items-center   py-3 mt-3 hover-componente "
                             @click="editFormStore.setSelectQuestao(element)">
                            <div class="flex justify-start   gap-2">
                                <div class=" w-5 flex items-center justify-center ">
                                    <Button size="small" variant="text" icon="pi pi-arrows-v"/>
                                </div>
                                <div class="flex w-1 items-center">
                                    {{ index + 1 }}
                                </div>
                                <div class="card-titulo">
                                    <div>
                                        <p> {{ element.titulo }}</p>
                                        <Badge size="small" :severity="getSeverity(element.tipo)"
                                               :value="element.tipo"></Badge>
                                    </div>
                                </div>
                            </div>
                            <div class="    justify-end ">
                                <div class="flex justify-end " v-if="element.id === editFormStore.questao_select.id">
                                    <Button variant="text" @click="deleteQuestao(element, index)" size="small"
                                            icon="pi pi-trash"/>
                                    <Button variant="text" size="small" @click="openConfig(element)" icon="pi pi-cog"/>
                                </div>
                            </div>
                        </div>
                    </template>
                </draggable>


            </template>
        </Card>
    </div>

    <div class="w-full">
        <Card class="w-full  ">
            <template #content>
                <div class="flex justify-between items-center">
                    <div>
                        <Select
                            @change="editFormStore.updateTipo()"
                            :options="tipos_pergunta"
                            v-model="editFormStore.questao_select.tipo"
                        />
                    </div>
                    <div>
                          <span class="flex items-center gap-2">
                                <ToggleSwitch @change="updateObrigatorio"
                                              v-model="editFormStore.questao_select.obrigatorio"/>
                                Obrigatório
                          </span>
                    </div>
                </div>

                <div class="h-screen-minus-165 flex justify-center items-center">
                    <TextoSimplesInput v-if="editFormStore.questao_select.tipo === 'texto_simples' "/>
                    <EmailInput v-if="editFormStore.questao_select.tipo === 'email'"/>
                    <AlternativasInput v-if="editFormStore.questao_select.tipo === 'alternativas' "/>
                    <ArquivoInput v-if="editFormStore.questao_select.tipo === 'arquivo' "/>
                    <RangeInput v-if="editFormStore.questao_select.tipo === 'range' "/>
                    <Calendario v-if="editFormStore.questao_select.tipo === 'data' "/>
                </div>
            </template>
        </Card>
    </div>

    <Drawer v-model:visible="visibleConfig" header="Configuracao questao"
            class="!w-full md:!w-80 lg:!w-[40rem]"
            position="right">

        <RegrasRespostas/>

        <ConfigRange v-if="editFormStore.questao_select.tipo === 'range'"/>
        <ConfigCalendario v-if="editFormStore.questao_select.tipo === 'data'"/>

    </Drawer>
</template>
<style scoped>
.card-titulo {
    white-space: nowrap; /* Impede que o texto quebre a linha */
    overflow: hidden; /* Esconde o texto que ultrapassar a largura */
    text-overflow: ellipsis; /* Adiciona "..." no final do texto cortado */
    width: 180px; /* Define a largura da div */
}

.hover-componente:hover {
    background-color: #150f21;
}

.h-screen-minus-100 {
    height: calc(100vh - 100px);
}

.h-screen-minus-165 {
    height: calc(100vh - 185px);
}
</style>
