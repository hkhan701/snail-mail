import React from "react";
import Logo from "../img/snailmail logo color.svg";
import { Link } from "react-router-dom";

const MainTitle = () => {
    return (
        <div className="main-title">
            <h1 className = "title-style">snailmail</h1>
            <Link to = "/login" className="link">
                <img src= {Logo} alt="snailmail logo"/>
            </Link>
        </div>
    );
}

export default MainTitle;