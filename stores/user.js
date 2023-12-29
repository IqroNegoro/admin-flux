export const useUser = defineStore("user", ({
    state: () => ({
        _id: undefined,
        name: undefined,
        email: undefined,
        authenticated: false
    })
}))