import React from "react";

var x = new Date().getFullYear();

function Footer(){
    return (
        <div className="footer_style">
            <footer class="py-2 mx-0">
                <ul class="nav justify-content-center pb-1 mb-1">
                <li class="nav-item"><a href="#Nav" class="nav-link px-2 ">About</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 ">Home</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 ">Features</a></li>
                <li class="nav-item"><a href="#" class="nav-link px-2 ">FAQs</a></li>
                </ul>
                <p class="text-center text-muted">© {x} TIETxChange by Pritish</p>
            </footer>
        </div>
        
    );
}

export default Footer;