import React from "react";

const ThankYou = ({ onReset }) => {
  return (
    <div className="thank-you">
      <div className="card">
        <div className="header">
          <div className="image">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                  d="M20 7L9.00004 18L3.99994 13"
                  stroke="#000000"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>{" "}
              </g>
            </svg>
          </div>
          <div className="content">
            <span className="ty-title">Details Submitted successfully</span>
            <p className="message">Thank you for your form submission.</p>
          </div>
          <div className="actions">
            <button className="history" type="button" onClick={onReset}>
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
