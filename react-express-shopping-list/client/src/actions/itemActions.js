
import * as Actions from './types';

export const setItemsLoading = () => ({
        type: Actions.ITEMS_LOADING,
});


export const getItems = () => (dispatch) => {
        dispatch(setItemsLoading());

        fetch('/api/items')
        .then(res => res.json())
        .then(data => dispatch({ type: Actions.GET_ITEMS, payload: data }));
};

export const addItem = item => (dispatch) => {
        fetch('/api/items', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(item),
        })
        .then(res => res.json())
        .then(data => dispatch({ type: Actions.ADD_ITEM, payload: data }));
};

export const deleteItems = id => (dispatch) => {
        fetch(`/api/items/${id}`, {
                method: 'delete',
                headers: { 'Content-Type': 'application/json' },
        })
        .then(() => dispatch({ type: Actions.DELETE_ITEMS, payload: id }));
};
