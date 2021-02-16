import { applyMiddleware, compose, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import rootReducer from "../reducers";


function configureStore (preloadedState = {}) {
    const middlewares = [ thunkMiddleware ];
    const middlewareEnhancer = applyMiddleware(...middlewares);
    const enhancers = [ middlewareEnhancer ];
    const composedEnhancers = compose(...enhancers);
    
    return createStore(
        // @ts-ignore
        rootReducer,
        preloadedState,
        // @ts-ignore
        composedEnhancers
    );
}

export default configureStore();
