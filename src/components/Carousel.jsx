import React from "react";
import { Link } from "react-router-dom";
import { storage } from "./Firebase";
import { ref as Ref} from "firebase/storage";
import { listAll } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { useState,useEffect } from "react";
import "./App.css";
import Skeleton from "react-loading-skeleton";

function Carousel(){
    const [links, setLinks] = useState([]);
    
    useEffect(() => {
        const folderRef = Ref(storage, `CarouselBg/`);

         // List all items (images) in the folder
        listAll(folderRef)
        .then((res) => {
        // Get download URLs for each image
        const downloadURLPromises = res.items.map((item) => getDownloadURL(item));

        // Wait for all the download URL promises to resolve
        return Promise.all(downloadURLPromises);
        })
        .then((downloadURLs) => {
        // Set the download URLs in the state
        const filteredLinks = downloadURLs.filter((url, index) => url !== null && downloadURLs.indexOf(url) === index);
        setLinks(filteredLinks);
        })
        .catch((error) => {
        console.error("Error fetching images from Firebase Storage:", error);
        });
      }, []);

      
        
        /*listAll(fileRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setLinks((prev) => [...prev,url]);
                })
            })
        })*/



    return (
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class="active" aria-current="true"></button>
            </div>
            <div class="carousel-inner">
            <div class="carousel-item">
            <img class="bd-placeholder-img img1" src={links[0]}
                 srcSet={`${links[1]} 880w`}
                 width="100%" height="100%" alt="Stationary items"></img>
                <div class="container">
                <div class="carousel-caption text-start">
                    <h1>Stationary and Stuff.</h1>
                    <p>We got you covered.</p>
                    <p><Link to="/register"><button class="btn btn-lg btn-primary">Sign up today</button></Link></p>
                </div>
                </div>
            </div>
            <div class="carousel-item active">
                <img class="bd-placeholder-img img2" src={links[2]}      
                srcSet={`${links[3]} 880w`}
                alt="Various items"
                width="100%" height="100%" ></img>

                <div class="container">
                <div class="carousel-caption">
                    <h1> From mattresses to buckets.</h1>
                    <p>We got you covered.</p>
                    <p><Link to="/help"><button class="btn btn-lg btn-primary">Learn more</button></Link></p>
                </div>
                </div>
            </div>
            
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#myCarousel" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
            </button>
            <button class="carousel-control-next" type="button" data-bs-target="#myCarousel" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
            </button>
        </div>
    );
}

export default Carousel;