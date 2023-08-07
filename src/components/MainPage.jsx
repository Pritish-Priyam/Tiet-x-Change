import React from "react";
import NavBar from "./NavBar";
import Content from "./Content";
import Footer from "./Footer";
import "./App.css";

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