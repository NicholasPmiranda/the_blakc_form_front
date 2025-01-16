<template>
    <div class="flex items-center justify-center">
        <Chart type="pie" :data="chartData" :options="chartOptions" class="h-[30rem]" />
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

import { chartColor } from "@/extra/chartColor.js";

const setChartData = () => {
    return {
        labels: ['Facebook', 'instagram', 'youtube'],
        datasets: [
            {
                data: [540, 325, 702],
                backgroundColor: [chartColor[0], chartColor[1], chartColor[2]],
            }
        ]
    };
};

const setChartOptions = () => {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--p-text-color');

    return {
        plugins: {
            legend: {
                position: 'chartarea', // Muda a posição para o lado direito
                labels: {
                    color: textColor, // Define a cor do texto
                }
            }
        }
    };
};
</script>
