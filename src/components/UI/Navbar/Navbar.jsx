import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import MyButton from "../button/MyButton";
import {AuthContext} from "../../../context";
import classes from "./Navbar.module.css";

const Navbar = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const navigate = useNavigate();

    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth ')
    }

    return (
        <div className={classes.navbar}>
            <div className={classes.navbar__logo} onClick={() => navigate("/about")}>
                BLOG
            </div>
            <div className={classes.navbar__links}>
                <Link className={classes.navbar__link} to={"/about"}>О сайте</Link>
                <Link className={classes.navbar__link} to={"/posts"}>Посты</Link>
            </div>
            <div>
                {isAuth
                    ? <MyButton onClick={logout}>Выйти</MyButton>
                    : <MyButton onClick={() => navigate("/login")}>Войти</MyButton>
                }
            </div>
        </div>
    );
};

export default Navbar;