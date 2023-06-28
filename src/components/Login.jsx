import React, {useState} from "react";
import MainTitle from "../components/MainTitle";
import HideAndShowPassword from "../HideAndShowPassword";
import Footer from "../components/Footer";
import { useNavigate, Link} from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {

    const [error, setError] = useState(false); // error state
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target[0].value;
        const password = e.target[1].value;

        try {

            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");

        } catch (error) {
            setError(true);
        }
    }

    return (
        <>
        <MainTitle/>
        <div className="form-container">
            <div className="form-wrapper">
                <form onSubmit={handleSubmit}>

                    <input className="input-text" type="text" placeholder="Enter your email" required/>
                    <HideAndShowPassword placeholder = "Enter your password"></HideAndShowPassword>

                    <button className = "btn-style" type="submit">Login</button>
                    {error && <span style={{ color: "red", marginTop: "10px" }}>Something went wrong!</span>}
                    <p>Don't have an account? <Link to = "/register" className="link">Sign up now</Link></p>
                </form>
            </div>
        </div>
        <Footer/>
        </>
    );
}

export default Login;