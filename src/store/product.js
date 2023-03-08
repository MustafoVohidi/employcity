
import * as data from "@/data/data.json"
import * as names from "@/data/names.json"
export const productModule = {
    state: () => ({
        data: {},
        names: {},
    }),
    getters: {
        data(state) {
            return state.data
        },
        names(state) {
            return state.names
        },
    },
    actions: {
        promData(all) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(data);
                }, 200);
            }).then((resolve) => {
                setInterval(()=>{
                    all.state.data = { ...resolve }
                }, 15000)
                all.state.data = { ...resolve }
            });
        },
        promNames(all) {
            return new Promise(resolve => {
                setTimeout(() => {
                    resolve(names);
                }, 200);
            }).then((resolve) => {
                setInterval(()=>{
                    all.state.names = { ...resolve }
                }, 15000)
                all.state.names = { ...resolve }
            });
        },
        async getData(all) {
            await all.dispatch("promNames")
            await all.dispatch("promData")
        },
    },
    namespaced: true,
}