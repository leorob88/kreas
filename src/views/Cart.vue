<script>

import useListStore from "../stores/listStore";
import Product from "../components/Product.vue";

export default {
  components: { Product },
  setup () {
    const listStore = useListStore()
    listStore.emptyCart = listStore.list.filter(item => item.quantity > 0).length == 0;
    return { listStore }
  }
}

</script>

<template>
  <div v-if="listStore.emptyCart" id="no-items">Your cart is empty</div>
  <div v-else id="cart">
    <div v-for="product in listStore.list">
      <Product v-if="product.quantity > 0" :page="'cart'" :image="product['image']" :name="product['name']" :quantity="product.quantity"
      :id="product['image'].substring(product['image'].lastIndexOf('/') + 1, product['image'].lastIndexOf('.'))"
      @remove="listStore.emptyCart = listStore.list.filter(item => item.quantity > 0).length == 0" />
    </div>
  </div>
</template>