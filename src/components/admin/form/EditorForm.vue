<script setup>
import {Badge, Button, Card, Drawer, Select, ToggleSwitch} from "primevue";
import {reactive, ref} from "vue";
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
import Calendaly from "@/components/admin/form/tiposRespostas/Calendaly.vue";
import ConfigAlternativas from "@/components/admin/form/config/ConfigAlternativas.vue";

const confirm = useConfirm();
const toast = useToast();


const editFormStore = useEditFormStore()
const route = useRoute()
const visibleConfig = ref(false)
const tipos_pergunta = reactive([
    'texto simples',
    'alternativas',
    'email',
    'range',
    'arquivo',
    'data',
    'calendaly'

])
const badge_map = reactive({
    texto_simples: 'primary',
    alternativas: 'success',
    email: 'warn',
    data: 'warn',
    range: 'info',
    arquivo: 'danger',
    calendaly: 'success'
})

function getSeverity(tipo) {
    return badge_map[tipo]
}

function deleteQuestao(questao, index) {
    confirm.require({
        message: 'Voce realmente ques remover esta questão ' + questao.titulo,
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
            toast.add({severity: 'success', summary: 'sucesso', detail: 'Questão removida com sucesso', life: 3000});
        },

    });
}

async function updateObrigatorio() {
    await editFormStore.updateObrigatorio()

    toast.add({severity: 'success', summary: 'sucesso', detail: 'Questão atualizada com sucesso', life: 3000});

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
                    <Button icon="pi pi-plus" label="Adicionar questão" size="small"
                            :loading="editFormStore.loading"
                            @click="editFormStore.salvarQuestao(route.params.id)"/>
                </div>
                <draggable
                    v-model="editFormStore.lista_questao"
                    item-key="order"
                    @end="drag=false"
                    @start="drag=true"
                    @update="editFormStore.updateOrder">
                    <template #item="{element, index}">
                        <div class="flex justify-between   items-center   py-3 mt-3 hover-componente "
                             @click="editFormStore.setSelectQuestao(element)">
                            <div class="flex justify-start   gap-2">
                                <div class=" w-5 flex items-center justify-center ">
                                    <Button icon="pi pi-arrows-v" size="small" variant="text"/>
                                </div>
                                <div class="flex w-1 items-center">
                                    {{ index + 1 }}
                                </div>
                                <div class="card-titulo">
                                    <div>
                                        <p> {{ element.titulo }}</p>
                                        <Badge :severity="getSeverity(element.tipo)" :value="element.tipo"
                                               size="small"></Badge>
                                    </div>
                                </div>
                            </div>
                            <div class="    justify-end ">
                                <div v-if="element.id === editFormStore.questao_select.id" class="flex justify-end ">
                                    <Button icon="pi pi-trash" size="small" variant="text"
                                            @click="deleteQuestao(element, index)"/>
                                    <Button icon="pi pi-cog" size="small" variant="text" @click="openConfig(element)"/>
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
                            v-model="editFormStore.questao_select.tipo"
                            :options="tipos_pergunta"
                            @change="editFormStore.updateTipo()"
                        />
                    </div>
                    <div>
                          <span class="flex items-center gap-2">
                                <ToggleSwitch v-model="editFormStore.questao_select.obrigatorio"
                                              @change="updateObrigatorio"/>
                                Obrigatório
                          </span>
                    </div>
                </div>

                <div class="h-screen-minus-165 flex justify-center items-center">
                    <TextoSimplesInput v-if="editFormStore.questao_select.tipo === 'texto simples' "/>
                    <EmailInput v-if="editFormStore.questao_select.tipo === 'email'"/>
                    <AlternativasInput v-if="editFormStore.questao_select.tipo === 'alternativas' "/>
                    <ArquivoInput v-if="editFormStore.questao_select.tipo === 'arquivo' "/>
                    <RangeInput v-if="editFormStore.questao_select.tipo === 'range' "/>
                    <Calendario v-if="editFormStore.questao_select.tipo === 'data' "/>
                    <Calendaly v-if="editFormStore.questao_select.tipo === 'calendaly'"/>
                </div>
            </template>
        </Card>
    </div>

    <Drawer v-model:visible="visibleConfig" class="!w-full md:!w-80 lg:!w-[40rem]"
            header=" Configuração questão"
            position="right">

        <RegrasRespostas/>
        <ConfigAlternativas v-if="editFormStore.questao_select.tipo === 'alternativas'"/>
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
