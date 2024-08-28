import React, { useState } from "react";
import style from "./Tabs.module.css"
import TablaStock from "../Tablas/tablaStock";
import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TablaTransactions from "../Tablas/tablaTransactions"
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import Compras from "../../Components/Compras/Compras";
import Ventas from "../../Components/Ventas/Ventas";
import DataTransactions from "../dataTransactions/dataTransactions";

const Tabs = () => {

    const [activetab, setActiveTab] = useState(0);
    const seleccionar = (index) => {
        setActiveTab(index);
    }

    const [openCompras, setOpenCompras] = useState(false);
    const handleOpenCompras = () => setOpenCompras(true);
    const handleCloseCompras = () => setOpenCompras(false);

    const [openVentas, setOpenVentas] = useState(false);
    const handleOpenVentas = () => setOpenVentas(true);
    const handleCloseVentas = () => setOpenVentas(false);

    const markerPosition = activetab === 0 ? 50 : 0;

    return(
        <div activetab={`${activetab}00%`} className={style.container}>
            <ul className={style.tabs}>
                <li className={ activetab==0 ? style.active : "" } onClick={()=>seleccionar(0)}> 
                    Stock
                </li>
                <li className={ activetab==1 ? style.active : "" } onClick={()=>seleccionar(1)}> 
                    Transacciones
                </li>
                <span 
                    className={style.activeWindow} 
                    style={{left: `${markerPosition}%`}}>
                </span>
            </ul>
            <div style={{ display: "flex", position: "relative",flexDirection: "column", justifyContent: "flex-start", height: "100%", width: "80%", padding: "1%"}}>
                {activetab===0 && 
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "10px" }}>
                        <div style={{ display: "flex", height: "100%" }}>
                            <TablaStock/>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={botonCopiar}>
                                <ContentCopyIcon/>
                            </Button>
                        </div>
                        <div className={style.container2}>
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
                        </div>
                    </div> }
                {activetab===1 && 
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "10px" }}>
                        <div style={{ display: "flex", height: "100%" }}>
                            <TablaTransactions/>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={botonCopiar}>
                                <ContentCopyIcon/>
                            </Button>

                            <div className={style.container2}>
                                <DataTransactions/>
                            </div>
                        </div>
                    </div> }
            </div>
        </div>
    )
}

const botonCopiar = {
    // position: "absolute",
    backgroundColor: "black",
    borderColor: "transparent",
    borderRadius: "5px",
    color: "white",
    height: "2.3em",
    width: "2.3em",
    minWidth: "0px",
    marginTop: "1.5%",
    boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.4)",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
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

export default Tabs;