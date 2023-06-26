import React from "react";
import AddAvatar from "../img/addAvatar.png";

const Register = () => {
    return (
        <div className="form-container">
            <div className="form-wrapper">
                <form>
                    <input className="input-text" type="text" placeholder="Enter your username" required/>
                    <input className="input-text" type="email" placeholder="Enter your email" required/>
                    <input className="input-text" type="password" placeholder="Enter your password" required/>
                    <input className="input-text" type="password" placeholder="Confirm your password" required/>

                    <input style = {{display:"none"}} type="file" id = "file" className="file-input" />
                    <label htmlFor="file">
                        <img src= {AddAvatar} alt="upload avatar"/>
                        <span>Upload your avatar</span>
                    </label>

                    <button className = "btn-style" type="submit">Start Sending Mail Now</button>

                    <p>Already have an account? <span>Login here</span></p>
                </form>
            </div>
        </div>
    );
}

export default Register;