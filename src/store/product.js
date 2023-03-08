
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
    mutations: {
        addData(state) {
            // setTimeout(()=>{
            //     state.data = { ...data }
            // },2000)
            state.data = { ...data }
        },
        addNames(state) {
            // setTimeout(()=>{
            //     state.names = { ...names }
            // },2000)
            state.names = { ...names }
        },
    },
    actions: {
        async getData(all) {
            await all.commit("addData")
            await all.commit("addNames")
            console.log("15000")
        },
    },
    namespaced: true,
}