import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from "./serviceWorker";
// https://auth0.com/blog/modern-full-stack-development-with-nestjs-react-typescript-and-mongodb-part-2
import {Auth0Provider} from './contexts/auth0-context';

ReactDOM.render(
    <Auth0Provider>
        <App/>
    </Auth0Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
