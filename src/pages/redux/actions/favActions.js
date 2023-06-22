export const addFav = (product) => {
    return {
        type: "ADD_FAV",
        payload: product,
    };
};

export const removeFav = (product) => {
    return {
        type: "REMOVE_FAV",
        payload: product,
    };
};
