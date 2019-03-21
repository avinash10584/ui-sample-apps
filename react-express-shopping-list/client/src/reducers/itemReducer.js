import * as Actions from '../actions/types';

const initialState = {
    items: [],
    loading: false,
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Actions.GET_ITEMS:
            return {
                ...state,
                items: action.payload,
                loading: false,
            };
        case Actions.DELETE_ITEMS:
            return {
                ...state,
                items: state.items.filter(x => x._id !== action.payload),
            };
        case Actions.ADD_ITEM:
            return {
                ...state,
                items: [action.payload, ...state.items],
            };
        case Actions.ITEMS_LOADING:
            return {
                ...state,
                loading: true,
            };
        default:
            return state;
    }
}
