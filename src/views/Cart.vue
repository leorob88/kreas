<script setup>

import { storeToRefs } from "pinia";
import { useCulturedMeatStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";
import Product from "../components/Product.vue";

const culturedMeatStore = useCulturedMeatStore();
const {items} = storeToRefs(culturedMeatStore);
const cartStore = useCartStore();
const {products, emptyCart, totalCartPrice} = storeToRefs(cartStore);
const {clearCart, getQuantityByName} = cartStore;

console.log("cart")
console.log(items)
console.log(products)
//il carrello non funziona e non riesce a calcolare getQuantityByName
</script>

<template>
  <div v-if="emptyCart" id="no-items">Your cart is empty</div>
  <div v-else id="cart">
    <span>Total price: {{ totalCartPrice }}€</span>&nbsp;&nbsp;&nbsp;&nbsp;<button @click="clearCart">Empty cart</button>
    <div v-for="(item) in items">
      <Product v-if="getQuantityByName(item.name) > 0" :page="'cart'" :item="item" />
    </div>
  </div>
</template>