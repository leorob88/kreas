import { defineStore } from "pinia"
import { ref } from "vue"

const data = ref();
const response = await fetch("https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json");
data.value = await response.json();
for (let i = 0; i < data.value.length; i++) {
  data.value[i]["quantity"] = 0;
}

const useListStore = defineStore("listStore", {
    state: () => ({
        list: data.value,
        emptyCart: true
    })
})

export default useListStore