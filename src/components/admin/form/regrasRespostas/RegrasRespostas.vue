<script setup>
import {Button, FloatLabel, InputText, Select} from "primevue";
import {ref} from "vue";
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

async function addRedirect() {
    await editFormStore.updateConfig()

    toast.add({severity: 'success', summary: 'sucesso', detail: 'Redirect salva com sucesso', life: 3000});
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
    <div>
        <h1>Rediricionar</h1>
        <p>
            Mande o usuário para outra página fora do formulário, caso deseje.
            Recomendamos ativar isso somente na última resposta, pois isso pode atrapalhar
            o fluxo de resposta do usuário.
        </p>
        <div class="flex items-center mt-8 gap-5 w-full">
            <FloatLabel class="w-full  ">
                <InputText v-model="editFormStore.questao_select.config.redirect"
                           class="w-full"
                           inputId="over_label"
                />
                <label for="over_label">Link Externo</label>
            </FloatLabel>
            <Button :loading="editFormStore.loading"
                    aria-label="Save"
                    icon="pi pi-save"
                    @click="addRedirect"
            />
        </div>
    </div>


    <div class="mt-10">
        <h1>Regras Respostas</h1>
        <p>
            Crie uma regra para que, quando a resposta selecionada for escolhida,
            ela redirecione para uma questão diferente, sem ser a próxima.
        </p>
        <div class="mt-8 flex justify-center items-end   gap-3 w-full">
            <FloatLabel v-if="editFormStore.questao_select.tipo === 'alternativas'" class="w-1/2  mt-8">
                <Select v-model="editFormStore.regra_resposta.resposta"
                        :options="editFormStore.questao_select.alternativas"
                        class="w-full"
                        filter
                        inputId="over_label"
                        optionLabel="name"
                        optionValue="name"
                />
                <label for="over_label">Resposta</label>
            </FloatLabel>
            <FloatLabel v-else class="w-1/2  mt-8">
                <InputText v-model="editFormStore.regra_resposta.resposta"
                           class="w-full"
                           inputId="over_label"
                />
                <label for="over_label">Resposta</label>
            </FloatLabel>
            <FloatLabel class="w-1/2  mt-8">
                <Select v-model="editFormStore.regra_resposta.pergunta"
                        :options="editFormStore.lista_questao"
                        class="w-full"
                        filter
                        inputId="over_label"
                        optionLabel="titulo"
                        optionValue="id"

                />
                <label for="over_label">Pergunta</label>
            </FloatLabel>
            <Button :loading="editFormStore.loading"
                    aria-label="Save"
                    class="h-10"
                    icon="pi pi-save"
                    size="small"
                    @click="addRegra"
            />
        </div>


        <div class=" mt-10">
            <h1>Lista Regras</h1>

            <div v-for="(regra, index) in editFormStore.questao_select.config.regras_resposta"
                 class="flex justify-center items-end gap-3 w-full"
            >
                <FloatLabel class="w-1/2  mt-8">
                    <Select v-model="regra.resposta"
                            :options="editFormStore.questao_select.alternativas"
                            class="w-full"
                            filter
                            inputId="over_label"
                            optionLabel="name"
                            optionValue="name"
                            @change="update"
                    />
                    <label for="over_label">Resposta</label>
                </FloatLabel>
                <FloatLabel class="w-1/2  mt-8">
                    <Select v-model="regra.pergunta"
                            :options="editFormStore.lista_questao"
                            class="w-full"
                            filter
                            inputId="over_label"
                            optionLabel="titulo"
                            optionValue="id"
                            @change="update"

                    />
                    <label for="over_label">Pergunta</label>
                </FloatLabel>
                <Button icon="pi pi-trash" severity="danger" size="small" variant="text"
                        @click="deleteRegra(regra, index)"/>

            </div>
        </div>
    </div>


</template>

<style scoped>

</style>
