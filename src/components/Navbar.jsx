import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation} from "react-router-dom";
import ProfileImg from "./ProfileImg";

const Navbar = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const isFriendsPage = useLocation().pathname === "/friends"; // Check if the current page is "/friends"
    const isLetterPage = useLocation().pathname === "/send-letter"; // Check if the current page is "/send-letter"

    return (
        <header>
            <div className="navbar-wrapper">

                {(isFriendsPage || isLetterPage) && <i className="fa-solid fa-chevron-left fa-2xl" style={{color: "#e1e0dc", cursor: "pointer"}} onClick={()=> navigate('/')}></i>}
                
                <ProfileImg photoURL = {currentUser.photoURL}/>

            </div>
        </header>
    );
}

export default Navbar;
