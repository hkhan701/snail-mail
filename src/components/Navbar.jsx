import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation} from "react-router-dom";
import ProfileImg from "./ProfileImg";

const Navbar = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const isSendMailPage = useLocation().pathname === "/sendmail"; // Check if the current page is "/sendmail"

    return (
        <header>
            <div className="navbar-wrapper">

                {isSendMailPage && <i className="fa-solid fa-chevron-left fa-2xl" style={{color: "#e1e0dc", cursor: "pointer"}} onClick={()=> navigate('/')}></i>}
                
                <ProfileImg photoURL = {currentUser.photoURL}/>

            </div>
        </header>
    );
}

export default Navbar;
