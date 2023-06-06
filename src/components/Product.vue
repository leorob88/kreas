<script setup>

import { data } from '../mixins/Data';

const emit = defineEmits(["remove"]);

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

</script>

<template class="product">
  <div v-if="page === 'home'">
    <a :href="['/details/' + id]">
      <img :src="image" class="preview"/>
      {{ name }}
      <br />
      {{ price }}€
    </a>
  </div>
  <div v-if="page === 'cart'">
    <a :href="['/details/' + id]">
      <img :src="image" class="cartList" />
    </a>
    {{ name }}: {{ quantity }} &nbsp;&nbsp;&nbsp; Total price: {{ data.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === id)[0].quantity * data.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === id)[0].price }}€
    <button @click="data.filter(item => item.name === name)[0].quantity = 0; emit('remove')">Remove</button>
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