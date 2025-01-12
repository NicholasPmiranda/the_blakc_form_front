<template>
    <div></div>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue'
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";

const questionarioStore = useQuestionarioStore()

const addGTMToHead = (gtmId) => {
    // Verifica se o script já existe
    if (document.querySelector(`script[src*="${gtmId}"]`)) return

    // Cria o script para o head
    const script = document.createElement('script')
    script.innerHTML = `
    (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','${gtmId}');
  `

    // Adiciona no head antes de qualquer outro script
    const head = document.head || document.getElementsByTagName('head')[0]
    head.insertBefore(script, head.firstChild)
}

const addGTMToBody = (gtmId) => {
    // Verifica se o noscript já existe
    if (document.querySelector(`iframe[src*="${gtmId}"]`)) return

    // Cria o elemento noscript para o body
    const noscript = document.createElement('noscript')
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`
    iframe.height = '0'
    iframe.width = '0'
    iframe.style.display = 'none'
    iframe.style.visibility = 'hidden'

    noscript.appendChild(iframe)
    document.body.appendChild(noscript)
}

const initializeAllGTM = () => {
    if (!questionarioStore.gtm?.length) return

    questionarioStore.gtm.forEach(gtmData => {
        const gtmScript = gtmData?.header
        if (!gtmScript) return

        // Extrai o ID do GTM do script usando regex
        const gtmIdMatch = gtmScript.match(/GTM-[A-Z0-9]+/i)
        if (gtmIdMatch) {
            const gtmId = gtmIdMatch[0]
            addGTMToHead(gtmId)  // Adiciona script no head
            addGTMToBody(gtmId)  // Adiciona noscript no body
        }
    })
}

// Função para enviar eventos para o dataLayer
const pushEvent = (eventData) => {
    if (window.dataLayer) {
        window.dataLayer.push(eventData)
    }
}

onMounted(() => {
    initializeAllGTM()
})

// Observa mudanças na store e reinicializa os GTMs se necessário
watchEffect(() => {
    if (questionarioStore.gtm?.length) {
        initializeAllGTM()
    }
})

defineExpose({pushEvent})
</script>
