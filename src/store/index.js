import { createStore } from 'vuex'
import { productModule } from './product'
import { cartModule } from './cart'
export default createStore({
  state: {
    currencyRUB: 75,
  },
  getters: {
  },
  actions: {
    newCurrency(all, data){
      all.state.currencyRUB=Number(data)
    }
  },
  modules: {
    product:productModule,
    cart:cartModule,
  }
})
