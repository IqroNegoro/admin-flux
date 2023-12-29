<template>
    <div class="w-full h-screen flex justify-center items-center bg-secondary">
        <div class="w-3/4 h-[80%] shadow-md rounded-sm bg-white grid grid-cols-1 md:grid-cols-2 grid-rows-1 p-4">
            <div class="max-md:hidden flex justify-center items-center">
                <i class="bx bxs-shopping-bag-alt text-7xl text-primary"></i>
            </div>
            <form class="flex flex-col gap-12 justify-center items-center" @submit.prevent="handleRegister">
                <h1 class="tracking-wider text-2xl text-primary text-center">Register</h1>
                <div class="flex flex-col gap-2 w-full">
                    <p class="">Name</p>
                    <div class="flex flex-row justify-center border-b items-center w-full p-1" :class="{'border-red-500': inputError.name}">
                        <i class="bx bx-user text-2xl pr-1"></i>
                        <input type="text" class="w-full bg-transparent" placeholder="Enter Your Name" v-model="payload.name">
                    </div>
                    <p class="text-xs" v-if="inputError.name"> {{ inputError.name }} </p>
                    <p class="">Email</p>
                    <div class="flex flex-row justify-center border-b items-center w-full p-1" :class="{'border-red-500': inputError.email}">
                        <i class="bx bx-envelope text-2xl pr-1"></i>
                        <input type="text" class="w-full bg-transparent" placeholder="Enter Your Email" v-model="payload.email">
                    </div>
                    <p class="text-xs" v-if="inputError.email"> {{ inputError.email }} </p>
                    <p class="">Password</p>
                    <div class="flex flex-row justify-center border-b items-center w-full p-1" :class="{'border-red-500': inputError.password}">
                        <i class="bx bx-lock text-2xl pr-1"></i>
                        <input type="password" class="w-full bg-transparent" placeholder="Enter Your Password" v-model="payload.password">
                    </div>
                    <p class="text-xs" v-if="inputError.password"> {{ inputError.password }} </p>
                    <p class="text-xs" v-if="errorRegister"> {{errorRegister}} </p>
                </div>
                <button class="disabled:cursor-not-allowed flex justify-center items-center w-full hover:bg-primary bg-secondary duration-150 rounded-sm text-white p-2" type="submit" @submit.prevent="handleRegister" :disabled="pendingRegister || !payload.name || !payload.email || !payload.password">
                    <i v-if="pendingRegister" class='bx bx-loader-alt bx-spin' ></i>
                    <p v-else>
                        Register
                    </p>
                </button>
                <p class="max-md:text-center" >Already have account? <NuxtLink :to="{name: 'login'}" class="text-primary">Login</NuxtLink></p>
            </form>
        </div>
    </div>
</template>
<script setup>
const payload = ref({
    name: "Iqro Negoro",
    email: "iqronegoro0@gmail.com",
    password: "iqro"
});

const user = useUser();

const pendingRegister = ref(false);
const inputError = ref({});
const errorRegister = ref(false);

const handleRegister = async () => {
    if (pendingRegister.value || !payload.value.email || !payload.value.password) return;

    inputError.value = {}
    errorRegister.value = null;
    pendingRegister.value = true;

    const {data, pending, error} = await register({...payload.value});

    pendingRegister.value = pending.value

    if (error.value) {
        if (error.value.statusCode === 400) {
            inputError.value = error.value.data.data;
            return;
        }
        errorRegister.value = error.value.data.message
        return;
    }

    return await navigateTo("/login")
}

useHead({
    title: "Register to Flux"
})

definePageMeta({
    layout: false
})
</script>