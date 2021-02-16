import { ReduxDispatcher } from "../interfaces";


export const SESSION_LOGIN = "SESSION_LOGIN";
export const SESSION_LOGOUT = "SESSION_LOGOUT";


export const sessionLogin = (authToken: string) => (dispatch: ReduxDispatcher) => dispatch({
    type: SESSION_LOGIN,
    authToken
});

export const sessionLogout = () => (dispatch: ReduxDispatcher) => dispatch({
    type: SESSION_LOGOUT
});
