import React from 'react'
import { Redirect } from 'react-router-dom';

const Protected = ({children}) => {

    const isAuth = JSON.parse(localStorage.getItem('isAuth'));

    if (isAuth) {
        return children;
    }
    else{
        return <Redirect to="/" replace />;
    }

}

export default Protected