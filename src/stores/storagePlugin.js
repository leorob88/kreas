
function getStateFromLocalStorage(storeName) {
    const storedState = localStorage.getItem(storeName);
    try {
        return JSON.parse(storedState || "{}");
    } catch (err) {
        console.error(err);
        return {};
    };
}

function createStateForStorage(storeId, state) {
    switch (storeId) {
        case "listStore":
        return JSON.stringify({ items: state.items, loaded: state.loaded });
        case "cartStore":
        return JSON.stringify({ products: state.products });
        default:
        return '{}';
    }
}

export function storagePlugin(context) {
    const state = getStateFromLocalStorage(context.store.$id);
    context.store.$patch({ ...state});
    context.store.$subscribe(({storeId}, state) => {
        localStorage.setItem(storeId, createStateForStorage(storeId, state));
    });
}