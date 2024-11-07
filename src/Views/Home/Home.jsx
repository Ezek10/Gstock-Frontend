import React, { useState, useEffect } from "react";
import style from "./Home.module.css";
import Button from '@mui/material/Button';
import Tabs from "../../Components/Tabs/Tabs";
import { useDispatch, useSelector } from "react-redux";
import logoReverse from "../../assets/logoReverse.png";
import { getLogout, getLogo, putLogo } from "../../Redux/actions";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const logo = useSelector((state) => state.logo) || [];

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        getLogout();
        navigate("/");
    };

    const handleImageChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append(
                "file",
                file,
                file.name
            );
            await dispatch(putLogo(formData));
            dispatch(getLogo());
        }
    };

    return (
        <div className={style.container0}>
            <div className={style.container1}>
                <div className={style.header}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
                            <div style={{ marginRight: '1px' }}>
                                <span>Elemento Izquierda</span>
                            </div>
                            <div 
                                style={{ 
                                    border: 'none', 
                                    backgroundColor: 'transparent', 
                                    padding: 0, 
                                    cursor: 'pointer',
                                    position: 'absolute',
                                    top: '5%',
                                    left: '40%',
                                    zIndex: 1000
                                }}
                                onClick={() => navigate("/users")}
                            >
                                <div 
                                    style={{
                                        width: '60px', 
                                        height: '60px', 
                                        borderRadius: '50%',
                                        backgroundColor: 'white',
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        justifyContent: 'center',
                                        boxShadow: '4px 5px 5.5px 0px #0000004D',
                                        position: 'relative'
                                    }}
                                >
                                    <img 
                                        src={`data:image/png;base64,${logo}`}
                                        alt="profile" 
                                        style={{ 
                                            height: "100%", 
                                            width: "100%",
                                            borderRadius: "50%",
                                            objectFit: "scale-down"
                                        }} 
                                    />
                                    {/* Botón para cambiar la imagen */}
                                    <label 
                                        htmlFor="profile-upload"
                                        onClick={(e) => e.stopPropagation()}
                                        style={{
                                            position: 'absolute',
                                            bottom: -5,
                                            right: -5,
                                            backgroundColor: 'black',
                                            borderRadius: '50%',
                                            width: '24px',
                                            height: '24px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            boxShadow: '0px 2px 4px rgba(0,0,0,0.2)',
                                            zIndex: 1001
                                        }}
                                    >
                                        <svg 
                                            width="12" 
                                            height="12" 
                                            viewBox="0 0 24 24" 
                                            fill="white" 
                                            stroke="none"
                                        >
                                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
                                        </svg>
                                    </label>
                                    <input
                                        id="profile-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        onClick={(e) => e.stopPropagation()}
                                        style={{ display: 'none' }}
                                    />
                                </div>
                            </div>
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
                                }}
                            > 
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
    );
};

export default Home;
