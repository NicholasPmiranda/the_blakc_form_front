<template>
    <div class="card">
        <Chart type="line" :data="chartData" :options="chartOptions" class="h-[30rem]" />
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Chart from 'primevue/chart'
onMounted(() => {
    chartData.value = setChartData();
    chartOptions.value = setChartOptions();
});

const chartData = ref();
const chartOptions = ref();
import {chartColor} from "@/extra/chartColor.js";
const setChartData = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const randomArray = Array.from({ length: 30 }, () => Math.floor(Math.random() * 101));
    const abandono = Array.from({ length: 30 }, () => Math.floor(Math.random() * 101));
    const dias = Array.from({ length: 30 }, (_, index) => index + 1);

    return {
        labels: dias,
        datasets: [
            {
                label: 'Conversao',
                data: randomArray,
                fill: false,
                borderColor: chartColor[0],
                tension: 0.2
            },
            {
                label: 'Abandono',
                data: abandono,
                fill: false,
                borderColor: chartColor[1],
                tension: 0.2
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
        plugins: {
            legend: {
                // display:false
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
