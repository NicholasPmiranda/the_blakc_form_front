<script setup>
import {onMounted, ref} from "vue";
import Chart from 'primevue/chart'
import Knob from 'primevue/knob';

import {Card} from "primevue";
import {chartColor} from "@/extra/chartColor.js";
import VisualizacaoSemanal from "@/components/Graficos/VisualizacaoSemanal.vue";
import ConversaoSemanal from "@/components/Graficos/ConversaoSemanal.vue";
import ConversaoVsAbandonoSemanal from "@/components/Graficos/ConversaoVsAbandonoSemanal.vue";
import ListaUtms from "@/components/Graficos/ListaUtms.vue";

onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    return {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
            {
                label: 'Sales',
                data: [540, 325, 702, 620],
                backgroundColor: chartColor[0],
            },


        ]
    };
};
const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--p-text-muted-color');
    const surfaceBorder = documentStyle.getPropertyValue('--p-content-border-color');

    return {
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        layout: {
            padding: 0 // Remove espaçamento extra ao redor do gráfico, se necessário.
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    // color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    // color: surfaceBorder
                }
            }
        }
    };



}
const teste = ref(15)
const setChartDataLine = () => {
    const documentStyle = getComputedStyle(document.documentElement);

    return {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
            {
                label: 'First Dataset',
                data: [65, 59, 80, 81, 56, 55, 40],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-cyan-500'),
                tension: 0.4
            },
            {
                label: 'Second Dataset',
                data: [28, 48, 40, 19, 86, 27, 90],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--p-gray-500'),
                tension: 0.4
            }
        ]
    };
};

</script>

<template>
    <Card class="w-full  ">
        <template #content>
            <div class="flex justify-between">
                <div class="flex flex-col items-center">
                    <Knob v-model="teste" readonly/>
                    <h1>Taxa de conclucao</h1>
                </div>


                <div class="flex flex-col items-center">
                    <Knob v-model="teste" readonly/>
                    <h1>Taxa de abandono</h1>
                </div>
                <div class="flex flex-col items-center">
                    <Knob v-model="teste" readonly/>
                    <h1>Taxa de 70% concluido</h1>
                </div>
            </div>

            <div class="flex justify-between mt-10">
                <div class="flex flex-col items-center">
                    <h1 class="text-5xl  font-bold">93</h1>
                    <h1>Total de visualizao</h1>
                </div>

                <div class="flex flex-col items-center">
                    <h1 class="text-5xl  font-bold">93</h1>
                    <h1>Total de visualizao semana</h1>
                </div>

                <div class="flex flex-col items-center">
                    <h1 class="text-5xl  font-bold">93</h1>
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
                        <ListaUtms/>
                    </div>
                    <div class="card  w-1/2">
                        <h1 class="text-2xl  font-bold">ListaUtms Mediun</h1>
                        <ListaUtms/>
                    </div>
                </div>
            </div>
        </template>
    </Card>

</template>
