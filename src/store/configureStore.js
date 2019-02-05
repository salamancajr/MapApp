import {createStore, combineReducers, applyMiddleware} from "redux";
import testReducer from "./reducers/test"
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    testReducer
})

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk))
}

export default configureStore;