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
import {onMounted} from "vue";
import Pixel from "@/components/rastreio/Pixel.vue";
import Gtm from "@/components/rastreio/Gtm.vue";
import Calendaly from "@/components/questionario/Calendaly.vue";

const questionarioStore = useQuestionarioStore()
const toast = useToast()
const route = useRoute()


async function proximo() {
    if (questionarioStore.questao_select.obrigatorio === true) {
        if (questionarioStore.resposta === '') {
            return toast.add({severity: 'error', summary: 'Erro', detail: 'Pergunta obrigatoria', life: 3000});
        }
    }

    var resposta = await questionarioStore.proximoQuestao()

    if (resposta === 'finalizado') {
        return toast.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'formulario finalizado com sucesso',
            life: 3000
        });
    }
}

async function carregarPixel() {
    questionarioStore.pixel.forEach((pixel) => {
        // Verifica se é um pixel do Facebook pelo código
        if (pixel.codigo.includes('fbq')) {
            // Primeiro, adiciona o script base do Facebook
            const fbScript = document.createElement('script');
            fbScript.innerHTML = `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
            `;
            document.head.appendChild(fbScript);

            // Depois adiciona o código específico do pixel
            const pixelScript = document.createElement('script');
            pixelScript.innerHTML = pixel.codigo;
            document.head.appendChild(pixelScript);
        } else {
            // Para outros tipos de pixel, mantém o comportamento original
            const script = document.createElement('script');
            script.innerHTML = pixel.codigo;
            document.head.appendChild(script);
        }
    });
}



onMounted(async () => {
    await questionarioStore.listarQuestoes(route.params.id)
    questionarioStore.form_id = route.params.id
    // carregarPixel()
})
</script>

<template>
    <Pixel/>
    <Gtm/>
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
                    <Calendaly v-if="questionarioStore.questao_select.tipo === 'calendaly'"/>

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
