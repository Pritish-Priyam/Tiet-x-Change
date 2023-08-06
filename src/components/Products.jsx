import React from "react";
import Card from "./Card";
import { useState, useEffect } from "react";
import "./App.css";
import { getDatabase, onValue, ref, get, child } from "firebase/database";
import { database } from "./Firebase";
import AOS from "aos";
import { storage } from "./Firebase";
import { ref as Ref} from "firebase/storage";
import { listAll } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";

function Products(){
        
        const [items, setData] = useState([]);
        const [links,setLinks] = useState("");

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

        const fileRef = Ref(storage, `images/`);

        useEffect(() => {
            listAll(fileRef).then((response) => {
                response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setLinks((prev) => [...prev,url]);
                })
            })
         })
        },[]);

        
        /*const getFileDownloadURL = async (fileName) => {
            
          
            try {
              const downloadURL = await getDownloadURL(fileRef);
              console.log('File download URL:', downloadURL);
              // Use the downloadURL to display the file or perform further actions
              return downloadURL;
            } catch (error) {
              console.error('Error getting download URL:', error);
              return null;
            }
          };   */
        
        
       function createCard(curr,index){
            if(curr != null && curr.ProductName != "" && items.indexOf(curr) === index)
            {  
                //const x = getFileDownloadURL(curr.StorageLink);
                return (
                    <Card key={index} title={curr.ProductName} desc={curr.Description} insta={curr.Insta}
                    store={links[index]} ></Card>
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