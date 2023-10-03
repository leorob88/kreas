

function createStateForStorage(storeId, state) {
    switch (storeId) {
        case "culturedMeat":
        return JSON.stringify({ items: state.items, loaded: state.loaded });
        case "myAwesomeCart":
        return JSON.stringify({ items: state.items });
        default:
        return '{}';
    }
}

export function storagePlugin(context) {
    const {store} = context;
    const state = () => {
        const storedState = localStorage.getItem(store);
        try {
            return JSON.parse(storedState || "{}");
        } catch (err) {
            console.error(err);
            return {};
        };
    }
    store.$patch({ ...state});
    store.$subscribe(({storeId}, state) => {
        localStorage.setItem(storeId, createStateForStorage(storeId, state));
    });
}