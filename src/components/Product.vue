<script setup>

import { computed } from "vue";
import { storeToRefs } from "pinia";
import { useCartStore } from "../stores/cartStore";

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

const cartStore = useCartStore();
const {removeToCart, getQuantityByName} = cartStore;
const {uniqueList} = storeToRefs(cartStore);
const quantity = computed(() => getQuantityByName(props.item.name));
const totalPrice = computed(() => props.item.price * quantity.value).value.toFixed(2);

const divId = "cart-list-" + uniqueList.value.findIndex(element => element.name === props.item.name);

</script>

<template>
  <div :id="[divId]">
    <router-link :to="'/details/' + props.item.name">
      <img :src="props.item.image" class="preview-cart" :alt="props.item.name"/>
    </router-link>
    <br />
    {{ props.item.name }}: {{ quantity }}
    <div class="product-summary">
      Total: {{ totalPrice }}€
      <button class="product-button" @click="removeToCart(props.item.name)">Remove</button>
    </div>
  </div>
</template>

<style>

.preview-cart{
  width: 100%;
}

.product-summary{
  font-size: 1em;
  display: flex;
  justify-content: space-between;
  padding-bottom: 10px;
}

.product-button{
  font-size: 0.9em;
  padding: 1px;
  width: 60px;
}

@media (min-width: 576px) {
  .product-button{
    padding: 2px;
    width: 100px;
  }
}

@media (min-width: 768px) {
  .product-summary{
    padding-bottom: 15px;
  }

  .product-button{
    width: 120px;
  }
}

@media (min-width: 992px) {
  .product-button{
    width: 160px;
  }  
}

@media (min-width: 1280px) {
  .product-summary{
    padding-bottom: 10px;
  }

  .product-button{
    width: 100px;
  }  
}

@media (min-width: 1920px) {
  .product-summary{
    padding-bottom: 15px;
  }  
}

@media (min-width: 2560px) {
  .product-summary{
    padding-bottom: 20px;
  }

  .product-button{
    width: 140px;
  }  
}

@media (min-width: 3840px) {
  
}

</style>