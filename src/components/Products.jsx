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

function Products() {
  const [items, setItems] = useState([]);
  const [links, setLinks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4; // Change this number as desired
  const [val,setVal] = useState();

  useEffect(() => {
    AOS.init();
    fetchDataAndLinks();
  }, []);

  const fetchDataAndLinks = async () => {
    const dbRef = ref(database);
    const fileRef = Ref(storage, `images/`);

    try {
      const [dataSnapshot, fileResponse] = await Promise.all([
        get(child(dbRef, "UploadResult/")),
        listAll(fileRef).then((response) => Promise.all(response.items.map((item) => getDownloadURL(item))))
      ]);

      const dataItems = [];
      dataSnapshot.forEach((childSnapshot) => {
        if (childSnapshot.exists() && !dataItems.includes(childSnapshot.val())) {
          dataItems.push(childSnapshot.val());
        }
      });

      const filteredLinks = fileResponse.filter((url, index) => url !== null && fileResponse.indexOf(url) === index);

      setItems(dataItems.filter((curr, index) => dataItems.indexOf(curr) === index));
      setLinks(filteredLinks);
    } catch (error) {
      console.error('Error fetching data and image links:', error);
    }
  };

  const getPaginatedItems = (items, currentPage, itemsPerPage) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return items.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const paginatedItems = getPaginatedItems(items, nextPage, itemsPerPage);
  
      // Add a short delay (e.g., 1000ms) before fetching the image URLs
      setTimeout(() => {
        Promise.all(
          paginatedItems.map((item) => getDownloadURL(Ref(storage, item.StorageLink)))
        ).then((linkArray) => {
          setLinks(linkArray);
          setCurrentPage(nextPage);
        });
      }, 100);
    }
  };

  let x = items.length/itemsPerPage;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const paginatedItems = getPaginatedItems(items, prevPage, itemsPerPage);
  
      // Add a short delay (e.g., 1000ms) before fetching the image URLs
      setTimeout(() => {
        Promise.all(
          paginatedItems.map((item) => getDownloadURL(Ref(storage, item.StorageLink)))
        ).then((linkArray) => {
          setLinks(linkArray);
          setCurrentPage(prevPage);
        });
      }, 100);
    }
  };
  

  return (
    <div className="products">
      {getPaginatedItems(items, currentPage, itemsPerPage).map((item, index) => (
        <Card key={index} title={item.ProductName} desc={item.Description} insta={item.Insta} store={links[index]} />
      ))}
      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPage === 1} className="btn bg-light">Prev.</button>
        <button className="btn btn-dark">{currentPage}/{x}</button>
        <button onClick={handleNextPage} className="btn bg-light" disabled={currentPage === Math.ceil(items.length / itemsPerPage)}>Next</button>
      </div>
    </div>
  );
}



export default Products;