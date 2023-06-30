import React, { useRef, useState} from "react";
import Navbar from "./Navbar";
import UserChats from "./UserChats";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const SendMail = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);


    const handleSearch = async (e) => { 

            const q = query(collection(db, "users"), where("displayName", "==", username));

            try {
                const querySnapshot = await getDocs(q);
                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
                    console.log(doc.id, " => ", doc.data());
                });

            }catch (err) {
                setError(true);
            }    
    };

    return (
        <>
        <Navbar>   
        </Navbar>
        <div className="message-container">
            <div className="message-wrapper message-box user-chats-box">
                <div className="password-field">
                    <input  onChange={(e) => setUsername(e.target.value)} value={username} className="search-input input-text" type="text" placeholder="Find a user" required />
                    <i className="fa-solid fa-check" style={{color: "#020c17", marginLeft: "-30px", cursor: "pointer"}} onClick={handleSearch}></i>
                </div>

                {error && <span>User does not exist</span>}
                {user && <div className="user-chat">

                    <img src={user.photoURL} alt="profilepic" className="profile-img"/>

                    <div className="user-chat-info">
                        <h3>{user.displayName}</h3>
                    </div>
                </div>}

                <UserChats/>
            </div> 
        </div>
        </>
    )
}

export default SendMail;