import React from 'react'
import { Redirect } from 'react-router-dom';

const Protected = ({children}) => {

    const isAuth = JSON.parse(localStorage.getItem('UserOnline'));

    if (isAuth.accessToken) {
        return children;
    }
    else{
        return <Redirect to="/" replace />;
    }

}

export default Protected