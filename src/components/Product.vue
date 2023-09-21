<script setup>

import { storeToRefs } from "pinia";
import { useCulturedMeatStore } from "../stores/listStore";

const props = defineProps({
  page: {
    type: String
  },
  image: {
    type: String
  },
  name: {
    type: String
  },
  price: {
    type: Number
  },
  id: {
    type: String
  },
  quantity: {
    type: Number
  }
});

const culturedMeatStore = useCulturedMeatStore();
const {items} = storeToRefs(culturedMeatStore);

function handleRemove () {
  this.items.value.filter(item => item.name === this.props.name)[0].quantity = 0;
  this.$emit("remove");
}

const product = items.value.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === props.id)[0]; //filters the product with the name stated in image
const totalPrice = product.quantity * product.price;

</script>

<template class="product">
  <div v-if="props.page === 'home'">
    <router-link :to="'/details/' + props.id">
      <img :src="props.image" class="preview"/>
      {{ props.name }}
      <br />
      {{ props.price }}€
    </router-link>
  </div>
  <div v-else>
    <router-link :href="['/details/' + props.id]">
      <img :src="props.image" class="cartList" />
    </router-link>
    {{ props.name }}: {{ props.quantity }} &nbsp;&nbsp;&nbsp; Total price: {{ totalPrice }}€
    <button @click="handleRemove">Remove</button>
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