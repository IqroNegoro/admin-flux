<template>
    <div class="w-full flex flex-col md:grid md:grid-cols-[2fr,1fr] md:grid-rows-2 min-h-screen gap-2">
        <template v-if="pending">
            <Skeleton />
        </template>
        <template v-else>
            <div class="shadow-sm rounded-sm row-span-2">
                <div class="flex flex-row justify-between items-center">
                    <h1 class="text-primary text-2xl font-medium">Dashboard</h1>
                    <button @click="refresh" class="text-2xl">
                        <i v-if="pending" class="bx bx-loader-alt bx-spin"></i>
                        <i v-else class="bx bx-refresh"></i>
                    </button>
                </div>
                <div class="w-full flex flex-col md:flex-row gap-4">
                    <div class="p-4 md:w-max w-full flex flex-col gap-2 shadow-lg rounded-md">
                        <div class="flex justify-between items-center gap-8">
                            <h1 class="font-medium text-xl">{{ formatRp(data.rate) }}</h1>
                            <i class="bx bx-dollar text-2xl"></i>
                        </div>
                        <p class="text-sm font-medium">Rate</p>
                    </div>
                    <div class="p-4 md:w-max w-full flex flex-col gap-2 shadow-lg rounded-md">
                        <div class="flex justify-between items-center gap-8">
                            <h1 class="font-medium text-xl">{{ data.totalOrders }}</h1>
                            <i class="bx bx-package text-2xl"></i>
                        </div>
                        <p class="text-sm font-medium">Order success at this month</p>
                    </div>
                </div>
                <!-- <ClientOnly>
                    <VueApexCharts type="area" :options="options" :series="series" />
                </ClientOnly> -->
            </div>
            <div class="w-full">
            </div>
            <div class="w-full">
    
            </div>
        </template>
    </div>
</template>
<script setup>
const { data, pending, error, refresh } = await getSalesThisMonth();
console.log(data.value)
// const options = {
//     chart: {
//         id: 'Sales This Month',
//         zoom: {
//             enabled: true
//         },
//     },
//     dataLabels: {
//         enabled: false
//     },
//     stroke: {
//         curve: 'smooth'
//     },
//     title: {
//         text: "Sales Month"
//     },
//     legend: {
//               horizontalAlign: 'left'
//             },
//     xaxis: {
//         type: 'datetime',
//         categories: data.value?.dates,
//         opposite: true
//     },
//     tooltip: {
//         x: {
//             format: 'dd/MM/yy HH:mm'
//         },
//     },
// }

// const series = [{
//     name: "Sale",
//     data: data.value?.series
// }]

useHead({
    title: "Flux Store Admin"
});
</script>