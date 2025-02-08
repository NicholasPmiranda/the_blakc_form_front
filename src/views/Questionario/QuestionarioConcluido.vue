<script setup>
import {Card} from "primevue";
import {useRoute} from "vue-router";


import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";
import {useToast} from "primevue/usetoast";
import {onMounted} from "vue";
import Pixel from "@/components/rastreio/Pixel.vue";
import Gtm from "@/components/rastreio/Gtm.vue";

const questionarioStore = useQuestionarioStore()
const route = useRoute()




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
    questionarioStore.addQueryParams(route.query)

})
</script>

<template>
    <Pixel/>
    <Gtm/>
    <div class="w-full h-screen  flex items-center ">
        <Card class="w-full">
            <template #content>
                <div class="h-screen-minus-165 text-center flex justify-center items-center">
                    <div>
                        <i class="pi pi-heart" style="font-size: 3rem"></i>
                        <p class="text-xl">Valeu por ter tirado um tempinho para preencher o formulário! Sua participação é muito importante para nós. </p>
                    </div>

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
