<script setup>

import { storeToRefs } from "pinia";
import { useListStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";
import Product from "../components/Product.vue";

const listStore = useListStore();
const {items} = storeToRefs(listStore);
const cartStore = useCartStore();
const {products, uniqueList, emptyCart, totalCartPrice} = storeToRefs(cartStore);
const {clearCart} = cartStore;

const getItem = (name) => {
  const item = items.value.filter(element => element.name === name)[0];
  return item;
}

</script>

<template>
  <div v-if="emptyCart" id="no-items">Your cart is empty</div>
  <div v-else id="cart">
    <span>Total price: {{ totalCartPrice }}€</span>&nbsp;&nbsp;&nbsp;&nbsp;<button @click="clearCart">Empty cart</button>
    <div v-for="(product) in uniqueList">
      <Product :item="getItem(product.name)" />
    </div>
  </div>
</template>