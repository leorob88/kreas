import { ref } from 'vue'

export function apiData() {
  const data = ref(null)
  const error = ref(null)

  fetch("https://ott-fogliata.github.io/vuejs-s2i-repository/cultured-meat.json")
    .then((res) => res.json())
    .then((json) => (data.value = json))
    .catch((err) => (error.value = err))

  return { data, error }
}