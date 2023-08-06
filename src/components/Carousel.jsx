import React from "react";
import { Link } from "react-router-dom";

function Carousel(){
    return (
        <div id="myCarousel" class="carousel slide" data-bs-ride="carousel">
            <div class="carousel-indicators">
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="0" class="" aria-label="Slide 1"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="1" aria-label="Slide 2" class="active" aria-current="true"></button>
            <button type="button" data-bs-target="#myCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div class="carousel-inner">
            <div class="carousel-item">
            <img class="bd-placeholder-img img1" width="100%" height="100%" ></img>
                <div class="container">
                <div class="carousel-caption text-start">
                    <h1>Stationary and Stuff.</h1>
                    <p>We got you covered.</p>
                    <p><Link to="/register"><a class="btn btn-lg btn-primary" href="#">Sign up today</a></Link></p>
                </div>
                </div>
            </div>
            <div class="carousel-item active">
                <img class="bd-placeholder-img img2" width="100%" height="100%" ></img>

                <div class="container">
                <div class="carousel-caption">
                    <h1>Sports equipments.</h1>
                    <p>We got you covered.</p>
                    <p><Link to="/help"><a class="btn btn-lg btn-primary" href="#">Learn more</a></Link></p>
                </div>
                </div>
            </div>
            <div class="carousel-item">
            <img class="bd-placeholder-img img3" width="100%" height="100%" ></img>
                <div class="container">
                <div class="carousel-caption text-end">
                    <h1>Gadgets for Geeks.</h1>
                    <p>We got you covered.</p>
                    <p><Link to="/help"><a class="btn btn-lg btn-primary" href="#">FAQs</a></Link></p>
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