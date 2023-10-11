<script setup>

import { ref, computed } from 'vue';
import { storeToRefs } from "pinia";
import { useCulturedMeatStore } from "../stores/listStore";
import { useCartStore } from "../stores/cartStore";
import Product from "../components/Product.vue";

const culturedMeatStore = useCulturedMeatStore();
const {items} = storeToRefs(culturedMeatStore);
const cartStore = useCartStore();
const {products, emptyCart, totalCartPrice} = storeToRefs(cartStore);
const {clearCart} = cartStore;

const uniqueList = ref([]);
for (let a = 0; a < products.value.length; a++) {
  let check = false;
  for (let b = 0; b < uniqueList.value.length; b++) {
    if (products.value[a].name === uniqueList.value[b].name) {
      check = true;
      break;
    }
  }
  if (!check) {
    uniqueList.value.push(products.value[a])
  }
}
const getItem = (name) => {
  const item = items.value.filter(element => element.name === name)[0];
  return item;
}

console.log("cart")
console.log(items)
console.log(products)
console.log(uniqueList);

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