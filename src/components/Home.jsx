import React from "react";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
        <Navbar>   
        </Navbar>
        <div className="message-container">

            <div className="message-wrapper">

                <div className="messages-header">
                    <h1 className = "message-title title-style">you have mail ()</h1>
                </div>

                <div className="message-gallery">
                    <div className="message-box">

                    </div>
                    <div className="message-box">
                        
                    </div>
                    <div className="message-box">
                        
                    </div>
                    <div className="message-box">
                        
                    </div>
                    <div className="message-box">
                        
                    </div>
                    <div className="message-box">
                        
                    </div>
                    <div className="message-box">
                        
                    </div>
                    <div className="message-box">
                        
                    </div>
                    <div className="message-box">
                        
                    </div>
                </div>

                <button className = "btn-style">Send Mail</button>
            </div>
        </div>
        </>
    )
}   

export default Home;