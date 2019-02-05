import {AppRegistry} from 'react-native';
import React from "react"
import App from './App';
import {Provider} from "react-redux";
import configureStore from "./src/store/configureStore";

const mapApp = () => (
    <Provider store={configureStore()}>
        <App/>
    </Provider>
)
AppRegistry.registerComponent("MapApp", () => mapApp);
