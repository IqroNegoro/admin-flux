export default defineNuxtRouteMiddleware(async (to, from) => {
    const {data, error} = await useApi("me", {
        key: "me"
    });

    const user = useUser();

    if (error.value) {
        user.$reset();

        if (to.name != "login" && from.name != "login") return await navigateTo("/login");
    }

    if (data.value) {
        user.$patch({
            ...data.value,
            authenticated: true
        });

        if (to.name == "login" || to.name == "register") return await navigateTo("/");
    }
});