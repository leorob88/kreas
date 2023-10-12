<script setup>

import { computed } from "vue";
import { useCartStore } from "../stores/cartStore";

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();
const {removeToCart, getQuantityByName} = cartStore;
const quantity = computed(() => getQuantityByName(props.item.name));
const totalPrice = computed(() => props.item.price * quantity.value);

</script>

<template class="product">
  <div>
    <router-link :to="'/details/' + props.item.name">
      <img :src="props.item.image" class="cartList" />
    </router-link>
    {{ props.item.name }}: {{ quantity }} &nbsp;&nbsp;&nbsp; Total price: {{ totalPrice }}€
    <button @click="removeToCart(props.item.name)">Remove</button>
  </div>
</template>

<style>

.cartList{
  width: 30%;
}

@media (min-width: 576px) {
  
}

@media (min-width: 768px) {
  
}

@media (min-width: 992px) {
  
}

@media (min-width: 1280px) {
  
}

@media (min-width: 1600px) {
  
}

@media (min-width: 1920px) {
  
}

@media (min-width: 2560px) {
  
}

@media (min-width: 3840px) {
  
}

</style>