import React from "react";
import MainTitle from "../components/MainTitle";
import HideAndShowPassword from "../HideAndShowPassword";
import Footer from "../components/Footer";

const Login = () => {
    return (
        <>
        <MainTitle/>
        <div className="form-container">
            <div className="form-wrapper">
                <form>
                    <input className="input-text" type="text" placeholder="Enter your username" required/>
                    <HideAndShowPassword placeholder = "Enter your password"></HideAndShowPassword>

                    <button className = "btn-style" type="submit">Login</button>

                    <p>Don't have an account? <span>Sign up now</span></p>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default Login;