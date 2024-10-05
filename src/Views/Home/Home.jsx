import React from "react";
import style from "./Home.module.css";
import Button from '@mui/material/Button';
import Tabs from "../../Components/Tabs/Tabs"
import logo from "../../assets/logo.png"
import { getLogout } from "../../Redux/actions";

const Home = () => {

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        getLogout();
    };

    return(
        <div className={style.container0}>
            <div className={style.container1}>
                <div className={style.header}>
                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        onClick={handleLogout}
                        sx={{
                            backgroundColor: "white",
                            borderColor: "transparent",
                            borderRadius: "20px",
                            height: "3.5vh",
                            paddingX: "8px",
                            textTransform: 'none',
                            color: "black",
                            marginX: "2rem",
                            '&:hover':{
                                color: "#000",
                                borderColor: "transparent",
                                backgroundColor: "rgb(201, 201, 201)"}
                            }}> 
                            Cerrar sesión
                    </Button>
                </div>
                <Tabs/>
                <div className={style.footer}>
                    <img src={logo} alt="logo" style={{ height: "5vh", marginLeft: "5%" }}/>
                    <div style={{ color: "white", marginLeft: "0.5%", display: "flex", flexDirection: "column" }}>
                        <div style={{margin: "-5px -5px -5px 0px", fontSize: "110%"}}>Gestión</div>
                        <div style={{margin: "-5px -5px -5px 0px", fontSize: "110%"}}> de Stock</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;