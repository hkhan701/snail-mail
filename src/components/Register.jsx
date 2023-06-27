import React from "react";
import AddAvatar from "../img/addAvatar.png";
import HideAndShowPassword from "../HideAndShowPassword";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../firebase";

const Register = () => {


    const handleSubmit = (e) => {
        e.preventDefault();
        const username = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        const avatar = e.target[4].value;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
        });

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

                    <p>Already have an account? <span>Login here</span></p>
                </form>
            </div>
        </div>
    );
}

export default Register;