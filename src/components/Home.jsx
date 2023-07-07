import React from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
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

                <button className = "btn-style" onClick={()=> navigate('/friends')}>Send Mail</button>
            </div>
        </div>
        </>
    )
}   

export default Home;