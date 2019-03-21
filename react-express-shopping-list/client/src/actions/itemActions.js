
import * as types from './types';

export const setItemsLoading = () => ({
        type: types.ITEMS_LOADING,
});


export const getItems = () => (dispatch) => {
        dispatch(setItemsLoading());

        fetch('/api/items')
               .then(res => res.json())
               .then(data => dispatch({ type: types.GET_ITEMS, payload: data }));
};

export const addItems = () => ({ type: types.ADD_ITEMS });

export const deleteItems = id => ({
        type: types.DELETE_ITEMS,
        payload: id,
});

export const addItem = item => ({
        type: types.ADD_ITEMS,
        payload: item,
});
