import React, {useContext} from 'react';
import {AuthContext} from "../../context";
import {Navigate, Outlet} from "react-router-dom";

const PrivateRoute = () => {
    const {isAuth} = useContext(AuthContext);

    return (
        isAuth ? <Outlet/> : <Navigate to={"/login"}/>
    );
};

export default PrivateRoute;