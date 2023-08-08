import React, { useEffect, useState } from "react";
import "./Card.css";
import AOS from "aos";
import { storage } from "./Firebase";
import { ref as Ref} from "firebase/storage";
import { listAll } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";


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
        <div className="CardContainer" data-aos="fade-in" data-aos-duration="400" data-aos-delay="0">
            <div class="card" style={{width:"19rem"}} >
                <img src={props.store} class="card-img-top" loading="lazy"
                srcSet={`${props.resized} 880w`}
                />
                <div class="card-body">
                    <h5 class="card-title ">{props.title}</h5>
                    <p class="card-text">{props.desc}</p>
                    <p class="card-text" style={{display:state}}>Insta ID: {props.insta}</p>
                    <a class="btn btn-primary" onClick={dispDesc}>{val}</a>
                </div>
                </div>
        </div>
    );
}

export default Card;