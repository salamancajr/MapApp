import {GET_RESTAURANTS} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case GET_RESTAURANTS:
            return action.payload;
        default:
            return state;
    }
};
