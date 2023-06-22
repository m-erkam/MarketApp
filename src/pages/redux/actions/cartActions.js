export const addCart = (product) => {
    return {
        type: "ADD_CART",
        payload: product,
    };
};

export const removeCart = (product) => {
    return {
        type: "REMOVE_CART",
        payload: product,
    };
};
