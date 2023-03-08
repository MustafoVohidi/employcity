
import * as data from "@/data/data.json"
import * as names from "@/data/names.json"
export const productModule = {
    state: () => ({
        data: {},
        names: {},
    }),
    actions: {
        getData(all) {
            all.state.data = { ...data }
            all.state.names = { ...names }
        },
    },
    namespaced: true,
}