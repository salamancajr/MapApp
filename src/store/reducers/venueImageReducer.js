import {SAVE_VENUE_IMAGE} from '../actions';

export default (state = {}, action) => {
    switch (action.type) {
        case SAVE_VENUE_IMAGE:
            return action.payload;
        default:
            return state;
    }
};
