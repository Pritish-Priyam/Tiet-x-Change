import React, { useState } from "react";
import { Link,Route, Routes, Router } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import AuthDetails from "./AuthDetails";
import Card from "./Card";


const x = document.querySelector("[prod-data]")

function NavBar(){

    const [txt,useText] = useState("Login");

    function handleClick(e){
        document.getElementById("login_text").disabled = true;
    }

    //function search(){
        /*fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(response => response.json())
            .then(data =>
                {
                    const c = x.content.cloneNode(true).children[0];
                    console.log(c);
                });*/
    /*}

    window.onload = search();
    */
    
    return (
        <div className="NavBar" id="Nav" data-aos="fade-down">
            <button className="NavBtn">T x C</button>
            <div className="search_wrapper">
            <input type="search" placeholder="What are you looking for today!" className="search_bar"></input>
            <button className="search_btn"><i className="material-icons">search</i></button>
            </div>

            <AuthDetails />

            <Link to="/upload"><button className="upload_btn"><span>SELL</span></button></Link>
            <div className="extra_icons">
            <button className="NavBtn" title="Cart"><i className="material-icons">shopping_basket</i></button>
            <a href="mailto:priyampritish@gmail.com" title="Contact Me" className="NavBtn"><button className="NavBtn"><i className="material-icons">contact_mail</i>
            </button></a>
        
            <Link to="/help"><button className="NavBtn" title="Help"><i className="material-icons" >help</i></button></Link>
            </div>
        </div>
    );
}

export default NavBar;