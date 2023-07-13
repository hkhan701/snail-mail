import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import ProfileImg from "./ProfileImg";
import { useNavigate } from "react-router-dom";

const UserChats = () => {
    const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const { currentUser } = useContext(AuthContext);
    const { dispatch } = useContext(ChatContext);

    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data());
            });

            return () => {
                unsub();
            };
        };

        currentUser.uid && getChats();
    }, [currentUser.uid]);

    const handleSelect = (user) => {
        dispatch({ type: "CHANGE_USER", payload: user });
        navigate("/send-letter");
    };


    return (
        <>
            <div className="all-chats">
                <div>
                    <h1 className="friends-title">My Friends</h1>
                </div>

                {Object.entries(chats)?.sort((a, b) => b[1].date - a[1].date).map((chat) => (
                    <div className="user-chat">

                        <ProfileImg photoURL={chat[1].userInfo.photoURL} />

                        <div className="user-chat-info">
                            <span>{chat[1].userInfo.displayName}</span>
                        </div>

                        <button className="send-message-btn btn-style" onClick={() => handleSelect(chat[1].userInfo)}>
                            <i className="fa-solid fa-paper-plane fa-xl"></i>
                        </button>
                    </div>
                ))}

            </div>
        </>
    )
}

export default UserChats;