<script>
import { ref } from 'vue'
import useListStore from '../stores/listStore'
import { storeToRefs } from 'pinia'
import { useRoute } from 'vue-router'

export default {
  setup() {
    const route = useRoute()
    const listStore = useListStore()
    const { list } = storeToRefs(listStore)

    const product = list.value.find(
      item => item.name.toLowerCase() === route.params.id
    )

    let quantity = ref(0)
    let visibility = ref(false)

    function less() {
      if (quantity.value > 0) {
        quantity.value--
      }
      console.log(quantity.value)
    }

    function add() {
      visibility.value = false
      product.quantity += quantity.value
      quantity.value = 0
    }
    return { listStore, product, quantity, visibility, less, add }
  }
}
</script>

<template>
  <div>
    <img id="image" :src="product.image" />
    {{ product.name }}
    <br />
    {{ product.description }}
    <br />
    {{ product.price }}€
    <br />
    <button @click="visibility = true">Add to cart</button>
    <span v-if="visibility">
      <button @click="less">-</button>
      <span>{{ quantity }}</span>
      <button @click="quantity++">+</button>
      <button @click="add">Ok</button>
      <button @click="visibility = false">Cancel</button>
    </span>
    <div>
      Currently added:
      {{ product.quantity }}
    </div>
  </div>
</template>

<style>
#image {
  width: 30%;
}
</style>
