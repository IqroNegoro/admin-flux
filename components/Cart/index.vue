<template>
    <div class="fixed top-0 left-0 w-full h-full bg-black/25 flex justify-end items-center" @click.self="cart.cartStatus = false">
        <div class="bg-white w-96 h-full p-4 overflow-y-scroll">
            <div class="flex">
                <button class="hover:bg-black/10 flex justify-center items-center px-1 rounded-full" @click="cart.cartStatus = false"><i class="bx bx-x text-2xl"></i></button>
            </div>
            <p class="text-3xl mb-4">Carts</p>
            <div class="flex flex-col gap-6">
                <div v-if="error" class="flex flex-col justify-center items-center gap-4">
                    <p>Oops something wrong, try again</p>
                    <button class="rounded-md border border-primary px-3 py-1 font-medium hover:bg-primary transition-all hover:text-white duration-150" @click="refresh">
                        Try again
                    </button>
                </div>
                <div v-else-if="!data.length && !pending" class="flex flex-col">
                    <i class="bx bx-cart-alt"></i>                    
                    <p>
                        Carts is empty
                    </p>
                </div>
                <template v-else>
                    <CartCard v-for="product in productLists" :key="product" :product="product" />
                </template>
                <div ref="fetchPoint"></div>
                <CartSkeleton v-for="i in 5" :key="i" />
            </div>
        </div>
    </div>
</template>
<script setup>
const cart = useCart();
const limit = ref(5);
const fetchPoint = ref(undefined);
const productLists = ref([]);

const { data, pending, error, refresh } = await useFetch("https://fakestoreapi.com/products", {
    lazy: true,
    default: () => [],
    params: {
        limit
    }
});

watch(data, data => {
    productLists.value = [...productLists.value, ...data]
});

onMounted(() => {
    useScroll(fetchPoint.value, () => {
        limit.value += 5
    });
});
</script>