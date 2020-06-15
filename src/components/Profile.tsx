// https://auth0.com/docs/quickstart/spa/react

import React, { Fragment } from "react";
import {useAuth0} from '../contexts/auth0-context';

function Profile() {

    const { isLoading, user } = useAuth0();

    if (isLoading || !user) {
        return <div>commencing micromanagement...</div>;
    }

    return (
        <Fragment>
            <img src={user.picture} alt="Profile" />
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <code>{JSON.stringify(user, null, 2)}</code>
        </Fragment>
    );
};

export default Profile;