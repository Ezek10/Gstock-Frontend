import React from "react";
import style from "./Home.module.css";
import Button from '@mui/material/Button';
import Tabs from "../../Components/Tabs/Tabs"
import logo from "../../assets/logo.png"
import logoReverse from "../../assets/logoReverse.png"
import { getLogout } from "../../Redux/actions";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        getLogout();
        navigate("/");
    };

    return(
<div className={style.container0}>
    <div className={style.container1}>
        <div className={style.header}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                    <div style={{ marginRight: '1px' }}>
                        {/* Nuevo elemento en la esquina superior izquierda */}
                        <span>Elemento Izquierda</span>
                    </div>
                    {/* Botón con círculo blanco que contiene la imagen, posicionado por encima */}
                    <button
                        onClick={() => navigate("/users")}
                        style={{ 
                            border: 'none', 
                            backgroundColor: 'transparent', 
                            padding: 0, 
                            cursor: 'pointer',
                            position: 'absolute', // Posiciona el botón sobre el contenido
                            top: '5%', // Ajusta la distancia desde la parte superior
                            left: '40%', // Ajusta la distancia desde la izquierda
                            zIndex: 1000 // Asegura que esté por encima de otros elementos
                        }}
                    >
                        <div 
                            style={{
                                width: '60px', 
                                height: '60px', 
                                borderRadius: '50%', // Círculo perfecto
                                backgroundColor: 'white', // Fondo blanco
                                display: 'flex', 
                                alignItems: 'center', 
                                justifyContent: 'center', // Centra la imagen dentro del círculo
                                boxShadow: '4px 5px 5.5px 0px #0000004D' // Sombra
                            }}
                        >
                            <img 
                                src={logoReverse} 
                                alt="logoReverse" 
                                style={{ 
                                    height: "70%", 
                                    width: "70%", // Ajusta la imagen dentro del círculo
                                    borderRadius: "0%", // Mantiene la imagen circular
                                    objectFit: "contain" // La imagen no se recorta
                                }} 
                            />
                        </div>
                    </button>
                </div>

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
                        <p>Cerrar sesión</p>
                </Button>
            </div>
        </div>
        <Tabs/>
        <div className={style.footer}>
            <img src={logo} alt="logo" style={{ height: "5vh", marginLeft: "5%", minHeight: 30 }}/>
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