<script>

import useListStore from "../stores/listStore";

export default {
  methods: {
    handleRemove() {
      this.listStore.list.filter(item => item.name === this.props.name)[0].quantity = 0;
      this.$emit("remove")
    }
  },
  props: {
      page: String,
      image: String,
      name: String,
      price: Number,
      id: String,
      quantity: Number
  },
  setup(props) {
    const listStore = useListStore();

    const totalPrice = listStore.list.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === props.id)[0].quantity * listStore.list.filter(item => item.image.substring(item.image.lastIndexOf('/') + 1, item.image.lastIndexOf('.')) === props.id)[0].price
    return { listStore, props, totalPrice}
  }
}

</script>

<template class="product">
  <div v-if="props.page === 'home'">
    <a :href="['/details/' + props.id]">
      <img :src="props.image" class="preview"/>
      {{ props.name }}
      <br />
      {{ props.price }}€
    </a>
  </div>
  <div v-else>
    <a :href="['/details/' + props.id]">
      <img :src="props.image" class="cartList" />
    </a>
    {{ props.name }}: {{ props.quantity }} &nbsp;&nbsp;&nbsp; Total price: {{ totalPrice }}€
    <button @click="handleRemove">Remove</button>
  </div>
</template>

<style>

.preview{
  width: 100%;
}

.cartList{
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