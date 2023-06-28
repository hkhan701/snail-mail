import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
    return (
        <header>
            <div className="navbar-wrapper">
                <i className="fa-solid fa-chevron-left fa-2xl" style={{color: "#e1e0dc"}}></i>
                <i className="fa-regular fa-user fa-2xl" style={{color: "#e1e0dc", cursor: "pointer"}} onClick={()=> signOut(auth)}></i>
            </div>
        </header>
    );
}

export default Navbar;
