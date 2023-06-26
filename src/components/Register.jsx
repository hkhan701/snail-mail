import React from "react";

const Register = () => {
    return (
        <div className="form-container">
            <div className="form-wrapper">
                <form>
                    <input type="text" placeholder="Enter your username" required/>
                    <input type="email" placeholder="Enter your email" required/>
                    <input type="password" placeholder="Enter your password" required/>
                    <input type="password" placeholder="Confirm your password" required/>
                    <input type="file" />
                    <button type="submit">Start Sending Mail Now</button>
                    <p>Already have an account? Login here</p>
                </form>
            </div>
        </div>
    );
}

export default Register;