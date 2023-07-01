import React, {useContext, useState, useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const {currentUser} = useContext(AuthContext);
    const [profileImgExist, setProfileImgExist] = useState(false);
    const isSendMailPage = useLocation().pathname === "/sendmail"; // Check if the current page is "/sendmail"

    

    useEffect(() => {
        if (currentUser.photoURL) {
          setProfileImgExist(true);
          console.log(currentUser.photoURL);
        }
      }, [currentUser]);

    return (
        <header>
            <div className="navbar-wrapper">

                {isSendMailPage && <i className="fa-solid fa-chevron-left fa-2xl" style={{color: "#e1e0dc", cursor: "pointer"}} onClick={()=> navigate('/')}></i>}

                {profileImgExist ? <img src={currentUser.photoURL} alt="profileimg" className="profile-img" onClick={()=> signOut(auth)}/> : 
                <i className="fa-regular fa-user fa-2xl" style={{color: "#e1e0dc", cursor: "pointer"}} onClick={()=> signOut(auth)}></i>}

            </div>
        </header>
    );
}

export default Navbar;
