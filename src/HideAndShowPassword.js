import React, { useState } from "react";
import "./App.css";

function HideAndShowPassword(props){
    const [show,setShow]=useState(false)
    const handleShow=()=>{
        setShow(!show)
    }
    return(
        <div className="password-field">
            <input className="input-text" type={show?"text":"password"} placeholder={props.placeholder} required/>
            <i className={show?"far fa-eye":"fa fa-eye-slash"} id="togglePassword" style={{marginLeft: "-30px"}} onClick={handleShow}>  </i>
        </div>      
    );
}
export default HideAndShowPassword;