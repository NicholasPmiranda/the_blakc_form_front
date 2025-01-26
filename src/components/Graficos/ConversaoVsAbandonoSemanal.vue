<template>
    <div class="card">
        <Chart :data="chartData" :options="chartOptions" class="h-[30rem]" type="line"/>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Chart from 'primevue/chart'
import {chartColor} from "@/extra/chartColor.js";
import {useDashStore} from "@/stores/DashStore.js";
import {useRoute} from "vue-router";


const route = useRoute()
onMounted(async () => {
    await dashStore.getAbandonoConclusao(route.params.id)

    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const dashStore = useDashStore()



const setChartData = () => {
    return {
        labels: dashStore.abandonoConsusao.label,
        datasets: [
            {
                label: 'Conversao',
                data: dashStore.abandonoConsusao.concluido,
                fill: false,
                backgroundColor: chartColor[0],
                borderColor: chartColor[0],
                tension: 0.1,
            },
            {
                label: 'Abandono',
                data: dashStore.abandonoConsusao.abandono,
                fill: false,
                backgroundColor: chartColor[3],
                borderColor: chartColor[3],
                tension: 0.1,
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
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false
        },
        plugins: {
            legend: {
                labels: {
                    color: '#fff',
                },
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
        elements: {
            line: {
                borderWidth: 5
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
            },
            y: {
                grid: {
                    color: surfaceBorder
                }
            }
        }

    };
}
</script>
