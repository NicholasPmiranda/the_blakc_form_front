<script setup>
import {useEditFormStore} from "@/stores/EditFormStore.js";
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";
import {onMounted} from "vue";

const questionario = useQuestionarioStore();
const calendlyUrl = questionario.questao_select.config.url_agenda+'?hide_event_type_details=1&hide_gdpr_banner=1&background_color=1e1e2e&text_color=ffffff&primary_color=b58fff'


onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://assets.calendly.com/assets/external/widget.js'
    script.async = true
    document.body.appendChild(script)

})
</script>

<template>
    <div class="flex justify-center flex-col ">
        <p class="input-pergunta text-center">{{ questionario.questao_select.titulo }}</p>
        <p class="input-descricao text-center">{{ questionario.questao_select.descricao }}</p>

        <div class="mt-20">
            <div
                class="calendly-inline-widget"
                :data-url="calendlyUrl"
                :style="{ minWidth: '320px', height: '500px' }"
            ></div>

        </div>
    </div>
</template>

<style scoped>
.input-pergunta {
    all: unset;
    display: inline-block;
    cursor: text;
    padding: 0.5rem;
    font-size: 25px;
    width: 100%;
    color: white;
    transition: background-color 0.3s ease;
}

.input-descricao {
    all: unset;
    display: inline-block;
    cursor: text;
    font-size: 16px;
    width: 100%;
    color: white;
    transition: background-color 0.3s ease;
}

.input-pergunta:hover,
.input-descricao:hover {
    background-color: #1a142a;
}
</style>
