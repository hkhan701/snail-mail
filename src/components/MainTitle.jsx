import React from "react";
import Logo from "../img/snailmail logo color.svg";

const MainTitle = () => {
    return (
        <div class="main-title">
            <h1 class = "title-style">snailmail</h1>
            <img src= {Logo} alt="snailmail logo"/>
        </div>
    );
}

export default MainTitle;