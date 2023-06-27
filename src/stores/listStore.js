
import { useStorage } from "@vueuse/core";
import axios from "axios";

const theDefault = fetchData();

const state = useStorage('vue-use-local-storage', theDefault)

  async function fetchData() {
    try {
      const data = await axios.get("https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json");
      for (let i = 0; i < data.data.length; i++) {
        data.data[i]["quantity"] = 0;
      }
      console.log(data)
      return data.data;
      
    } catch (error) {
      console.log(error);
    }
  }

  export default state