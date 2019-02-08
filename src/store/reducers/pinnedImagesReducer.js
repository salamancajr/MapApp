import {GET_PINNED_IMAGES} from '../actions';

export default (state = [], action) => {
    switch (action.type) {
        case GET_PINNED_IMAGES:
            return action.payload;
        default:
            return state;
    }
};
