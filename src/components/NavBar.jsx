import React, { useState } from "react";
import { Link,Route, Routes, Router } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import AuthDetails from "./AuthDetails"; 
import { useNavigate } from 'react-router-dom';

function NavBar(){
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
  
    const [isDataReady, setIsDataReady] = useState(false);
    /*useEffect(() => {
        const fetchData = async () => {
          const db = firebase.database();
          const ref = db.ref(''); // Replace with your database path
          const snapshot = await ref.once('value');
          const data = snapshot.val();
          setData(data);
        };
    
        fetchData();
      }, []); */
 
    const [txt,useText] = useState("Login");
    
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
      };

    ;

    const handleSearchSubmit = (event) => {

        if (searchQuery.trim() !== '') {
            // Perform search logic here and get the search results array
            // const res = filterDataBySearchValue(items,searchQuery); // Pass the results back to the parent component
            // console.log("RESULT: " + filLinks);
            // const matchedLinks = res.map((result) => links[items.indexOf(result)]);
            // console.log("MATCHED LINKS:", filLinks);
            navigate('/search-result', { state: { searchResults: searchQuery } });
          }

         
      };

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
            <Link to="/"><button className="NavBtn" id="txC">T x C</button></Link>
            <div className="search_wrapper">
            <input type="search" placeholder="What are you looking for today!" className="search_bar" 
            onChange={handleSearchChange}
            ></input>
            <button className="search_btn" onClick={handleSearchSubmit}><i className="material-icons">search</i></button>
            </div>

            <AuthDetails />

            <Link to="/upload"><button className="upload_btn"><span>SELL</span></button></Link>
            <div className="extra_icons">
            <button className="NavBtn" title="Cart"><i className="material-icons">shopping_basket</i></button>
            <a href="mailto:priyampritish@gmail.com" title="Contact Me" className="NavBtn"><button className="NavBtn"><i className="material-icons">contact_mail</i>
            </button></a>
        
            <Link to="/help"><button className="NavBtn" id="helper" title="Help"><i className="material-icons" >help</i></button></Link>
            </div>
        </div>
        
          );
}

export default NavBar;