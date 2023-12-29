export const register = async body => await useApi("register", {
    method: "POST",
    body,
    key: "register",
});

export const login = async body => await useApi("login", {
    method: "POST",
    body,
    key: "login",
});

export const logout = async () => {
    let { data, error } = await useApi("logout", {
        method: "DELETE",
        key: "logout"
    });
    
    if (error.value) {
        return;
    }
    
    const user = useUser();
    user.$reset();
    return await navigateTo("/login");
};