<script setup>

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
});

</script>

<template>
  <div>
    <router-link :to="'/details/' + props.item.name">
      <img :src="props.item.image" class="preview-home" :alt="props.item.name" />
      <div class="item-summary">
        {{ props.item.name }}
        <br />
        {{ props.item.price.toFixed(2) }}€
      </div>
    </router-link>
  </div>
</template>

<style>

.preview-home{
  width: 100%;
}

.item-summary{
  font-size: 0.9em;
  text-align: center;
  padding-bottom: 10px;
  color: black;
}

.item-summary:hover{
  color: rgb(228, 113, 5);
}

@media (min-width: 768px) {
  .item-summary{
    padding-bottom: 20px;
  }
}

@media (min-width: 1280px) {
  .item-summary{
    padding-bottom: 15px;
  }  
}

@media (min-width: 2560px) {
  .item-summary{
    font-size: 1em;
    padding-bottom: 30px;
  }
}

@media (min-width: 3840px) {
  .item-summary{
    padding-bottom: 50px;
  }  
}

</style>