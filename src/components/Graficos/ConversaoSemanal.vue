<template>
    <div class="card">
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart'

const chartData = ref();
const chartOptions = ref();
const dashStore = useDashStore()
const route = useRoute()
import {chartColor} from "@/extra/chartColor.js";
import {useDashStore} from "@/stores/DashStore.js";
import {useRoute} from "vue-router";



onMounted(async () => {
    await dashStore.getMediaConcluido(route.params.id)
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});


const setChartData = () => {
    return {
        labels: dashStore.mediaConcluido.label,
        datasets: [
            {
                label: 'Conversao',
                data: dashStore.mediaConcluido.valor,
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
            },
            tooltip: {
                callbacks: {
                    title: function (context) {
                        return 'Dia: ' + context[0].label;
                    },
                    label: function (context) {
                        return context.dataset.label + ': ' + context.formattedValue+"%";
                    },

                },
            }
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
                ticks: {
                    // color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
