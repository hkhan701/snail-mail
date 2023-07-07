import React, { useContext, useState} from "react";
import Navbar from "./Navbar";
import UserChats from "./UserChats";
import ProfileImg from "./ProfileImg";
import {collection,query,where,getDocs,setDoc,doc,updateDoc,serverTimestamp,getDoc} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";
import { useNavigate} from "react-router-dom";


const Friends = () => {
  const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [user, setUser] = useState(null);
    const [error, setError] = useState(false);
    const {currentUser} = useContext(AuthContext);

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

    const handleSelect = async () => {
        //check whether the group(chats in firestore) exists, if not create
        const combinedId =
          currentUser.uid > user.uid
            ? currentUser.uid + user.uid
            : user.uid + currentUser.uid;
        try {
          const res = await getDoc(doc(db, "chats", combinedId));
    
          if (!res.exists()) {
            //create a chat in chats collection
            await setDoc(doc(db, "chats", combinedId), { messages: [] });
    
            //create user chats
            await updateDoc(doc(db, "userChats", currentUser.uid), {
              [combinedId + ".userInfo"]: {
                uid: user.uid,
                displayName: user.displayName,
                photoURL: user.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });
    
            await updateDoc(doc(db, "userChats", user.uid), {
              [combinedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [combinedId + ".date"]: serverTimestamp(),
            });

            navigate('/send-letter');
          }
        } catch (err) {}
    
        setUser(null);
        setUsername("")
      };

    return (
        <>
        <Navbar>   
        </Navbar>
        <div className="message-container">
            <div className="message-wrapper message-box user-chats-box">
                <div className="password-field">
                    <input  onChange={(e) => setUsername(e.target.value)} value={username} onKeyDown={handleKey} className="search-input input-text" type="text" placeholder="Send to" required />
                    <i className="fa-solid fa-check" style={{color: "#020c17", marginLeft: "-30px", cursor: "pointer"}} onClick={handleSearch}></i>
                </div>

                {error && <span style={{color: "red"}}>User does not exist</span>}
                {user && <div className="user-chat">

                        <ProfileImg photoURL={user.photoURL}/>

                        <div className="user-chat-info">
                            <h3>{user.displayName}</h3>
                        </div>

                    <button className="send-message-btn btn-style" onClick={handleSelect}>
                        <i className="fa-solid fa-paper-plane fa-xl" ></i>
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

export default Friends;