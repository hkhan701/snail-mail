import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";

const Letter = () => {
    const { v4: uuidv4 } = require('uuid');

    const [text, setText] = useState("");
    const [img, setImg] = useState(null);
    const [fileUploaded, setFileUploaded] = useState(false);

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const handleFileChange = (event) => {
        setImg(event.target.files[0]);
        setFileUploaded(true);
    };

    const handleSend = async () => {
        await updateDoc(doc(data.db, "chats", data.chatId), {
            messages: arrayUnion({
                id: uuidv4(),
                senderId: currentUser.uid,
                text,
                timestamp: Timestamp.now()
            })
        });
    };

    return (

        <div className="letter-container">

            <div className="letter-wrapper">

                <div className="letter-header">

                    <div className="upload-img&date">

                        <input type="file" id="file" style={{ display: "none" }} onChange={handleFileChange} />
                        <label htmlFor="file">
                            {fileUploaded ? (
                                <i
                                    className="fa-solid fa-file-circle-check fa-3x"
                                    style={{ color: "#f2b5be", cursor: "pointer" }}
                                ></i>
                            ) : (
                                <i
                                    className="fa-solid fa-file-circle-plus fa-3x"
                                    style={{ color: "#f2b5be", cursor: "pointer" }}
                                ></i>
                            )}
                        </label>
                    </div>

                    <div className="from-to-container">
                        <h1>From</h1>
                        <h1 className="from-to-names">{currentUser.displayName}</h1>
                    </div>

                    <div className="from-to-container">
                        <h1>To</h1>
                        <h1 className="from-to-names">{data.user?.displayName}</h1>
                    </div>

                    <button className="send-letter-btn btn-style" onClick={handleSend}>
                        <i className="fa-solid fa-paper-plane fa-2xs" ></i>
                    </button>

                </div>

                <div className="letter-body">
                    <textarea className="letter-textarea" placeholder="Write your letter here..." onChange={e => setText(e.target.value)}></textarea>
                </div>

            </div>
        </div>
    )
}

export default Letter;