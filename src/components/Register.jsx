import React from "react";
import { useState } from "react";
import AddAvatar from "../img/addAvatar.png";
import HideAndShowPassword from "../HideAndShowPassword";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getAuth } from "firebase/auth";

const Register = () => {
    const auth = getAuth();
    const [error, setError] = useState(false); // error state
    const handleSubmit = async (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        const avatar = e.target[4].value;

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(true);
        }
        
    }


    return (
        <div className="form-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <input className="input-text" type="text" placeholder="Enter your username" required/>
                    <input className="input-text" type="email" placeholder="Enter your email" required/>
                    <HideAndShowPassword placeholder = "Enter your password"></HideAndShowPassword>
                    <HideAndShowPassword placeholder = "Confirm your password"></HideAndShowPassword>

                    <input style = {{display:"none"}} type="file" id = "file" className="file-input" />
                    <label htmlFor="file">
                        <img src= {AddAvatar} alt="upload avatar"/>
                        <span>Upload your avatar</span>
                    </label>

                    <button className = "btn-style" type="submit">Start Sending Mail Now </button>
                    {error && <span style={{color: "red", marginTop: "10px"}}>Something went wrong!</span>}
                    <p>Already have an account? <span>Login here</span></p>

                </form>
            </div>
        </div>
    );
}

export default Register;