import React from "react";
import Logo from "../img/snailmail logo color.svg";

const MainTitle = () => {
    return (
        <div className="main-title">
            <h1 className = "title-style">snailmail</h1>
            <img src= {Logo} alt="snailmail logo"/>
        </div>
    );
}

export default MainTitle;