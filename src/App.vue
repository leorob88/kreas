<script>

import useListStore from "./stores/listStore";

export default {
  setup () {
    const listStore = useListStore()
    return {listStore}
  }
}

</script>

<template>
  <div id="main">
    <nav>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/cart">Cart</router-link></li>
      </ul>
    </nav>
    <br />
    <router-view :key="$route.path" />
  </div>
</template>

<style>

* {
  font-family: "Quicksand", "Verdana", "Arial", serif;
  font-size: 0.94em;
}

body{
  background-color: rgb(23, 23, 23);
  color: rgb(238, 238, 238);
}

a{
  text-decoration: none;
  color: rgb(0, 189, 126);
}

#main{
  width: 100%;
}

ul{
  padding:0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  text-decoration: none;
  list-style-type: none;
}

.product{
  padding: 5%;
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
}

</style>