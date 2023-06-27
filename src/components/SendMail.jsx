import React, { useRef } from "react";
import Navbar from "./Navbar";
import UserChats from "./UserChats";

const SendMail = () => {
      
    const searchTermRef = useRef(null);
    const handleSubmit = async (e) => {
        e.preventDefault();
        const searchTerm = searchTermRef.current.value;

        if (searchTerm.trim() !== "") {
            console.log(searchTerm);
        }
        
    };

    return (
        <>
        <Navbar>   
        </Navbar>
        <div className="message-container">
            <div className="message-wrapper message-box">
                <form onSubmit={handleSubmit}>
                    <div className="password-field">
                        <input  ref = {searchTermRef} className="input-text search-input" type="text" placeholder="Find a user" required/>
                        <i className="fa-solid fa-check" style={{color: "#020c17", marginLeft: "-30px", cursor: "pointer"}} onClick={handleSubmit}></i>
                    </div>
                </form>
            </div>
            <UserChats/>
        </div>
        </>
    )
}

export default SendMail;