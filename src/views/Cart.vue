<script setup>

import { onMounted } from "vue"; 
import { storeToRefs } from "pinia";
import { useListStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";
import Product from "../components/Product.vue";

const emit = defineEmits(["height"]);

onMounted(() => {
  emit("height");
})

const listStore = useListStore();
const {items} = storeToRefs(listStore);
const cartStore = useCartStore();
const {uniqueList, emptyCart, discount, tempCartPrice, totalCartPrice} = storeToRefs(cartStore);
const {clearCart} = cartStore;

const getItem = (name) => {
  const item = items.value.filter(element => element.name === name)[0];
  return item;
}
const buy = () => {
  alert("Thank you for the purchase, dear customer!");
  clearCart();
}

</script>

<template>
  <div id="cart-page">
    <div v-if="emptyCart" id="no-items">Your cart is empty</div>
    <div v-else>
      <div id="summary">
        <div>
          <div v-if="discount">
            <span>Total price: </span><span :style="{ 'text-decoration': 'line-through', 'color': 'grey' }">{{ tempCartPrice
            }}€</span>&nbsp;<span>{{ totalCartPrice }}€
              <br />
              (your bill gets a 10% discount for purchasing at least 3 products)</span>
          </div>
          <span v-else>Total price: {{ totalCartPrice }}€</span>
        </div>
        <div>
          <button class="cart-button" @click="clearCart">Clear cart</button><button class="cart-button"
            @click="buy()">Proceed</button>
        </div>
      </div>
      <div id="cart">
        <div id="cart-list" v-for="(product) in uniqueList">
          <Product :item="getItem(product.name)" />
        </div>
      </div>
    </div>
  </div>
</template>

<style>

#cart-page{
  background-color: rgb(200, 200, 200);
  margin: -8px;
  padding-top: 20px;
}

#summary{
  display: flex;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
  font-size: 0.8em;
  padding-bottom: 10px;
}

#cart{
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  font-size: 0.8em;
}

#cart-list{
  width: 63%;
}

.cart-button, .product-button{
  font-size: 0.9em;
}

.cart-button{
  width: 80px;
  margin: 0;
  padding: 0;
  margin-top: 4px;
  margin-bottom: 4px;
}

@media (min-width: 3840px) {

  #cart{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

</style>