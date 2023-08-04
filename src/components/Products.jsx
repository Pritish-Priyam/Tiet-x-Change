import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import "./App.css";
import { getDatabase, onValue, ref, get, child } from "firebase/database";
import { database } from "./Firebase";
import AOS from "aos";

function Products(){
        
        const [items, setData] = useState([]);
        const [val,setVal] = useState("");

        useEffect(() => {
        AOS.init();
        //const items = [];
        const dbRef = ref(database);
        

        get(child(dbRef,"UploadResult/"))

        .then((snapshot) => {
            snapshot.forEach(childSnapshot => {
                
                if(childSnapshot.val() !== null && items.includes(childSnapshot.val()) == false)
                {   console.log(childSnapshot.val());
                    setData(prevItems => {
                            return [...prevItems,childSnapshot.val()]});
                }
                setData(items => {
                    return  items.filter((curr,index) => items.indexOf(curr) === index)});
                }) 
                
            })
            
        },
        []);

        
            
        
        
       function createCard(curr,index){
            if(curr != null && curr.ProductName != "" && items.indexOf(curr) === index)
            {   
                return (
                    <Card key={index} title={curr.ProductName} desc={curr.Description} numb={curr.Insta} ></Card>
            );}
        }

        return (
                <div className="products">
                {  
                    items.map(createCard)
                }
                </div>
        );

}

export default Products;