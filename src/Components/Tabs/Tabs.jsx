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
// import { IoIosSearch } from "react-icons/io";


const Tabs = () => {

    const [ filters, setFilters ] = useState({
        page: 1,
        filter_by_buy_type: false, 
        filter_by_sell_type: false, 
        filter_by_product: null, 
        filter_by_specific_date: null, 
        filter_by_start_date: null, 
        filter_by_end_date: null, 
        filter_by_supplier: null, 
        filter_by_client: null, 
        filter_by_seller: null
    })

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
                            <div style={{ position: "relative",  display: "flex", alignItems: "center", width: "70%"}}>
                                <input type="text" placeholder="Busca un producto" style={{ height: "25px", marginLeft: 0, marginRight: 0, borderRadius: "50px", fontSize: 15, paddingLeft: 35, width: "100%"}}/>
                                {/* <IoIosSearch style={{position: "absolute", left: "10px", top: "35%", fontSize: "22px"}}/> */}
                            </div>
                            <div style={{ display:"flex", justifyContent: "space-between", width: "70%", boxSizing: "border-box" }}>
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
                            <div style={{ height: "65%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                             <div style={{ fontSize: "15px", textAlign: "center" }}>
                               <strong>Seleccione un producto</strong> de la tabla<br />
                                para acceder a los <strong>datos del grupo</strong>.
                             </div>
                            </div>
                        </div>
                    </div> }
                {activetab===1 && 
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "10px" }}>
                        <div style={{ display: "flex", height: "100%" }}>
                            <TablaTransactions filters={filters}/>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={botonCopiar}>
                                <ContentCopyIcon/>
                            </Button>

                            <div className={style.container2}>
                                <DataTransactions filters={filters} setFilters={setFilters}/>
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
    fontFamily: 'Mukta',
    fontWeight: 400,
    fontSize: 15,
    backgroundColor: "black",
    borderColor: "transparent",
    borderRadius: "50px",
    height: "2em",
    width:"45%",
    overflow: "clip",
    whiteSpace: "nowrap",
    textTransform: 'none',
    color: "white",
    boxSizing: "border-box",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

export default Tabs;