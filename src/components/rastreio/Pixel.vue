<template>
    <div></div>
</template>

<script setup>
import { onMounted, watchEffect } from 'vue'
import {useQuestionarioStore} from "@/stores/QuestionarioStore.js";

const questionarioStore = useQuestionarioStore()

const initFacebookPixel = (pixelId) => {
    if (window.fbq) {
        fbq('init', pixelId)
        fbq('track', 'PageView')
        return
    }

    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
        n.callMethod.apply(n,arguments):n.queue.push(arguments)};
        if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
        n.queue=[];t=b.createElement(e);t.async=!0;
        t.src=v;s=b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t,s)}(window, document,'script',
        'https://connect.facebook.net/en_US/fbevents.js')
}

// Adiciona o noscript tag para cada pixel
const addNoScript = (pixelId) => {
    const noscript = document.createElement('noscript')
    const img = document.createElement('img')
    img.height = 1
    img.width = 1
    img.style.display = 'none'
    img.src = `https://www.facebook.com/tr?id=${pixelId}&ev=PageView&noscript=1`
    noscript.appendChild(img)
    document.body.appendChild(noscript)
}

const initializeAllPixels = () => {
    if (!questionarioStore.pixel?.length) return

    // Inicializa o script do Facebook Pixel apenas uma vez
    initFacebookPixel()

    // Inicializa cada pixel individual
    questionarioStore.pixel.forEach(pixelData => {
        const pixelScript = pixelData?.codigo
        if (!pixelScript) return

        // Extrai o ID do pixel do script usando regex
        const pixelIdMatch = pixelScript.match(/fbq\('init',\s*'(\d+)'\)/)
        if (pixelIdMatch && pixelIdMatch[1]) {
            const pixelId = pixelIdMatch[1]
            fbq('init', pixelId)
            addNoScript(pixelId)
        }
    })
}

// Função para rastrear eventos específicos em todos os pixels
const trackEvent = (eventName, parameters = {}) => {
    if (window.fbq) {
        fbq('track', eventName, parameters)
    }
}

onMounted(() => {
    initializeAllPixels()
})

// Observa mudanças na store e reinicializa os pixels se necessário
watchEffect(() => {
    if (questionarioStore.pixel?.length) {
        initializeAllPixels()
    }
})

defineExpose({ trackEvent })
</script>
