<script>
import useListStore from '../stores/listStore'
import Product from '../components/Product.vue'

export default {
  components: { Product },
  setup() {
    const listStore = useListStore()
    listStore.emptyCart =
      listStore.list.filter(item => item.quantity > 0).length == 0

    function updateCart() {
      listStore.emptyCart =
        listStore.list.filter(item => item.quantity > 0).length == 0
      console.log(listStore.emptyCart)
    }
    return { listStore, updateCart }
  }
}
</script>

<template>
  <div v-if="listStore.emptyCart" id="no-items">Your cart is empty</div>
  <div v-else id="cart">
    <div v-for="product in listStore.list" :key="product.name">
      <Product
        v-if="product.quantity > 0"
        :id="product.name"
        page="cart"
        :image="product.image"
        :name="product.name"
        :quantity="product.quantity"
        @remove="updateCart()"
      />
    </div>
  </div>
</template>
