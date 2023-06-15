<script>
import useListStore from '../stores/listStore'
import Product from '../components/Product.vue'

export default {
  components: { Product },
  setup() {
    const listStore = useListStore()
    return { listStore }
  }
}
</script>

<template>
  <div id="home">
    <div v-for="product in listStore.list" :key="product.name">
      <Product
        :id="product.name"
        :page="'home'"
        :image="product.image"
        :name="product.name"
        :price="product.price"
      />
    </div>
  </div>
</template>

<style>
#home {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}
</style>
