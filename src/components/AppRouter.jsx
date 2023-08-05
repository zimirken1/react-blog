import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import {AuthContext} from "../context";
import Login from "../pages/Login";
import PrivateRoute from "./utils/PrivateRoute";
import Loader from "./UI/Loader/Loader";

const AppRouter = () => {
    const {isLoading} = useContext(AuthContext);
    if (isLoading) {
        return <Loader/>
    }

    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/about" element={<About/>}/>
            <Route path="*" element={<Posts/>}/>
            <Route element={<PrivateRoute/>}>
                <Route path="/posts" element={<Posts/>}/>
                <Route path="/posts/:id" element={<PostIdPage/>}/>
            </Route>
        </Routes>
    );
};

export default AppRouter;