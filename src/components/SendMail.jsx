import React from "react";
import Navbar from "./Navbar";

const SendMail = () => {
    return (
        <>
        <Navbar>   
        </Navbar>
        <div className="message-container">
            <div className="message-wrapper message-box">
                <form>
                <input className="input-text search-input" type="text" placeholder="Find a user"/>
                </form>
            </div>
        </div>
        </>
    )
}

export default SendMail;