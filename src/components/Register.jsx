import React, { useState } from "react";
import AddAvatar from "../img/addAvatar.png";
import MainTitle from "../components/MainTitle";
import HideAndShowPassword from "../HideAndShowPassword";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, storage, db} from '../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {doc, setDoc} from 'firebase/firestore';

const Register = () => {

    const [error, setError] = useState(false); // error state

    const handleSubmit = async (e) => {
        e.preventDefault();

        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const confirmPassword = e.target[3].value;
        const avatar = e.target[4].files[0];

        console.log(displayName, email, password, confirmPassword, avatar);

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            //Create a unique image name
            const date = new Date().getTime();
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
                            photoURL: downloadURL,
                        });
                
                        // Add user to Firestore
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});

                    })
                    .catch((error) => {
                      // Handle download URL retrieval error
                      console.log("download URL error", error);
                      setError(true);
                    });
                }
              );

        } catch (error) {
            console.log(error);
            setError(true);
        }
    }


    return (
        <>
        <MainTitle></MainTitle>
        <div className="form-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>
                    <input className="input-text" type="text" placeholder="Enter your username" required />
                    <input className="input-text" type="email" placeholder="Enter your email" required />
                    <HideAndShowPassword placeholder="Enter your password"></HideAndShowPassword>
                    <HideAndShowPassword placeholder="Confirm your password"></HideAndShowPassword>

                    <input style={{ display: "none" }} type="file" id="file" className="file-input" />
                    <label htmlFor="file">
                        <img src={AddAvatar} alt="upload avatar" />
                        <span>Upload your avatar</span>
                    </label>

                    <button className="btn-style" type="submit">Start Sending Mail Now </button>
                    {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
                    <p>Already have an account? <span>Login here</span></p>

                </form>
            </div>
        </div>
        </>
    );
}

export default Register;