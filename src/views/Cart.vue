<script>

import useListStore from "../stores/listStore";
import Product from "../components/Product.vue";

export default {
  components: { Product },
  setup() {
    const listStore = useListStore()
    let empty = listStore.list.filter(item => item.quantity > 0).length == 0;

    function updateCart() {
      empty = listStore.list.filter(item => item.quantity > 0).length == 0;
      console.log(empty)
    }
    return { listStore, empty, updateCart }
  }
}

</script>

<template>
  <div v-if="empty" id="no-items">Your cart is empty</div>
  <div v-else id="cart">
    <div v-for="product in listStore.list">
      <Product v-if="product.quantity > 0" :page="'cart'" :image="product['image']" :name="product['name']" :quantity="product.quantity"
      :id="product['image'].substring(product['image'].lastIndexOf('/') + 1, product['image'].lastIndexOf('.'))" @remove="updateCart()" />
    </div>
  </div>
</template>