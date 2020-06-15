// https://auth0.com/docs/quickstart/spa/react
// https://www.apollographql.com/docs/react/get-started/
// https://www.apollographql.com/docs/react/networking/authentication/

import React from 'react';
import './App.css';
import {Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import MyVoyager from "./components/MyVoyager";
import MyMapbox from "./components/MyMapbox";

function App() {
    return (
        <div>
            <Navbar/>
            <Switch>
                <Route path="/" exact/>
                <PrivateRoute path="/profile" component={Profile}/>
                <PrivateRoute path="/mapbox" component={MyMapbox}/>
                <PrivateRoute path="/voyager" component={MyVoyager}/>
                {/*<PrivateRoute path="/graphiql" component={MyGraphiql}/>*/}
            </Switch>
        </div>
    );
}

export default App;
