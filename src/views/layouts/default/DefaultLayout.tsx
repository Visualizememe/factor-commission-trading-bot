import React, { Suspense, useEffect } from "react";
import NavBar from "./components/NavBar";
import { renderRoutes } from "react-router-config";
import Loader from "./components/Loader";


class DefaultLayout extends React.Component<any, any> {
    constructor (props: unknown) {
        super(props);
    }
    
    onSideBarOpen = () => {
    
    };
    
    render () {
        return (
            <>
                <NavBar
                    onSidebarOpen={this.onSideBarOpen}
                />
                <Suspense fallback={ <Loader/> }>
                    {
                        renderRoutes(this.props.route.routes)
                    }
                </Suspense>
            </>
        );
    }
}


export default DefaultLayout;
