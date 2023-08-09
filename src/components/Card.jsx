import React, { useEffect, useState } from "react";
import "./Card.css";
import AOS from "aos";
import { storage } from "./Firebase";
import { ref as Ref } from "firebase/storage";
import { listAll } from "firebase/storage";
import CardSkeleton from "./CardSkeleton";
import { getDownloadURL } from "firebase/storage";
import Skeleton from "react-loading-skeleton";

function Card(props) {
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState("none");
  const [val, setVal] = useState("Know more");
  const [disp, setDisp] = useState("block");

  useEffect(() => {
    // Simulate content fetching here
    const fetchData = async () => {
      // Replace this with your actual fetching logic
      try {
        const downloadURL = await getDownloadURL(props.store);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [props.store]);
  
  if (loading) {
    return <CardSkeleton />;
  }

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

  return (
    <div className="CardContainer" data-aos="fade-in" data-aos-duration="400" data-aos-delay="0">
      <div className="card" style={{ width: "19rem" }}>
        <img
          src={loading ? "" : props.store}
          className="card-img-top"
          loading="lazy"
          srcSet={loading ? "" : `${props.resized} 880w`}
          alt=""
        />
        <div className="card-body">
          <h5 className="card-title">{props.title || <Skeleton />}</h5>
          <p className="card-text">{props.desc || <Skeleton count={5}/>}</p>
          <p className="card-text" style={{ display: state }}>
            Insta ID: {props.insta}
          </p>
          <button className="btn btn-primary" onClick={dispDesc}>
            {val}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Card;
