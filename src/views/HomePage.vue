<script>

import useListStore from "../stores/listStore";
import Product from "../components/Product.vue"

export default {
  components: { Product },
  setup () {
    const listStore = useListStore()
    return {listStore}
  }
}

</script>

<template>
  <div id="home">
    <div v-for="product in listStore.list">
      <Product :page="'home'" :image="product['image']" :name="product['name']" :price="product['price']"
      :id="product['image'].substring(product['image'].lastIndexOf('/') + 1, product['image'].lastIndexOf('.'))" />
    </div>
  </div>
</template>

<style>

#home{
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}


</style>