<script setup>

import { ref, onMounted, onUnmounted, onBeforeUnmount } from "vue";
import { useListStore } from "./stores/listStore";

const listStore = useListStore();
const {fetchData} = listStore;

fetchData();

//graphic fixes needed to make the logo independent of the navbar container
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
  top.value = `${page.value.offsetTop}px`;
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
onBeforeUnmount(() => {
  observer.value.disconnect();
})
onUnmounted(() => {
  window.removeEventListener("resize", fixLogo);
})

//manca il css per 3840

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

html {
  overflow-x: hidden;
  margin-right: calc(-1 * (100vw - 100%));
}

* {
  font-family: "Quicksand", "Verdana", "Arial", serif;
}

body{
  background-color: rgb(130, 20, 20);
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

a:hover{
  color: rgb(97, 194, 243);
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
  background-color: rgb(245, 245, 245);
  border: solid black 1px;
  border-radius: 3px;
}

button:hover{
  background-color: white;
}

@media (min-width: 576px) {
  * {
    font-size: 1.06em;
  }

  ul{
    padding-left: 100px;
    padding-right: 100px;
  }
}

@media (min-width: 768px) {
  * {
    font-size: 1.09em;
  }

  ul{
    padding-left: 140px;
    padding-right: 140px;
  }

  button{
    border: solid black 2px;
    border-radius: 6px;
  }
}

@media (min-width: 992px) {
  * {
    font-size: 1.14em;
  }

  #logo{
    left: -20px;
  }

  ul{
    padding-left: 200px;
    padding-right: 200px;
  }
}

@media (min-width: 1280px) {
  * {
    font-size: 1.05em;
  }

  #logo{
    left: 20px;
  }

  ul{
    padding-left: 250px;
    padding-right: 250px;
  }
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
}

</style>