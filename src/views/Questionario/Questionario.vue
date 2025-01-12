<script setup>
import {Button, Card} from "primevue";
import TextoSimplesInput from "@/components/questionario/TextoSimplesInput.vue";
import AlternativasInput from "@/components/questionario/AlternativasInput.vue";
import EmailInput from "@/components/questionario/EmailInput.vue";

import {useRoute} from "vue-router";

import ArquivoInput from "@/components/questionario/ArquivoInput.vue";
import RangeInput from "@/components/questionario/RangeInput.vue";

import Calendario from "@/components/questionario/Calendario.vue";
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";
import {useToast} from "primevue/usetoast";


const questionarioStore = useQuestionarioStore()
const toast = useToast()
const route = useRoute()


async function proximo() {
    if (questionarioStore.questao_select.obrigatorio === true) {
        if (questionarioStore.resposta === '') {
            return toast.add({severity: 'error', summary: 'Erro', detail: 'Pergunta obrigatoria', life: 3000});
        }
    }

    var resposta =  await  questionarioStore.proximoQuestao()

    if (resposta === 'finalizado') {
        return toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'formulario finalizado com sucesso',
            life: 3000
        });
    }
}

questionarioStore.listarQuestoes(route.params.id)
questionarioStore.form_id = route.params.id
</script>

<template>
    <div class="w-full h-screen  flex items-center ">
        <Card class="w-full">
            <template #content>
                <div class="h-screen-minus-165 flex justify-center items-center">
                    <TextoSimplesInput v-if="questionarioStore.questao_select.tipo === 'texto_simples' "/>
                    <EmailInput v-if="questionarioStore.questao_select.tipo === 'email'"/>
                    <AlternativasInput v-if="questionarioStore.questao_select.tipo === 'alternativas' "/>
                    <ArquivoInput v-if="questionarioStore.questao_select.tipo === 'arquivo' "/>
                    <RangeInput v-if="questionarioStore.questao_select.tipo === 'range' "/>
                    <Calendario v-if="questionarioStore.questao_select.tipo === 'data' "/>
                </div>
                <div class="flex justify-end">
                    <Button @click="proximo"> Proximo</Button>
                </div>

            </template>
        </Card>
    </div>
</template>
<style scoped>


.h-screen-minus-165 {
    height: calc(100vh - 185px);
}
</style>
