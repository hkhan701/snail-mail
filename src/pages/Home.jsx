import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Message from "../components/Message";
import { useNavigate } from "react-router-dom";
import { ChatContext } from "../context/ChatContext";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";


const Home = () => {
    const navigate = useNavigate();
    const { data } = useContext(ChatContext);
    const { currentUser } = useContext(AuthContext);

    const [messages, setMessages] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {

            if (doc.exists()) {
                const chatData = doc.data();
                setMessages(chatData.messages);
                const filteredMessages = chatData.messages.filter(
                    (message) =>
                        message.senderId !== currentUser.uid
                );

                const unreadMessages = chatData.messages.filter(
                    (message) =>
                        message.senderId !== currentUser.uid && !message.read
                );
                setMessages(filteredMessages);
                setUnreadCount(unreadMessages.length);
            }
        });

        return () => {
            unSub();
        };
    }, [data.chatId]);


    return (
        <>
            <Navbar>
            </Navbar>
            <div className="message-container">

                <div className="message-wrapper">

                    <div className="messages-header">
                        <h1 className="message-title title-style">you have mail ({unreadCount})</h1>
                    </div>

                    <div className="message-gallery">

                        {messages
                            ?.sort((a, b) => b.date - a.date) // Sort messages by date in descending order
                            .map((message) => (
                                <Message message={message} key={message.id} />
                            ))}

                    </div>

                    <button className="btn-style" onClick={() => navigate('/friends')}>Send Mail</button>
                </div>
            </div>
        </>
    )
}

export default Home;