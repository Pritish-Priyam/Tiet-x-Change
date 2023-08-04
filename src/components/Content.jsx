import React from "react";
import Carousel from "./Carousel";
import Products from "./Products";
import "./App.css";
import Lottie from "lottie-react";
import animationData from "./images/animation_lkf5iy1i.json";

function Content(){
    return (
        <div className="content">
            <Carousel />
            <Products />
        </div>
    );
}

export default Content;