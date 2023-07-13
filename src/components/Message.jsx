import React, { useContext} from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";


const Message = ({message}) => {

    const { currentUser } = useContext(AuthContext);
    const { data, dispatch } = useContext(ChatContext);

    const handleMessageBoxClick = async () => {
        // if (!message.read) {
        // // Update status to read
        // await updateDoc(doc(db, "chats", data.chatId), {
        //     messages: data.messages.map((msg) =>
        //     msg.id === message.id ? { ...msg, read: true } : msg
        //     ),
        // });

        // // Update context state
        // dispatch({ type: "UPDATE_MESSAGES", payload: data.messages });
        // }
    };


    return (
        <>
        {message.senderId !== currentUser.uid && <div className={`message-box ${message.read ? "" : "unread"}`} onClick={handleMessageBoxClick}>

            <div className="message-info">
                {message.img && <i className="fa-solid fa-image fa-3x" style={{ color: "#f2b5be"}}></i>}
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
