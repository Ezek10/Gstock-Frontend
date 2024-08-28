import React, { useState } from "react";
import style from "./Home.module.css";
import Button from '@mui/material/Button';
import Tabs from "../../Components/Tabs/Tabs"
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import Compras from "../../Components/Compras/Compras";
import Ventas from "../../Components/Ventas/Ventas";
import logo from "../../assets/logo.png"
 
const Home = () => {

    // const [openCompras, setOpenCompras] = useState(false);
    // const handleOpenCompras = () => setOpenCompras(true);
    // const handleCloseCompras = () => setOpenCompras(false);

    // const [openVentas, setOpenVentas] = useState(false);
    // const handleOpenVentas = () => setOpenVentas(true);
    // const handleCloseVentas = () => setOpenVentas(false);


    return(
        <div className={style.container0}>
            <div className={style.container1}>
                <div className={style.header}>
                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
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
            {/* <div className={style.container2}>
                <input type="text" placeholder="Busca un producto" style={{ width: "60%", height: "25px", borderRadius: "50px" }}/>
                <div style={{ display:"flex", justifyContent: "space-between", width: "100%", padding: "0px 17% 0px 17%", boxSizing: "border-box" }}>
                    <Button 
                        onClick={handleOpenCompras}
                        variant="outlined"
                        target="_blank"
                        style={butonStyle}> + Compra
                    </Button>
                    <Button 
                        onClick={handleOpenVentas}
                        variant="outlined"
                        target="_blank"
                        style={butonStyle}> + Venta
                    </Button>

                    

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openCompras}
                        onClose={handleCloseCompras}
                        closeAfterTransition>
                        <Fade in={openCompras}>
                            <Compras handleCloseCompras={handleCloseCompras}/>
                        </Fade>
                    </Modal>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openVentas}
                        onClose={handleCloseVentas}
                        closeAfterTransition>
                        <Fade in={openVentas}>
                            <Ventas handleCloseVentas={handleCloseVentas}/>
                        </Fade>
                    </Modal>

                </div>
                <div style={{height: "80%", display: "flex", justifyContent: "center"}}>
                    <div style={{fontSize: "20px", display: "flex", width: "90%", alignItems: "center"}}>
                    Seleccione un producto de la tabla para acceder a los datos del grupo.
                    </div>
                </div>
            </div> */}
        </div>
    )
}

const butonStyle = {
    backgroundColor: "black",
    borderColor: "transparent",
    borderRadius: "50px",
    minWidth: "45px",
    height: "2em",
    width:"90px",
    marginLeft: "3%",
    padding: "5px",
    marginRight: "3%",
    textTransform: 'none',
    color: "white",
    boxSizing: "border-box",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

export default Home;