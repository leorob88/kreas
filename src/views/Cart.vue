<script setup>

import { storeToRefs } from "pinia";
import { useCulturedMeatStore, emptyCart } from "../stores/listStore";
import Product from "../components/Product.vue";

const culturedMeatStore = useCulturedMeatStore();
const {items} = storeToRefs(culturedMeatStore);

console.log("cart")
emptyCart.value = items.value.filter(item => item.quantity > 0).length == 0;

function updateCart() {
  emptyCart.value = items.value.filter(item => item.quantity > 0).length == 0;
  console.log(emptyCart)
}

</script>

<template>
  <div v-if="emptyCart" id="no-items">Your cart is empty</div>
  <div v-else id="cart">
    <div v-for="item in items">
      <Product v-if="item.quantity > 0" :page="'cart'" :image="item.image" :name="item.name" :quantity="item.quantity"
      :id="item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.'))" @remove="updateCart()" />
    </div>
  </div>
</template>