import React from "react";
import "./Card.css"

function CardSkeleton() {
    return (
      <div className="WholeBody">
        <div className="card skeleton" style={{ width: "19rem" }}>
          <div className="card-img-top"></div>
          <div className="card-body skeleton">
            <div className="skeleton-title"></div>
            <div className="skeleton-desc"></div>
            <div className="skeleton-insta"></div>
          </div>
        </div>
      </div>
    );
  }

export default CardSkeleton;