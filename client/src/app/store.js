import {configureStore} from "@reduxjs/toolkit";
import todoSlicer from './todoSlicer';

const store = configureStore({
    reducer:{
        todoSlicer
    }
});

export default store;