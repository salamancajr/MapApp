import {GET_RESTAURANT_INFO} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case GET_RESTAURANT_INFO:
            return action.payload;
        default:
            return state;
    }
};
