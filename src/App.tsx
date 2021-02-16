import { SnackbarProvider } from "notistack";
import * as React from "react";
import { Provider as StoreProvider } from "react-redux";
import { renderRoutes } from "react-router-config";
import { Router } from "react-router-dom";
import MainLoader from "./components/MainLoader";
import history from "./util/history";
import routes from "./util/routes";
import store from "./util/store";


declare type AppProps = {};

export default function App (props: AppProps) {
    return (
        <StoreProvider store={ store }>
            <SnackbarProvider maxSnack={ 5 }>
                <Router history={ history }>
                    <React.Suspense fallback={ <MainLoader/> }>
                        {
                            renderRoutes(routes)
                        }
                    </React.Suspense>
                </Router>
            </SnackbarProvider>
        </StoreProvider>
    );
}
