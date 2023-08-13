import React from 'react';
import '../styles/About.css'
import MyButton from "../components/UI/button/MyButton";
import {useNavigate} from "react-router-dom";
const About = () => {
    const navigate = useNavigate();

    return (
        <div className={"about-page__wrapper"}>
            <div className={"about-page__section"}>
                <div className={"about-page__title-text"}>
                    The Blog
                </div>
                <div className={"about-page__text"}>
                    The latest industry news, interviews, technologies, and resources.
                </div>
                <MyButton onClick={() => navigate("/posts")}>Get started</MyButton>
            </div>
            <footer className={"about-page__footer"}>

            </footer>
        </div>
    );
};

export default About;