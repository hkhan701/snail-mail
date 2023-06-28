import React, {useContext, useState, useEffect} from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {

    const {currentUser} = useContext(AuthContext);
    const [profileImgExist, setProfileImgExist] = useState(false);

    useEffect(() => {
        if (currentUser.photoURL) {
          setProfileImgExist(true);
        }
      }, [currentUser]);

    return (
        <header>
            <div className="navbar-wrapper">
                <i className="fa-solid fa-chevron-left fa-2xl" style={{color: "#e1e0dc"}}></i>

                {profileImgExist ? <img src={currentUser.photoURL} alt="profileimg" className="profile-img" onClick={()=> signOut(auth)}/> : 
                <i className="fa-regular fa-user fa-2xl" style={{color: "#e1e0dc", cursor: "pointer"}} onClick={()=> signOut(auth)}></i>}
                
                {/* <i className="fa-regular fa-user fa-2xl" style={{color: "#e1e0dc", cursor: "pointer"}} onClick={()=> signOut(auth)}></i> */}
            </div>
        </header>
    );
}

export default Navbar;
