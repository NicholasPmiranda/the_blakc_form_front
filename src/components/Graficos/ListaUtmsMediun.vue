<template>
    <div class="flex items-center justify-center">
        <Chart :data="chartData" :options="chartOptions" class="w-full" type="bar"/>
    </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import Chart from 'primevue/chart'
import {useDashStore} from "@/stores/DashStore.js";
import {useRoute} from "vue-router";
import {chartColor} from "@/extra/chartColor.js";

const dashStore = useDashStore()
const route = useRoute()

onMounted(async () => {
    await dashStore.getUtmMediun(route.params.id)
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();

const setChartData = () => {
    var dataSets = []
    dashStore.utm_mediun.data_sets.forEach((data_set, index) => {
        dataSets.push(
            {
                label: data_set.label,
                data: data_set.valores,
                backgroundColor: chartColor[index],
                borderColor: chartColor[index],
                borderWidth: 1
            }
        )
    })

    return {
        labels: dashStore.utm_mediun.labels,
        datasets: dataSets
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
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            },
            y: {
                beginAtZero: true,
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder
                }
            }
        }
    };
}
</script>
