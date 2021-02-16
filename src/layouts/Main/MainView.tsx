import { withStyles } from "@material-ui/core/styles";
import { ClassNameMap } from "@material-ui/core/styles/withStyles";
import React, { Suspense } from "react";
import { MatchedRoute, renderRoutes, RouteConfig } from "react-router-config";
import NavBar from "./components/navigation/NavBar";
import Footer from "./components/Footer";
import Loader from "./components/Loader";


const useStyles = () => ({
    root: {
        minHeight: "100%"
    }
});


export declare type MainViewProps = {
    route: MatchedRoute<any>["route"] & {
        routes: RouteConfig[];
    };
    classes: ClassNameMap<"main">
};

class MainView extends React.Component<any, any> {
    constructor (props: unknown) {
        super(props);
    }

    render () {
        console.log(this.props);
        return (
            <>
                <NavBar/>
                <main className={ this.props.classes.main }>
                    <Suspense fallback={ <Loader/> }>
                        {
                            renderRoutes(this.props.route.routes)
                        }
                    </Suspense>
                </main>
                <Footer/>
            </>
        );
    };
}

export default withStyles(useStyles)(MainView);
