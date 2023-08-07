import React from "react";
import "./Help.css";
import AOS from "aos";

function Help(){
  return (
    <div className="faqContainer">
      <h1 className="faqTitle animate-character">FAQ</h1>
      <div className="faqWrapper">
      <div class="card  mb-3" style={{maxWidth: "19rem"}}>
        <div class="card-header h5">What is TIETxChange?</div>
        <div class="card-body">

          <p class="card-text">TIETxChange is an online platform designed specifically for students of TIET 
         to buy and sell products. <br /> <br />It allows students to upload and list items they want to sell, 
        making it easy for them to connect with potential buyers within the TIET community.</p>
        </div>
      </div>

      <div class="card  mb-3" style={{maxWidth: "19rem"}}>
        <div class="card-header h5">How can I sign up for TIETxChange?</div>
        <div class="card-body">
          <p class="card-text">To sign up for TIETxChange, you need to visit our website and click on the "Sign Up" button. 
        Fill in the required information, such as your name, email address, and create a secure password. 
        <br /> <br />Once you've completed the registration process, you'll be able to start using TIETxChange.</p>
        </div>
      </div>

      <div class="card  mb-3" style={{maxWidth: "19rem"}}>
        <div class="card-header h5">How do I contact a seller to purchase a product?</div>
        <div class="card-body">
          <p class="card-text">When you find a product you're interested in buying on TIETxChange, 
        you can simply click on the listing to view more details. On the product page, you'll find the contact information of the seller, such as their name and TIET email address. 
        <br></br>You can use this information to reach out to the seller and discuss the purchase further.</p>
        </div>
      </div>

      <div class="card  mb-3" style={{maxWidth: "19rem"}}>
        <div class="card-header h5">How do I contact a seller to purchase a product?</div>
        <div class="card-body">
          <p class="card-text">When you find a product you're interested in buying on TIETxChange, 
        you can simply click on the listing to view more details. On the product page, you'll find the contact information of the seller, such as their name and TIET email address. 
        <br></br>You can use this information to reach out to the seller and discuss the purchase further.</p>
        </div>
      </div>

      
      </div>
    </div>
);

}

export default Help;