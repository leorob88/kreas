<script setup>

import { data } from "../mixins/Data.js";
import Product from "../components/Product.vue";

</script>

<template>
  <div id="home">
    <div v-for="product in data">
      <Product :page="'home'" :image="product['image']" :name="product['name']" :price="product['price']"
      :id="product['image'].substring(product['image'].lastIndexOf('/') + 1, product['image'].lastIndexOf('.'))"/>
    </div>
  </div>
</template>

<style>

#home{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}


</style>