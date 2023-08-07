import React from "react";
import Carousel from "./Carousel";
import Products from "./Products";
import "./App.css";

function Content(){
    return (
        <div className="content">
            <Carousel />
            <Products />
        </div>
    );
}

export default Content;