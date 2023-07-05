import React, {useState, useEffect} from "react";

const ProfileImg = (props) => {

    const [profileImgExist, setProfileImgExist] = useState(false);

    useEffect(() => {
        if (props.photoURL) {
          setProfileImgExist(true);
        }
    }, [props.photoURL]);

    return (
        <>
            {profileImgExist ? 
                <img src={props.photoURL} alt="profileimg" className="profile-img" /> 
                : 
                <i className="fa-regular fa-user fa-2xl" style={{color: "#e1e0dc", cursor: "pointer"}} ></i>}
        </>
    )
}

export default ProfileImg;

