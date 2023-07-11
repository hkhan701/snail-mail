import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db, storage } from "../firebase";
import { Timestamp, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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

        if (img) {
            const storageRef = ref(storage, uuidv4());
            const uploadTask = uploadBytesResumable(storageRef, img);
        
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                },
                (error) => {
                },
                () => {
                getDownloadURL(uploadTask.snapshot.ref)
                  .then(async (downloadURL) => {
                    await updateDoc(doc(db, "chats", data.chatId), {
                      messages: arrayUnion({
                        id: uuidv4(),
                        text,
                        senderId: currentUser.uid,
                        date: Timestamp.now(),
                        img: downloadURL,
                      }),
                    });
                  })
              }
            );
          } else {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuidv4(),
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
              }),
            });
          }
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