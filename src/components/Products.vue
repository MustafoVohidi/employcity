<template>
    <div class="home">
        <div class="curreny">
            <div class="curr-txt">
                Валюта (руб/доллар):
                <input type="number" min="20" max="80" :value="currencyRUB" @input="changeCurrency" :class="{'increment':dcurr==1, 'default':dcurr==0, 'decrement':dcurr==-1, }">
            </div>
        </div>
        <div class="category" v-for="table in names" :key="table.G">
            <div class="category-title" v-if="table.isProductInStock">
                <span>
                    {{ table.G }}
                </span>
            </div>
            <div class="product-list" v-if="table.isProductInStock">
                <div class="product-item" v-for="product in table.B" :key="product">
                    <div class="product-info" v-if="product.C">
                        <div class="product-name">
                            {{ product.N }}
                        </div>
                        <div class="product-price">
                            {{ product.C }}
                        </div>
                        <div class="add-to-cart">
                            <button @click="addToCart(product)" type="button" title="Добавить в корзину">
                                +
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { computed, onMounted, reactive, ref,watch } from 'vue'
import { useStore } from 'vuex';
const store = useStore();
const data = computed(() => store.state.product.data)
const names = computed(() => store.state.product.names)
const currencyRUB = computed(() => store.state.currencyRUB)
const getData = () => store.dispatch("product/getData");
const addToCart = (data) => store.dispatch("cart/addToCart", data)
const newCurrency=(data)=>store.dispatch("newCurrency", data)
const products = reactive([]);
const dcurr=ref(0)
const selectProducts = () => {
    for (let prop in data.value.Value.Goods) {
        let groupID = data.value.Value.Goods[prop].G
        let productId = data.value.Value.Goods[prop].T;
        data.value.Value.Goods[prop].C *= currencyRUB.value
        names.value[groupID].B[productId] = { ...names.value[groupID].B[productId], ...data.value.Value.Goods[prop] }
    };
    for (let i in names.value) {
        let isProductInStock = false;
        for (let j in names.value[i].B) {
            if (names.value[i].B[j].C) {
                isProductInStock = true;
            }
        }
        names.value[i].isProductInStock = isProductInStock
    }
}
watch(currencyRUB, (newVal, oldVal)=>{
    if(newVal<oldVal){
        dcurr.value=-1
    }else{
        dcurr.value=1
    }
    // setTimeout(()=>{
    //     dcurr.value=0
    // }, 300)
    
    console.log(dcurr.value, "dcurr", currencyRUB.value)
})
const changeCurrency=(e)=>{
    newCurrency(e.target.value)
}
onMounted(async () => {
    await getData();
    selectProducts()
})
</script>
<style lang="scss" scoped>
.category {
    margin-bottom: 10px;

    .category-title {
        background: #cfdfe3;
        color: #000;
        font-size: 14px;
        border: 1px solid;
        padding: 3px;
    }

    .product-list {
        border: 1px solid;
    }

    .product-item {
        .product-info {
            border-bottom: 1px solid;
            display: flex;
            align-items: stretch;
        }

        .product-name {
            padding: 3px;
            width: 100%;
        }

        .product-price {
            padding: 3px;
            background: #f3f3f3;
            width: 100px;
        }

        .add-to-cart {
            button {
                background: #d0d0d0;
                padding: 3px;
                border: 0;
                cursor: pointer;
                width: 30px;
                height: 30px;
                font-size: 1.2rem;
            }
        }
    }
}
.curreny{
    margin: 15px 0;
}
.curr-txt{

    .default{

    }
    .increment{
        &:focus-visible {
            outline:red auto 2px ;
        }
        border-color: red;
        background: red;
    }
    .decrement{
        &:focus-visible {
            outline:green auto 2px ;
        }
        border-color: green;
        
        background: green;
    }
    input{
        border: 2px solid #000;
        border-radius: 0;
        &.decrement{
            background-color: #fff;
        }
        &.increment{
            background-color: #fff;
        }
    }

}
table {
    width: 100%;
    margin-bottom: 10px;
}

.table-head {
    tr {
        td {
            background: #cfdfe3;
            color: #000;
            font-size: 14px;
            border: 1px solid;
        }
    }
}

.table-body {
    tr {
        td {
            border: 1px solid;
            margin: 0;
            padding: 0;
            border-spacing: 0;

            &:focus-visible {
                outline: -webkit-focus-ring-color auto 0px;
                ;
            }
        }
    }
}
</style>