import * as actions from "../actions";
import { initialState } from "../constants";


export default function (state = initialState, action: any) {
    console.log("REDUCER:", action.type, action);
    
    switch (action.type) {
        case actions.SESSION_LOGIN: {
            console.log("logging in");
            console.log(state, action.session);
            console.log({ ...state, ...action.session });
            
            return {
                ...state
            };
        }
        
        case actions.SESSION_LOGOUT: {
            return {
                ...state,
                ...action.session
            };
        }
        
        default: {
            return state;
        }
    }
}
