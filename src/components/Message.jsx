import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { updateDoc, doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import PopOutLetter from "./PopOutLetter";


const Message = ({ message }) => {

    const { currentUser } = useContext(AuthContext);
    const { data, dispatch } = useContext(ChatContext);
    const [messages, setMessages] = useState([]);
    const [isOpenPopup, setIsOpenPopup] = useState(false);


    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
            if (doc.exists()) {
                setMessages(doc.data().messages);
            }
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);

    const handleMessageBoxClick = async () => {
        if (!message.read) {
            const updatedMessages = messages?.map((msg) =>
                msg.id === message.id ? { ...msg, read: true } : msg
            );

            // Update status to read in Firestore
            await updateDoc(doc(db, "chats", data.chatId), {
                messages: updatedMessages,
            });

            // Update context state with the updated messages array
            dispatch({ type: "UPDATE_MESSAGES", payload: updatedMessages });
        }

        setIsOpenPopup(true);
    };


    return (
        <>

            {isOpenPopup && <PopOutLetter message={message} setIsOpenPopup={setIsOpenPopup} />}

            {message.senderId !== currentUser.uid && <div className={`message-box ${message.read ? "" : " unread"}`} onClick={handleMessageBoxClick}>

                <div className="message-info">
                    {message.img && <i className="fa-solid fa-image fa-3x" style={{ color: "#f2b5be" }}></i>}
                </div>

                <div className="from-to-container">
                    <h1>From</h1>
                    <h1 className="from-to-names">{data.user.displayName}</h1>
                </div>

            </div>}
        </>
    );

};

export default Message;
