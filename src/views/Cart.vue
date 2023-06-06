<script setup>

import { data } from "../mixins/Data.js";
import Product from "../components/Product.vue";

let empty = data.filter(item => item.quantity > 0).length == 0;

function updateCart() {
    empty = data.filter(item => item.quantity > 0).length == 0;
}

</script>

<template>
    <div v-if="!empty" id="cart">
      <div v-for="product in data">
        <Product v-if="product.quantity > 0" :page="'cart'" :image="product['image']" :name="product['name']" :quantity="product.quantity"
        :id="product['image'].substring(product['image'].lastIndexOf('/') + 1, product['image'].lastIndexOf('.'))" @remove="updateCart()"/>
      </div>
    </div>
    <div v-if="empty" id="no-items">Your cart is empty</div>
</template>