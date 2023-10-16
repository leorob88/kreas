<script setup>

import { storeToRefs } from "pinia";
import { computed } from "vue";
import { useListStore } from "../stores/listStore";
import Item from "../components/Item.vue"

const listStore = useListStore();
const {items, loading, loaded, error} = storeToRefs(listStore);
const showList = computed(() => !loading.value && loaded.value);

</script>

<template>
  <div id="home">
    
    <p v-if="loading">Loading...</p>

    <div id="home-list" v-if="showList" v-for="(item) in items">
      <Item :item="item" />
    </div>

    <p v-if="error">{{ error }}</p>

  </div>
</template>

<style>

#home{
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding-left: 380px;
  font-size: 0.8em;
}

#home-list{
  width: 64%;
}

</style>