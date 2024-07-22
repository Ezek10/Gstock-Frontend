import React, { useState } from "react";
import style from "./Ventas.module.css"
import { Divider, Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import Calendar from "../Calendar/Calendar";
import Payment from "../Payment/Payment";

const Ventas = React.forwardRef((props, ref) => {

    const [precioTotal, setPrecioTotal] = useState(0)

    const handlePrecioChange = (event) => {
        setPrecioTotal(event.target.value)
    }

    return(
        <div ref={ref} className={style.containerVentas} tabIndex={-1}>
            <Button 
                onClick={props.handleCloseVentas}
                variant="contained" 
                target="_blank"
                sx={{
                    width: "30px",
                    height: "30px",
                    minWidth: "0px",
                    backgroundColor: "black",
                    borderColor: "transparent",
                    borderRadius: "50px",
                    color: "white",
                    position: "absolute",
                    top: "15px",
                    right: "20px",
                    padding: "0px",
                    '&:hover':{
                        color: "#fff",
                        borderColor: "transparent",
                        backgroundColor: "rgb(80, 80, 80)"}
                }}>X
            </Button>

            <h2 style={{ fontFamily: 'Calibri', fontSize: "20px", marginBottom: "10px" }}>Agregar una venta</h2>

            <div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p className={style.letras}>Cliente</p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "100px" }}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p className={style.letras}>Tel</p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "100px"  }}/>
                    <p className={style.letras}>Email</p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "100px"  }}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "15px", margin: "12px 10px 12px 0px" }}>
                    <p className={style.letras}>Canal de venta</p>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "15px", margin: "12px 10px 12px 0px" }}>
                    <p className={style.letras}>Vendedor</p>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "15px" }}>
                    <p className={style.letras}>Producto</p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "100px" }}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p className={style.letras}>IMEI</p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "100px" }}/>
                    <p className={style.letras}>Color</p>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <Calendar/>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
                    <p className={style.letras}>Precio Unitario</p>
                    <input type="text" style={{ height: "15px", width: "90px", margin: "12px 10px 12px 10px" }} placeholder="$ 00000" onChange={handlePrecioChange}/>
                    <Payment/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>
                
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={buttonStyle}>Agregar producto</Button>
                    
                    <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    style={buttonStyle}>Agregar canje</Button>
                </div>
                <div className={style.cuadroTotal}>
                    <p className={style.letras}>TOTAL</p>
                    <div>

                    </div>
                    <h1 style={{ margin: "0px", fontFamily: 'Calibri', color: "rgb(149, 148, 148)"}}>${precioTotal}</h1>
                </div>
                <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={buttonStyle}>Finalizar Venta</Button>
            </div>
        </div>
    )
})

const dividerStyle = {
    borderColor: 'transparent',
    background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
    margin: '1px', 
    padding:"0px", 
    height: "1px", 
    width:"90%"
}

const buttonStyle = {
    backgroundColor: "black",
    borderColor: "transparent",
    borderRadius: "20px",
    height: "2.5em",
    width:"120px",
    paddingX: "4px",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "20px",
    textTransform: 'none',
    color: "white",
    fontWeight: "bold",
    fontSize: "10px",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}


export default Ventas;