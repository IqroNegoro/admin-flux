export const useNotification = defineStore("notification", ({
    state: () => ({
        notification: null
    }),
    actions: {
        error(message) {
            this.notification = {type: "error", message}
        },
        success(message) {
            this.notification = {type: "success", message}
        },
        clear() {
            this.notification = null;
        }
    }
}))