// https://auth0.com/docs/quickstart/spa/react

import React, {useEffect} from "react";
import {Route} from "react-router-dom";
import {useAuth0} from '../contexts/auth0-context';

// TODO: define the type of component correctly. JSX element? React component?
interface PrivateRouteProperties {
    component: any,
    path: string
}

function PrivateRoute({component: Component, path, ...rest}: PrivateRouteProperties): JSX.Element {

    const {loading, isAuthenticated, loginWithRedirect} = useAuth0();

    useEffect(() => {
        if (loading || isAuthenticated) {
            return;
        }
        const fn = async () => {
            await loginWithRedirect({
                appState: {targetUrl: window.location.pathname}
            });
        };
        fn();
    }, [loading, isAuthenticated, loginWithRedirect, path]);

    const render = (props: any) =>
        isAuthenticated === true ? <Component {...props} /> : null;

    return <Route path={path} render={render} {...rest} />;
}

export default PrivateRoute;