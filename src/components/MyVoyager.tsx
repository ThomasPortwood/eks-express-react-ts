import * as React from 'react';
import {useEffect, useState} from 'react';
import {Voyager} from 'graphql-voyager';
import fetch from 'isomorphic-fetch';
import {useAuth0} from '../contexts/auth0-context';

const endpoint = process.env.REACT_APP_GRAPHQL_ENDPOINT;

export default function MyVoyager() {

    const {getTokenSilently} = useAuth0();

    const [token, setToken] = useState("");

    function introspectionProvider(query: string) {
        // @ts-ignore
        return fetch(endpoint, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({query: query})
        }).then((response: any) => response.json());
    }

    useEffect(() => {

        getTokenSilently().then((t: string) => setToken(t));

    }, [getTokenSilently]);

    return (
        <div>
            <Voyager
                introspection={introspectionProvider}
                workerURI={process.env.PUBLIC_URL + '/voyager.worker.js'}
            />
        </div>
    );
}