<script setup>
import {Button, Card} from "primevue";
import {useUserStore} from "@/stores/UserStore.js";
import AssinaturaSVG from "@/components/svg/AssinaturaSVG.vue";
import {onMounted} from "vue";
import {useRouter} from "vue-router";

const userStore = useUserStore()
const router = useRouter()

onMounted(async () => {
    if (userStore.user.has_subscribe) {
        userStore.getBilingPortal()
        router.push('/')
    }
})
</script>

<template>
    <Card>
        <template #content>
            <div class="flex justify-center h-screen">

                <div class="w-full md:w-1/3 flex border border-purple-default items-center justify-center h-max">
                    <div>
                        <AssinaturaSVG class="w-full"/>
                        <h1 class="text-center text-4xl">Plano Pro</h1>
                        <p class="text-center">Ideal para o seu negócio</p>

                        <h1 class=" mt-12 text-center text-purple-default text-4xl">R$ 69,00</h1>

                        <ul class="mt-12">
                            <li class="mt-2">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Formulários ilimitados
                            </li>

                            <li class="mt-2">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Respostas ilimitadas
                            </li>
                            <li class="mt-2">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Integração com Pixel do Facebook
                            </li>
                            <li class="mt-2">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Integração com Google Tag Manager
                            </li>
                            <li class="mt-2">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Rastreio por UTMS
                            </li>
                            <li class="mt-2">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Integração com Calendly
                            </li>
                            <li class="mt-2">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Redirecionamento ao final do questionário
                            </li>
                            <li class="mt-2">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Regras de resposta
                            </li>
                            <li class="mt-2 text-center">
                                <i class="pi pi-check" style="font-size: 1rem"></i>
                                Dashboard com análise de desempenho do questionário
                            </li>


                        </ul>

                        <div class="flex justify-center mt-4 mb-4 ">
                            <Button :loading="userStore.loading"
                                    class=""
                                    icon="pi pi-dollar"
                                    label="Assinar"
                                    @click="userStore.getAssinatura()"
                            />
                        </div>

                    </div>

                </div>
            </div>
        </template>
    </Card>
</template>

<style scoped>
.svg-ilustracao {
    /* width: 500px; */
}
</style>
