<script setup>

import { ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";
import { useListStore } from "./stores/listStore";

const listStore = useListStore();
const {fetchData} = listStore;

fetchData();

const top = ref("");
const pages = ref(["home", "detailed", "cart-page"]);
const page = ref("");

const fixLogo = () => {
  for (let i = 0; i < pages.value.length; i++) {
    if (document.getElementById(pages.value[i])) {
      page.value = document.getElementById(pages.value[i]);
      break;
    }
  }
  top.value = `${page.value.getBoundingClientRect().top}px`;
  console.log(page.value.id)
}

const observer = ref(null);
const addObserver = () => {
  if (!page.value.id) {
    window.setTimeout(addObserver, 500);
  } else {
    observer.value = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation) {
          let properties = window.getComputedStyle(page.value);
          top.value = `${properties.getPropertyValue('top')}px`;
        }
      })
    })
    observer.value.observe(page.value, { attributes: true });
  }
}

onMounted(() => {
  window.addEventListener("resize", fixLogo);
  addObserver();
})
onBeforeUnmount(() => {observer.value.disconnect();})
onUnmounted(() => {window.removeEventListener("resize", fixLogo);})

//fatto il css per 320

</script>

<template>
  <img src="./assets/kreas logo.png" alt="logo" id="logo" :style="{height : top}">
  <div id="main">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
      </ul>
    </nav>
    <router-view @height="fixLogo()" :key="$route.path" />
  </div>
</template>

<style>

* {
  font-family: "Quicksand", "Verdana", "Arial", serif;
  font-size: 1em;
}

body{
  background-color: rgb(130, 20, 20);
  color: rgb(23, 23, 23);
}

#logo{
  position:absolute;
  top: 0;
  left: -8px;
}

a{
  text-decoration: none;
  color: rgb(40, 160, 220);
}

#main{
  width: 100%;
}

nav{
  margin-top: -8px;
}

ul{
  padding:0;
  padding-left: 60px;
  padding-right: 60px;
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  list-style-type: none;
}

button{
  background-color: white;
  border: solid black 1px;
  border-radius: 3px;
}

@media (min-width: 576px) {
  * {
    font-size: 1.04em;
  }
}

@media (min-width: 768px) {
  * {
    font-size: 1.09em;
  }
}

@media (min-width: 992px) {
  * {
    font-size: 1.14em;
  }
}

@media (min-width: 1280px) {
  * {
    font-size: 1em;
  }
}

@media (min-width: 1600px) {
}

@media (min-width: 2560px) {
  * {
    font-size: 1.1em;
  }
}

@media (min-width: 3840px) {
  * {
    font-size: 1.2em;
  }

  #logo{
    height: 10%;
  }
}

</style>