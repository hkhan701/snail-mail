import React from "react";
import Navbar from "./Navbar";

const Home = () => {
    return (
        <>
        <Navbar>   
        </Navbar>
        <div className="message-container">

            <div class="message-wrapper">

                <div class="messages-header">
                    <h1 class = "message-title title-style">you have mail ()</h1>
                </div>

                <div class="message-gallery">
                    <div class="message-box">

                    </div>
                    <div class="message-box">
                        
                    </div>
                    <div class="message-box">
                        
                    </div>
                    <div class="message-box">
                        
                    </div>
                    <div class="message-box">
                        
                    </div>
                    <div class="message-box">
                        
                    </div>
                    <div class="message-box">
                        
                    </div>
                    <div class="message-box">
                        
                    </div>
                    <div class="message-box">
                        
                    </div>
                </div>

                <button class = "btn-style">Send Mail</button>
            </div>
        </div>
        </>
    )
}   

export default Home;