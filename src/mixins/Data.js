import { ref } from 'vue'

const apiData = () => {
  const data = ref();
  const error = ref();
  const loading = ref(false);

  const load = async() => {
    loading.value = true;
    try {
      const response = await fetch("https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json");
      data.value = await response.json();
      for (let i = 0; i < data.value.length; i++) {
        data.value[i]["quantity"] = 0;
        console.log(data.value[i])
      }
    } catch(e) {
      error.value = e;
    } finally {
      loading.value = false;
    }
  }

  return { data, error, loading, load };
}

export default apiData;