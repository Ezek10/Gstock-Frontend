import React from "react";
import style from "./Login.module.css"
import logo from "../../assets/logoReverse.png"
import googleLogo from "../../assets/googleLogo.png"
import { getLoginGoogle } from "../../Redux/actions";

const Login = () => {
    const handleLoginGoogle = () => {
        getLoginGoogle();
    };

    return (
        <div className={style.containerLogin}>
            <div style={{backgroundColor: "white", display: "flex", width: "fit-content", borderRadius: "200px", justifyContent: "center"}}>
                <img src={logo} alt="logo" style={{ width: "150px", margin: "30px"}} />
            </div>
            <p style={{color: "white", fontSize: "24px"}}>Iniciar sesión</p>
            <button 
                onClick={handleLoginGoogle} 
                style={{borderRadius: "10px", borderColor: "transparent", width: "45px", height: "45px", padding: "0px 1px 0px 1px", cursor: "pointer"}}
            >
                <img src={googleLogo} alt="googleLogo" style={{width: "40px", margin: "0px"}} />
            </button>
        </div>
    );
}


export default Login
