import React from "react";
import NavBar from "./NavBar";
import Content from "./Content";
import Footer from "./Footer";
import "./App.css";
import Lottie from "lottie-react";
import animationData from "./images/animation_lkf5iy1i.json";

function MainPage(){
    return (
        <div>
            <NavBar />
            <Content />
            <Footer />
        </div>
    );
}

export default MainPage;