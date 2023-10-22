<script setup>

import { ref } from "vue";
import { useListStore } from "./stores/listStore";

const listStore = useListStore();
const {fetchData} = listStore;

fetchData();

const homeTop = ref("");
const fixLogo = () => {
  homeTop.value = `${document.getElementById("home").getBoundingClientRect().top}px`;
  console.log(homeTop.value)
  document.getElementById("logo").style.height = homeTop || detailTop || cart1Top || cart2Top;
}

//fatto il css per 320
//fare fixLogo anche per le altre pagine
//per fare il resto del css aggiungere anche il listener window resize per il logo

</script>

<template>
  <img src="./assets/kreas logo.png" alt="logo" id="logo" :style="{height : homeTop}">
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