<template>
    <div class="card">

        <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart'
const dashStore = useDashStore()
const route = useRoute()
onMounted(async () => {
     await dashStore.getHistoricoVizualizacaoSemanal(route.params.id)
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
import {chartColor} from "@/extra/chartColor.js";
import {useDashStore} from "@/stores/DashStore.js";
import {useRoute} from "vue-router";
const setChartData = () => {
    return {
        labels: dashStore.visualizacao_semanal.label,
        datasets: [
            {
                label: 'vistas',
                data: dashStore.visualizacao_semanal.valor,
                fill: false,
                backgroundColor: chartColor[0],
                borderColor: chartColor[0],
                tension: 0.1
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
        maintainAspectRatio: false,
        aspectRatio: 0.6,
        interaction: {
            mode: 'index',
            intersect: false
        },
        plugins: {
            legend: {
                display:false
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                }
            },
            y: {
                ticks: {
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
