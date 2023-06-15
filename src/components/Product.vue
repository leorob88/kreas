<script>
import useListStore from '../stores/listStore'
import { storeToRefs } from 'pinia'

export default {
  props: {
    page: String,
    image: String,
    name: String,
    price: Number,
    id: String,
    quantity: Number
  },
  setup(props, { emit }) {
    const listStore = useListStore()
    const { list } = storeToRefs(listStore)

    const product = list.value.find(
      item => item.name.toLowerCase() === props.id.toLowerCase()
    )

    const totalPrice = product.quantity * product.price

    function handleRemove() {
      product.quantity = 0
      emit('remove')
    }

    return { listStore, props, totalPrice, handleRemove }
  }
}
</script>

<template class="product">
  <div v-if="props.page === 'home'">
    <router-link :to="'/details/' + props.id.toLowerCase()">
      <img :src="props.image" class="preview" />
      {{ props.name }}
      <br />
      {{ props.price }}€
    </router-link>
  </div>
  <div v-else>
    <router-link :to="'/details/' + props.id.toLowerCase()">
      <img :src="props.image" class="cartList" />
    </router-link>
    {{ props.name }}: {{ props.quantity }} &nbsp;&nbsp;&nbsp; Total price:
    {{ totalPrice }}€
    <button @click="handleRemove">Remove</button>
  </div>
</template>

<style>
.preview {
  width: 100%;
}

.cartList {
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
