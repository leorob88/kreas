<script setup>

import { storeToRefs } from "pinia";
import { useListStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";
import Product from "../components/Product.vue";

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
  <div v-if="emptyCart" id="no-items">Your cart is empty</div>
  <div v-else>
    <div id="summary">
      <div>
        <div v-if="discount">
          <span>Total price: </span><span :style="{'text-decoration': 'line-through', 'color': 'grey'}">{{ tempCartPrice }}€</span>&nbsp;<span>{{ totalCartPrice }}€  (your total bill gets a 10% discount for purchasing at least 3 products)</span>
        </div>
        <span v-else>Total price: {{ totalCartPrice }}€</span>
      </div>
      <div>
        <button class="cart-button" @click="clearCart">Empty cart</button>&nbsp;&nbsp;&nbsp;&nbsp;<button class="cart-button" @click="buy()">Buy products</button>
      </div>
    </div>
    <div id="cart">
      <div id="cart-list" v-for="(product) in uniqueList">
        <Product :item="getItem(product.name)" />
      </div>
    </div>
  </div>
</template>

<style>

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
  grid-template-columns: repeat(3, 1fr);
  padding-left: 414px;
  font-size: 0.8em;
}

#cart-list{
  width: 63%;
}

.cart-button{
  font-size: 0.9em;
}

</style>