import React, {useContext} from "react";
import { AuthContext } from "../context/AuthContext";

const Letter = () => {

    const {currentUser} = useContext(AuthContext);

    return (

        <div className="letter-container">

            <div className="letter-wrapper">

                <div className="letter-header">

                    <div className="from-to-container">
                        <h1>From</h1>
                        <h1 className="from-to-names">{currentUser.displayName}</h1>
                    </div>

                    <div className="from-to-container">
                        <h1>To</h1>  
                        <h1 className="from-to-names">Haiqa Khan</h1> 
                    </div>

                    <button className="send-letter-btn btn-style">
                            <i className="fa-solid fa-paper-plane fa-2xs" ></i>
                    </button>
                      
                </div>

                <div className="letter-body">
                        <textarea className="letter-textarea" placeholder="Write your letter here..."></textarea>
                </div>  

            </div>
        </div>
    )
}

export default Letter;