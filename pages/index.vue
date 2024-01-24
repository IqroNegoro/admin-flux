<template>
    <div>
        <h1 class="text-primary text-2xl font-medium">Dashboard</h1>
        <div class="w-full grid grid-cols-[2fr,1fr]">
            <div>
                <ClientOnly>
                    <VueApexCharts width="100%" type="area" :options="options" :series="series" />
                </ClientOnly>
            </div>
        </div>
    </div>
</template>
<script setup>
const arr = [];
for (let i = 1; i <= 30; i++) {
    arr.push(Math.floor(Math.random() * 10))
}
const options = {
    chart: {
        id: 'vuechart-example',
        zoom: {
            enabled: true
        },
    },
    dataLabels: {
        enabled: false
    },
    stroke: {
        curve: 'straight'
    },
    title: {
        text: "Sales Month"
    },
    legend: {
              horizontalAlign: 'left'
            },
    xaxis: {
        categories: arr
    }
}

const series = [{
    name: "Desktops",
    data: arr
}]

useHead({
    title: "Flux Store Admin"
});
</script>