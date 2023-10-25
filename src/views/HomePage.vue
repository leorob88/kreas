<script setup>

import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useListStore } from "../stores/listStore";
import Item from "../components/Item.vue"

const emit = defineEmits(["height"]);

onMounted(() => {
  emit("height");
})

const listStore = useListStore();
const {items, loading, loaded, error} = storeToRefs(listStore);
const showList = computed(() => !loading.value && loaded.value);

</script>

<template>
  <div id="home">
    
    <p v-if="loading">Loading...</p>

    <div class="home-list" v-if="showList" v-for="(item) in items">
      <Item :item="item" />
    </div>

    <p v-if="error">{{ error }}</p>

  </div>
</template>

<style>

#home{
  background-color: rgb(200, 200, 200);
  width: 100%;
  padding-top: 20px;
  position: absolute;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  justify-items: center;
  margin:-8px;
}

.home-list{
  width: 80%;
}

@media (min-width: 576px) {
  #home{
    padding-top: 34px;
  }
}

@media (min-width: 768px) {
  #home{
    padding-top: 25px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 3840px) {
  #home{
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin:-8px;
  }

  .home-list{
    width: 64%;
  }
}

</style>