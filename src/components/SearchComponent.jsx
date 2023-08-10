import React from 'react';
import "./Card.css";
import { useLocation } from 'react-router';
import { useState, useEffect } from 'react';
import { storage } from "./Firebase";
import { listAll } from "firebase/storage";
import { getDownloadURL } from "firebase/storage";
import { getDatabase, onValue, ref, get, child } from "firebase/database";
import { database } from "./Firebase";
import { useNavigate } from 'react-router-dom';
import { ref as Ref} from "firebase/storage";
import Skeleton from 'react-loading-skeleton';
import CardSkeleton from './CardSkeleton';

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

  useEffect(() => {
    fetchDataAndLinks();
  }, []);

  if (loading) {
    return <CardSkeleton />;
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

  // Apply the filter here based on the search query
  const { filteredData, filteredLinks } = filterDataBySearchValue(items, searchResults);

  return (
    <div className="search-bg">
      <h1 className='res'>Search Results:</h1>
      {loading ? (
        <p className='mx-3' style={{color:"white"}}>Loading ...</p>
      ) : (
        <div className="products">
          {filteredData.map((result, index) => (
            <div class="card" style={{width:"18rem"}}>
              <img src={filteredLinks[index]} class="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{result.title || <Skeleton />}</h5>
                <p className="card-text">{result.desc || <Skeleton count={5}/>}</p>
                <p className="card-text" style={{ display: state }}>
                  Insta ID: {result.insta}
                </p>
                <p>
                  Price: {result.price?`₹ ${result.price}`: `Not specified`} 
                </p>
                <button className="btn btn-primary" onClick={dispDesc}>
                  {val}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
