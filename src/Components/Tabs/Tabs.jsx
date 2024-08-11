import React, { useState } from "react";
import style from "./Tabs.module.css"
import TablaStock from "../Tablas/tablaStock";
import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const Tabs = () => {

    const [activetab, setActiveTab] = useState(0);
    const seleccionar = (index) => {
        setActiveTab(index);
    }

    const markerPosition = activetab === 0 ? 50 : 0;

    return(
        <div activetab={`${activetab}00%`} className={style.container}>
            <ul className={style.tabs}>
                <li className={activetab==0?"active":""} onClick={()=>seleccionar(0)}> 
                    Stock
                </li>
                <li className={activetab==1?"active":""} onClick={()=>seleccionar(1)}> 
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
                        <div style={{ 
                                display: "flex", 
                                height: "20px",
                                width: "fit-content", 
                                marginLeft: "1.3%",
                                boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)", 
                                paddingLeft: "5px", 
                                paddingRight: "5px", 
                                boxSizing: "border-box", 
                                alignItems: "center",
                                borderRadius: "5px" }}>
                            <p className={style.letras}>Seleccione un producto de la tabla para acceder a los datos del grupo.</p>
                        </div>
                        <div style={{display: "flex"}}>
                            <TablaStock/>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={botonCopiar}>
                                <ContentCopyIcon/>
                            </Button>
                        </div>
                    </div> }
                {activetab===1 && <h1 style={{ fontSize: "24px"}}>En desarrollo...</h1> }
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


export default Tabs;