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
const { data, pending, error, refresh } = await getSalesThisMonth();
console.log(data.value)
const options = {
    chart: {
        id: 'Sales This Month',
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
        categories: data.value.dates,
        opposite: true
    }
}

const series = [{
    name: "Order",
    data: data.value.series
}]

useHead({
    title: "Flux Store Admin"
});
</script>