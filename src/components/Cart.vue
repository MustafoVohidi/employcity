<template>
    <div>
        <h3>
            Корзина
        </h3>
        <div class="cart">
            <div class="cart-title">
                <div class="c-item">
                    <div class="c-title">
                        Наименование товара и описание
                    </div>
                    <div class="c-qty">
                        Количество
                    </div>
                    <div class="c-price">
                        Цена
                    </div>
                </div>
            </div>
            <div class="cart-body" v-if="productList.length">
                <div class="c-item" v-for="(product, index) in productList" :key="product.id">
                    <div class="c-title">
                        <span>
                            {{ product.name }}
                        </span>
                    </div>
                    <div class="c-qty">
                        <div class="qty">
                            <input type="number" min="0" :max="product.remaind" v-model="product.quantity" />
                            <span>шт.</span>
                        </div>
                        <div class="warning" v-if="product.remaind <= 5">
                            Количество ограничено
                        </div>
                    </div>
                    <div class="c-price">
                        <div class="price">
                            <span>
                                {{ product.price }} руб.
                            </span>/шт
                        </div>
                        <div class="delete">
                            <button @click="deleteProduct(index)">
                                удалить
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            <div class="cart-body" v-else>
                <div class="empty">
                    Корзина пуста
                </div>
            </div>
            <div class="cart-foot">
                <div class="total">
                    Общая стоимость: <span class="price">{{ total }} .руб</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useStore } from 'vuex';
import { onMounted, ref, reactive, computed, watch } from "vue";
const store = useStore();
const productList = computed(() => store.state.cart.products);
const deleteProduct = (data) => store.dispatch("cart/deleteProduct", data);
const total = computed(() => {
    let tot = 0;
    productList.value.forEach(product => {
        tot += product.price * product.quantity
    });
    return tot.toFixed(2)
})

// const changeQuantity=(e)=>{
//     // console.log(e.target.value)
// }
onMounted(() => {
    // console.log(total.value)
})
</script>
<style lang="scss" scoped>
.cart {
    margin-bottom: 30px;
    border: 2px solid;

    .c-item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        border-bottom: 1px solid;
        padding: 3px;

        .c-price {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 35%;

            button {
                border: 0;
                cursor: pointer;
                margin-left: 10px;

                &:hover {
                    color: #ff6d2c;
                }
            }
        }

        .c-qty {
            width: 15%;
        }

        .c-title {
            width: 50%;
        }
    }
}

.cart-foot {
    padding: 10px 15px;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    .price {
        color: #ff6d2c;
        font-weight: 700;
    }
}
.empty{
    font-size: 2rem;
    text-align: center;
    padding: 10px;
    font-weight: 600;
}

.warning {
    color: #ff6d2c;
    border: 1px dashed #ff6d2c;
    max-width: 100px;
    margin-top: 3px;
}
</style>