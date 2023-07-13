import React from "react";

const PopOutLetter = ({ message, setIsOpenPopup }) => {
  return (
    <div className="popout-letter-background">

      <div className="popout-letter-wrapper">
        <button className="popout-letter-btn btn-style" onClick={setIsOpenPopup.bind(this, false)}>
          <i className="fa-solid fa-xmark fa-2xs"></i>
        </button>

        <div className="popout-letter-header">
          <h1>From Venice, California </h1>
          <h1>Sent on {message.date.toDate().toLocaleDateString()}</h1>

          <div className="popout-letter-text">
            <p>{message.text}</p>
          </div>

          <div className="popout-letter-img">
            {message.img && <img src={message.img} alt="letter" className="attachedimg"/>}
          </div>
        </div>

      </div>
    </div>
  );
};

export default PopOutLetter;