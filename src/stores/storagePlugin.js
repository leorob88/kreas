

export function storagePlugin(context) {
    const culturedMeatStore = () => {
        const storedState = localStorage.getItem("culturedMeat");
        try {
            return JSON.parse(storedState || "{}");
        } catch (err) {
            console.error(err);
            return {};
        };
    }
    const {store} = context;
    store.$patch({ ...culturedMeatStore });
    store.$subscribe((_mutation, state) => {
        console.log(state)
        const stateForLocalStorage = { items: state.items, loaded: state.loaded};
        localStorage.setItem('culturedMeat', JSON.stringify(stateForLocalStorage));
    });
}