import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Navbar from "./components/Navbar";
import MyVoyager from "./components/MyVoyager";
import MyMapbox from "./components/MyMapbox";
// https://auth0.com/docs/quickstart/spa/react
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";

const App = () => (
    <BrowserRouter>
        <Navbar/>
        <Switch>
            <Route path="/" exact/>
            <PrivateRoute path="/profile" component={Profile}/>
            <PrivateRoute path="/mapbox" component={MyMapbox}/>
            <PrivateRoute path="/voyager" component={MyVoyager}/>
            {/*<PrivateRoute path="/graphiql" component={MyGraphiql}/>*/}
        </Switch>
    </BrowserRouter>
);

export default App;
