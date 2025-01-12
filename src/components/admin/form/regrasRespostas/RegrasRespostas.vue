<script setup>
import {FloatLabel, Select, Button,InputText} from "primevue";
import {ref, watch} from "vue";
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {useToast} from "primevue/usetoast";
import {useConfirm} from "primevue/useconfirm";

const confirm = useConfirm()
const toast = useToast();
const editFormStore = useEditFormStore()


const tipos = ref([])

async function addRegra() {
    var resposta = await editFormStore.addRegraResposta()

    if (resposta === true) {
        toast.add({severity: 'success', summary: 'sucesso', detail: 'Regra salva com sucesso', life: 3000});
    } else {
        toast.add({
            severity: 'error',
            summary: 'Erro',
            detail: 'Nao pode ter duas regras pra mesma resposta',
            life: 3000
        });
    }
}

async function update() {
    await editFormStore.updateRegraResposta()

    toast.add({severity: 'success', summary: 'sucesso', detail: 'Regra salva com sucesso', life: 3000});
}


function deleteRegra(regra, index) {
    confirm.require({
        message: 'Voce realmente ques remover esta regra ?',
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
            editFormStore.removerRegra(index)
            toast.add({severity: 'success', summary: 'sucesso', detail: 'Regra removida com sucesso', life: 3000});
        },

    });
}

</script>

<template>
    <h1>Regras Respostas</h1>
    <p>
        Crie uma regra para que, quando a resposta selecionada for escolhida,
        ele redirecione para uma questão diferente, sem ser a próxima.
    </p>

    <div class="mt-8 flex justify-center items-end   gap-3 w-full">
        <FloatLabel class="w-1/2  mt-8" v-if="editFormStore.questao_select.tipo === 'alternativas'">
            <Select inputId="over_label"
                    :options="editFormStore.questao_select.alternativas"
                    v-model="editFormStore.regra_resposta.resposta"
                    filter
                    optionLabel="name"
                    optionValue="name"
                    class="w-full"
            />
            <label for="over_label">Resposta</label>
        </FloatLabel>
        <FloatLabel class="w-1/2  mt-8" v-else>
            <InputText inputId="over_label"
                    v-model="editFormStore.regra_resposta.resposta"
                    class="w-full"
            />
            <label for="over_label">Resposta</label>
        </FloatLabel>
        <FloatLabel class="w-1/2  mt-8">
            <Select inputId="over_label"
                    :options="editFormStore.lista_questao"
                    v-model="editFormStore.regra_resposta.pergunta"
                    filter
                    optionLabel="titulo"
                    optionValue="id"
                    class="w-full"

            />
            <label for="over_label">Pergunta</label>
        </FloatLabel>
        <Button icon="pi pi-save"
                class="h-10"
                size="small"
                aria-label="Save"
                @click="addRegra"
        />
    </div>


    <div class=" mt-10">
        <h1>Lista Regras</h1>

        <div class="flex justify-center items-end gap-3 w-full"
             v-for="(regra, index) in editFormStore.questao_select.config.regras_resposta"
        >
            <FloatLabel class="w-1/2  mt-8">
                <Select inputId="over_label"
                        :options="editFormStore.questao_select.alternativas"
                        @change="update"
                        v-model="regra.resposta"
                        filter
                        optionLabel="name"
                        optionValue="name"
                        class="w-full"
                />
                <label for="over_label">Resposta</label>
            </FloatLabel>
            <FloatLabel class="w-1/2  mt-8">
                <Select inputId="over_label"
                        :options="editFormStore.lista_questao"
                        @change="update"
                        v-model="regra.pergunta"
                        filter
                        optionLabel="titulo"
                        optionValue="id"
                        class="w-full"

                />
                <label for="over_label">Pergunta</label>
            </FloatLabel>
            <Button variant="text" size="small" @click="deleteRegra(regra, index)" severity="danger"
                    icon="pi pi-trash"/>

        </div>
    </div>


</template>

<style scoped>

</style>
