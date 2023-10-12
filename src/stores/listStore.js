
import {defineStore} from "pinia";
import { ref } from "vue";

const getAll = async () => {
  const url = "https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json";

  try{
      const response = await fetch(url);

      const status = response.status;

      if(status === 200) {
          return response.json();
      }

      throw new Error(`Richiesta fallita con codice ${status}.`);
  } catch(err) {
      throw err;
  }
}

export const useListStore = defineStore("listStore", () => {
    const items = ref([]);
    const loading = ref(false);
    const loaded = ref(false);
    const error = ref("");

    const fetchData = async () => {
        try {
            error.value = "";
            loading.value = true;
            const response = await getAll();
            items.value = addItem(response);
            loaded.value = true;
        } catch (err) {
            items.value = [];
            loaded.value = false;
            error.value = err.message;
            throw err;
        } finally {
            loading.value = false;
        }
    }

    return {items, loading, loaded, error, fetchData};
})


const addItem = (items) => {
    return items.map(item => ({...item, id: item.name}))
}