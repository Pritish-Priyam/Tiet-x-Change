import React from 'react';
import "./Card.css";
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { storage } from "./Firebase";
import { listAll } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { getDatabase, onValue, ref, get, child } from "firebase/database";
import { database } from "./Firebase"; 
import { ref as Ref} from "firebase/storage";
import CardSkeleton from './CardSkeleton';
import NavBar from './NavBar';
import Footer from './Footer';

function SearchComponent() {
  const location = useLocation();
  const searchResults = location.state.searchResults;
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [links, setLinks] = useState([]);
  const [state, setState] = useState("none");
  const [val, setVal] = useState("Know more");
  const [disp, setDisp] = useState("block");

  function dispDesc() {
    if (val === "Show less") {
      setVal("Know more");
      setState("none");
      setDisp("block");
    } else {
      setState("block");
      setVal("Show less");
      setDisp("none");
    }
  }

  const fetchDataAndLinks = async () => {
    const dbRef = ref(database);
    const fileRef = Ref(storage, "images/");

    try {
      const dataSnapshot = await get(child(dbRef, "UploadResult/"));
      const dataItems = dataSnapshot.val();

      const fileResponse = await listAll(fileRef);
      const resolvedDownloadURLs = [];

      for (const item of fileResponse.items) {
        try {
          const url = await getDownloadURL(item);
          resolvedDownloadURLs.push(url);
        } catch (error) {
          console.error('Error fetching download URL:', error);
        }
      }

      setItems(Object.values(dataItems));
      setLinks(resolvedDownloadURLs);
      setLoading(false); // Mark loading as complete once both data and links are fetched
    } catch (error) {
      console.error('Error fetching data and image links:', error);
    }
  };

  const filterDataBySearchValue = (data, searchValue) => {
    const filteredData = data.filter((item, index) => {
      const productName = item.ProductName.toLowerCase();
      return productName.includes(searchValue.toLowerCase());
    });
    
    // Filter the links based on the filtered indices
    const filteredLinks = filteredData.map((result) => links[items.indexOf(result)]);
    
    return { filteredData, filteredLinks };
  };

  useEffect(() => {
    fetchDataAndLinks();
  }, []);

  if (loading) {
    return <CardSkeleton />;
  }

  // Apply the filter here based on the search query
  const { filteredData, filteredLinks } = filterDataBySearchValue(items, searchResults);

  return (
    <div className="search-bg" style={{overflowX:"hidden"}}>
      <NavBar />
      {loading ? (
        <p className='mx-3' style={{color:"white"}}>Loading ...</p>
      ) : (filteredData.length == 0? <div className="d-flex py-5 my-5" 
          style={{color:"white",display:"flex",justifyContent:"center",fontSize:"24px",alignItems:"center"}}>
          Oops! No item found.
          </div>  :
        <div className="products" style={{minHeight:"75vh"}}>
          {
          filteredData.map((result, index) => (
            <div class="card" style={{width:"18.5rem",minHeight:"420px"}}>
              <img src={filteredLinks[index]} class="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{result.ProductName}</h5>
                <p className="card-text">{result.Description}</p>
                <p className="card-text" style={{ display: state }}>
                  Insta ID: {result.Insta}
                </p>
                <p>
                  Price: {result.Price?`₹ ${result.Price}`: `Not specified`} 
                </p>
                <button className="btn btn-primary" onClick={dispDesc}>
                  {val}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <Footer style={{position:"relative",top:"10px"}} />
    </div>
  );
}

export default SearchComponent;
