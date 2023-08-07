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
        const [links,setLinks] = useState([]);

        useEffect(() => {
            AOS.init();
            const dbRef = ref(database);
            const fileRef = Ref(storage, `images/`);
          
            // Fetch data and image links concurrently using Promise.all
            Promise.all([
              get(child(dbRef, "UploadResult/")).then((snapshot) => {
                const dataItems = [];
                snapshot.forEach((childSnapshot) => {
                  if (childSnapshot.val() !== null && !dataItems.includes(childSnapshot.val())) {
                    dataItems.push(childSnapshot.val());
                  }
                });
                return dataItems;
              }),
              listAll(fileRef).then((response) => {
                const linkPromises = response.items.map((item) => getDownloadURL(item));
                return Promise.all(linkPromises);
              }),
            ])
              .then(([dataItems, linkArray]) => {
                // Update state with the fetched data and links
                setData(dataItems.filter((curr, index) => dataItems.indexOf(curr) === index));
                setLinks(linkArray.filter((url, index) => url !== null && linkArray.indexOf(url) === index));
              })
              .catch((error) => {
                console.error('Error fetching data and image links:', error);
              });
          }, []);
        
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