<script setup>
import {Button, Card,} from "primevue";
import {useRespostaFormStore} from "@/stores/RespostaFormStore.js";
import {useRoute} from "vue-router";

const respostaStore = useRespostaFormStore()
const route = useRoute()

respostaStore.getResposta(route.params.id)
</script>

<template>
    <Card>
        <template #content>
            <div class="flex ">
                <div class=" w-1/3 borde h-screen overflow-scroll">
                    <h1 class="text-xl text-center">Lista Respostas</h1>
                    <div class="flex flex-col justify-between">
                        <div v-for="(respostas, index) in respostaStore.respostas"
                             class="  border-l-8 hover:cursor-pointer hover:bg-dark-purple  mt-4 rounded border-purple-default p-4"
                             @click="respostaStore.setGrupo(index)">

                            <p> {{ respostas[0]?.questao }}:</p>
                            <p> {{ respostas[0]?.resposta }}</p>
                        </div>


                        <div class="flex items-center justify-center">
                            <Button :loading="respostaStore.loading_paginate" icon="pi pi-plus"
                                    label="Carregar"
                                    @click="respostaStore.getPaginate(route.params.id)"
                            />
                        </div>

                    </div>
                </div>
                <div class="w-full flex flex-col items-center ">

                    <h1 class="text-center text-2xl">Grupo Respostas</h1>

                    <div class="w-5/6   flex tex items-center justify-center ">
                        <div class="flex  w-full  flex-wrap ">

                            <div  v-for="resposta  in respostaStore.grupo_ativo">
                                <div v-if="resposta.is_file == false"
                                    class="  w-1/2 mt-8  border-l-8 hover:cursor-pointer hover:bg-dark-purple   rounded border-purple-default p-4">
                                    <p> {{ resposta.questao }}:</p>
                                    <p> {{ resposta.resposta }}</p>
                                </div>
                                <div v-else
                                     class="  w-1/2 mt-8  border-l-8 hover:cursor-pointer hover:bg-dark-purple   rounded border-purple-default p-4">
                                    <p> {{ resposta.questao }}:</p>

                                    <Button size="small" icon="pi pi-download" as="a" label="Download" :href="resposta.resposta" target="_blank"  />

                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </template>
    </Card>


</template>

<style scoped>

</style>
