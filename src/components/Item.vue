<script setup>

const props = defineProps({
  page: {
    type: String
  },
  item: {
    type: Object,
    required: true
  }
});

</script>

<template class="product">
  <div>
    <router-link :to="'/details/' + props.item.name">
      <img :src="props.item.image" class="preview"/>
      {{ props.item.name }}
      <br />
      {{ props.item.price }}€
    </router-link>
  </div>
</template>

<style>

.preview{
  width: 100%;
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