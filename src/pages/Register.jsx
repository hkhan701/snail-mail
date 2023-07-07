import React, { useState } from "react";
import AddAvatar from "../img/addAvatar.png";
import MainTitle from "../components/MainTitle";
import Footer from "../components/Footer";
import HideAndShowPassword from "../HideAndShowPassword";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {doc, setDoc} from 'firebase/firestore';
import {auth, storage, db} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useNavigate, Link} from "react-router-dom";

const Register = () => {

    const [error, setError] = useState(false); // error state
    const [loading, setLoading] = useState(false); // loading state
    const [passwordMatchError, setPasswordMatchError] = useState(false); // error state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        setLoading(true);
        setError(false);
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        const avatar = e.target[4].files[0];

        if (password !== confirmPassword) {
            setPasswordMatchError(true);
            return;
        }

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            // const date = new Date().getTime();
            const storageRef = ref(storage, displayName);
            
            const uploadTask = uploadBytesResumable(storageRef, avatar);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                },
                (error) => {
                  // Handle unsuccessful uploads
                  console.log("upload error", error);
                  setError(true);
                },
                () => {
                  // Upload completed successfully, now get the download URL
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then(async (downloadURL) => {

                        // Update profile
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: avatar ? downloadURL : null, // if avatar is uploaded, set photoURL to downloadURL, else set to null
                        });
                
                        // Add user to Firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: avatar ? downloadURL : null,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate('/');

                    })
                    .catch((error) => {
                      // Handle download URL retrieval error
                      setLoading(false);
                      setError(true);
                    });
                }
              );
                
        } catch (error) {
            setError(true);
            setLoading(false);
        }
    }


    return (
        <>
        <MainTitle/>
        <div className="form-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <input className="input-text" type="text" placeholder="Enter your username" required />
                    <input className="input-text" type="email" placeholder="Enter your email" required />
                    <HideAndShowPassword placeholder="Enter your password"/>
                    <HideAndShowPassword placeholder="Confirm your password"/>

                    <input style={{ display: "none" }} type="file" id="file" className="file-input" />
                    <label htmlFor="file">
                        <img src={AddAvatar} alt="upload avatar" />
                        <span>Upload your avatar</span>
                    </label>

                    <button className="btn-style" type="submit">Start Sending Mail Now  <span></span>       
                    {loading && <i className="fa-solid fa-circle-notch fa-spin fa-lg"></i>}</button>

                    {error && <span style={{ color: "red", marginTop: "10px" }}>
                        <i className="fa-solid fa-triangle-exclamation fa-xl" style= {{color: "#ff0000"}}></i>             Something went wrong!
                    </span>}
                    {passwordMatchError && <span style={{ color: "red", marginTop: "10px" }}>
                        <i className="fa-solid fa-triangle-exclamation fa-xl" style= {{color: "#ff0000"}}></i>             Passwords do not match!
                    </span>}

                    <p>Already have an account? <Link to = "/login" className="link">Login here</Link></p>

                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default Register;