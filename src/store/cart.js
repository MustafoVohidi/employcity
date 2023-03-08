export const cartModule = {
    state: () => ({
        products: [],
    }),
    actions: {
        deleteProduct(all, data) {
            all.state.products.splice(data, 1)
        },
        addToCart(all, data) {
            let groupName = all.rootState.product.names[data.G].G
            all.rootState.product
            let obj = {
                id: data.T,
                name: data.N,
                groupName: groupName,
                groupID: data.G,
                price: data.C,
                quantity: 1,
                remaind:data.P,
                currency:data.currency,
            }
            if (all.state.products.some(elem => elem.id == obj.id)) {
                all.state.products.forEach(elem=>{
                    if(elem.id==obj.id){
                        elem.quantity++
                    }
                })
            } else {
                all.state.products.push(obj)
            }
        },
    },
    namespaced: true,
}