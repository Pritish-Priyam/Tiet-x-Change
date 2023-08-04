import React, { useEffect, useState } from "react";
import "./Card.css";
import AOS from "aos";
import { motion } from "framer-motion";


function Card(props){
    const [state,setState] = useState("none");
    const [val,setVal] = useState("Know more");
    const [disp,setDisp] = useState("block");
    function dispDesc(){
        if(val == "Show less"){
            setVal("Know more");
            setState("none")
            setDisp("block");
        }
        else{
            setState("block");
            setVal("Show less");
            setDisp("None");
        }
    }
    
    return (
        <div className="CardContainer">
            <div className="Card" data-aos ="fade-in" data-aos-once = "true"
                data-aos-duration= "400">
                <div className="CardImg"></div>
                <div className="PriceWrapper">
                <h2 className="PriceTitle" style={{display: disp}}>{props.title}</h2>
                <div className="hiddenDetails" style={{display: state}}>
                    <h2 className="PriceText" ><span className="heading">Desc:</span> {props.desc}</h2>
                    <h2 className="PriceText"><span className="heading">Price:</span> $50</h2>
                    <h2 className="PriceText"><span className="heading">Insta id:</span> {props.insta}</h2>
                </div>
                </div>
                <button className="CardExpandBtn" onClick={dispDesc}>{val}</button>
            </div>
        </div>
    );
}

export default Card;