<script setup>

import Knob from 'primevue/knob';

import {Card} from "primevue";
import VisualizacaoSemanal from "@/components/Graficos/VisualizacaoSemanal.vue";
import ConversaoSemanal from "@/components/Graficos/ConversaoSemanal.vue";
import ConversaoVsAbandonoSemanal from "@/components/Graficos/ConversaoVsAbandonoSemanal.vue";
import ListaUtmsSource from "@/components/Graficos/ListaUtmsSource.vue";
import {useRoute} from "vue-router";
import {useDashStore} from "@/stores/DashStore.js";
import ListaUtmsMediun from "@/components/Graficos/ListaUtmsMediun.vue";


const route = useRoute()
const dashStore = useDashStore()

dashStore.getTotalViistasMes(route.params.id)
dashStore.getTotalViistasSemana(route.params.id)
dashStore.getTotalViistas(route.params.id)
dashStore.getConclusao70(route.params.id)
dashStore.getAbandono(route.params.id)
dashStore.getConclusao(route.params.id)

</script>

<template>
    <Card class="w-full  ">
        <template #content>
            <div class="flex justify-between">
                <div class="flex flex-col items-center">
                    <Knob v-model="dashStore.conslusao" readonly/>
                    <h1>Taxa de conclucao</h1>
                </div>


                <div class="flex flex-col items-center">
                    <Knob v-model="dashStore.abandono" readonly/>
                    <h1>Taxa de abandono</h1>
                </div>
                <div class="flex flex-col items-center">
                    <Knob v-model="dashStore.conclusao70" readonly/>
                    <h1>Taxa de 70% concluido</h1>
                </div>
            </div>

            <div class="flex justify-between mt-10">
                <div class="flex flex-col items-center">
                    <h1 class="text-5xl  font-bold">{{dashStore.totalVisitas}}</h1>
                    <h1>Total de visualizao</h1>
                </div>

                <div class="flex flex-col items-center">
                    <h1 class="text-5xl  font-bold">{{dashStore.totalVisitasSemana}}</h1>
                    <h1>Total de visualizao semana</h1>
                </div>

                <div class="flex flex-col items-center">
                    <h1 class="text-5xl  font-bold">{{dashStore.totalVisitasMes}}</h1>
                    <h1>Total de visualizao mes</h1>
                </div>
            </div>

            <div class="mt-16">
                <div class="flex gap-5">
                    <div class="card  w-1/2">
                        <h1 class="text-2xl  font-bold">Historico de visualizacao semanal</h1>
                        <VisualizacaoSemanal/>
                    </div>
                    <div class="card  w-1/2">
                        <h1 class="text-2xl  font-bold">Historico de conclucao semanal</h1>
                        <ConversaoSemanal/>
                    </div>
                </div>
            </div>

            <div class="mt-10">
                <div class="flex gap-5">
                    <div class="card  w-full">
                        <h1 class="text-2xl  font-bold">Historico de conclucao Mensal</h1>
                        <ConversaoVsAbandonoSemanal/>
                    </div>
                </div>
            </div>


            <div class="mt-16">
                <div class="flex gap-5">
                    <div class="card  w-1/2">
                        <h1 class="text-2xl  font-bold">ListaUtms Source</h1>
                        <ListaUtmsSource/>
                    </div>
                    <div class="card  w-1/2">
                        <h1 class="text-2xl  font-bold">ListaUtms Mediun</h1>
                        <ListaUtmsMediun/>
                    </div>
                </div>
            </div>
        </template>
    </Card>

</template>
