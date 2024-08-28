import React, { useEffect } from "react";
import style from "./dataTransactions.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getTransactionCards } from "../../Redux/actions";
import { Divider } from "@mui/material";
import Calendar from "../Calendar/Calendar";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const DataTransactions = () => {

    const dispatch = useDispatch()

    
    useEffect(() => {
        dispatch(getTransactionCards())
    }, [dispatch])
    const cards = useSelector((state) => state.cards) || []; 
    
    console.log(cards);
    
    return (
        <div className={style.containerTransactions}>
            <div>
                <button>Compras</button>
                <button>Ventas</button>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Producto <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <select name="" id="">
                    {cards.sellers ? Object.entries(cards.sellers).map(([key, value])=> (
                            <option key={key} style={{margin: "0px"}}>{key}</option>
                        )): ""} 
                </select>
                <Calendar/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Proveedor <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <select name="" id="">
                    {cards.sellers ? Object.entries(cards.sellers).map(([key, value])=> (
                            <option key={key} style={{margin: "0px"}}>{key}</option>
                        )) : ""} 
                </select>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Cliente <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <select name="" id="">
                    {cards.sellers ? Object.entries(cards.sellers).map(([key, value])=> (
                            <option key={key} style={{margin: "0px"}}>{key}</option>
                        )) : ""} 
                </select>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Vendedor <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <select name="" id="">
                    {cards.sellers ? Object.entries(cards.sellers).map(([key, value])=> (
                            <option key={key} style={{margin: "0px"}}>{key}</option>
                        )) : ""} 
                </select>
                <button>Eliminar filtros</button>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div className={style.cards}>
                <p style={{margin: "0px", marginLeft: "10px", fontWeight: "500"}}>GANANCIAS TOTALES</p>
                <p style={{display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "0px", marginRight: "10px", fontSize: "64px", fontWeight: "800"}}>${cards.earns}</p>
            </div>

            <div className={style.cards}>
                <p style={{margin: "0px", marginLeft: "10px", fontWeight: "500"}}>PRODUCTOS VENDIDOS</p>
                <p style={{display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "0px", marginRight: "10px", fontSize: "64px", fontWeight: "800"}}>{cards.product_sold}</p>
            </div>

            <div className={style.cards}>
                <p style={{margin: "0px", marginLeft: "10px", fontWeight: "500"}}>PRODUCTOS COMPRADOS</p>
                <p style={{display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "0px", marginRight: "10px", fontSize: "64px", fontWeight: "800"}}>{cards.product_bought}</p>
            </div>

            <div className={style.cards}>
                <p style={{margin: "0px", marginLeft: "10px", fontWeight: "500"}}>VENDEDORES</p>   
                <div style={{display: "flex", flexDirection: "column", color: "#8C8C8C", marginLeft: "10px"}}>
                    {cards.sellers ? Object.entries(cards.sellers).map(([key, value])=> (
                        <p key={key} style={{margin: "0px"}}>{key} ({value})</p>
                    )) : ""}          
                </div>   
            </div>

            <div className={style.cards}>
                <p style={{margin: "0px", marginLeft: "10px", fontWeight: "500"}}>CANAL DE VENTA</p>
                <div style={{display: "flex", flexDirection: "column", color: "#8C8C8C", marginLeft: "10px"}}>
                    {cards.channels ? Object.entries(cards.channels).map(([key, value])=> (
                        <p key={key} style={{margin: "0px"}}>{key} ({value})</p>
                    )) : ""}          
                </div>  
            </div>

        </div>
    )
}

const dividerStyle = {
    borderColor: 'transparent',
    background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
    margin: '1px', 
    padding:"0px", 
    height: "1px", 
    width:"90%",
    '&:hover': {
        cursor: "none"
    }
}

export default DataTransactions;