import React from "react";
import style from "./Home.module.css";
import Button from '@mui/material/Button';
import Tabs from "../../Components/Tabs/Tabs"
import logo from "../../assets/logo.png"
import { getLogout } from "../../Redux/actions";
import { FiEdit2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        getLogout();
        navigate("/");
    };

//return claude 2.0


    // return hecho con Claude

    return(
        <div className={style.container0}>
            <div className={style.container1}>
                <div className={style.header}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        
                

                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <div style={{ marginRight: '1px' }}>
                                {/* Nuevo elemento en la esquina superior izquierda */}
                                <span>Elemento Izquierda</span>
                            </div>
                            <img 
                                src={logo} 
                                alt="logo" 
                                style={{ 
                                    height: "5vh", 
                                    borderRadius: "50%", // Hacer que la imagen sea circular 
                                    objectFit: "cover" // Asegura que la imagen cubra el área del círculo 
                                }} 
                            />
                            <div 
                                style={{
                                    width: '28px', 
                                    height: '28px', 
                                    borderRadius: '50%', 
                                    backgroundColor: 'red', 
                                    display: 'flex', 
                                    alignItems: 'center', 
                                    justifyContent: 'center', 
                                    cursor: 'pointer' // Cambia el cursor para indicar que es clickeable
                                }}
                                title="Editar foto de perfil"
                            >
                                <FiEdit2 color="black" />
                            </div>
                        </div>




                        <Button 
                            variant="outlined" 
                            size="small"
                            target="_blank"
                            onClick={() => navigate("/")}
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