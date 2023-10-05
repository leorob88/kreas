<script setup>

import { useCartStore } from "../stores/cartStore";

const props = defineProps({
  page: {
    type: String
  },
  item: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();
const {removeToCart, getQuantityByName} = cartStore;

const totalPrice = props.item.price * getQuantityByName(props.item.name);

</script>

<template class="product">
  <div v-if="props.page === 'home'">
    <router-link :to="'/details/' + props.item.name">
      <img :src="props.item.image" class="preview"/>
      {{ props.item.name }}
      <br />
      {{ props.item.price }}€
    </router-link>
  </div>
  <div v-else>
    <router-link :to="['/details/' + props.item.name]">
      <img :src="props.item.image" class="cartList" />
    </router-link>
    {{ props.item.name }}: {{ getQuantityByName(props.item.name) }} &nbsp;&nbsp;&nbsp; Total price: {{ totalPrice }}€
    <button @click="removeToCart(props.item.name)">Remove</button>
  </div>
</template>

<style>

.preview{
  width: 100%;
}

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