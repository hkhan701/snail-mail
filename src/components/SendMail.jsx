import React, { useState} from "react";
import Navbar from "./Navbar";
import UserChats from "./UserChats";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const SendMail = () => {

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);

    const handleKey = (e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }


    const handleSearch = async (e) => { 
        setError(false);
            const q = query(collection(db, "users"), where("displayName", "==", username));

            try {
                const querySnapshot = await getDocs(q);

                if(querySnapshot.empty) {
                    setError(true);
                    setUser(null);
                    return;
                }

                querySnapshot.forEach((doc) => {
                    setUser(doc.data());
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
                    <input  onChange={(e) => setUsername(e.target.value)} value={username} onKeyDown={handleKey} className="search-input input-text" type="text" placeholder="Find a user" required />
                    <i className="fa-solid fa-check" style={{color: "#020c17", marginLeft: "-30px", cursor: "pointer"}} onClick={handleSearch}></i>
                </div>

                {error && <span style={{color: "red"}}>User does not exist</span>}
                {user && <div className="user-chat">

                        <img src={user.photoURL} alt="profilepic" className="profile-img"/>
                        <div className="user-chat-info">
                            <h3>{user.displayName}</h3>
                        </div>

                    <button className="send-message-btn btn-style">
                        <i className="fa-solid fa-paper-plane fa-xl"></i>
                    </button>

                </div>}

                {user && <div className="divider">

                </div>}

                <UserChats/>
            </div> 
        </div>
        </>
    )
}

export default SendMail;