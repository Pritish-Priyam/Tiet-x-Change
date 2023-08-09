import React from "react";
import "./Card.css"

function CardSkeleton() {
    return (
      <div className="CardContainer">
        <div className="card" style={{ width: "19rem" }}>
          <div className="card-img-top skeleton"></div>
          <div className="card-body">
            <div className="skeleton-title"></div>
            <div className="skeleton-desc"></div>
            <div className="skeleton-insta"></div>
          </div>
        </div>
      </div>
    );
  }

export default CardSkeleton;