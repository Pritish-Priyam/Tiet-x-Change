import React from "react";

var x = new Date().getFullYear();

function Footer(){
    return (
        <div className="footer_style">
            <footer class="py-2 mx-0">
                <ul class="nav justify-content-center pb-1 mb-1">
                <li class="nav-item"><a href="#Nav" class="nav-link px-2 ">Home</a></li>
                <li class="nav-item"><a href="https://www.instagram.com/pritish.priyam/" target="_blank" class="nav-link px-2 ">Instagram</a></li>
                <li class="nav-item"><a href="https://github.com/Pritish-Priyam" target="_blank" class="nav-link px-2 ">Github</a></li>
                <li class="nav-item"><a href="https://www.linkedin.com/in/pritish-priyam-953b1a229/" target="_blank" class="nav-link px-2 ">LinkedIn</a></li>
                </ul>
                <p class="text-center text-muted">© {x} TIETxChange by Pritish</p>
            </footer>
        </div>
        
    );
}

export default Footer;