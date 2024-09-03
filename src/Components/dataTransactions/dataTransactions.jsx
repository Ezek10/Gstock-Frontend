import React, { useEffect, useState } from "react";
import style from "./dataTransactions.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getProductsStocks, getTransactionCards } from "../../Redux/actions";
import { Divider } from "@mui/material";
import Calendar from "../Calendar/Calendar";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import filtroIcon from "../../assets/filtro.png"

const DataTransactions = () => {

    const dispatch = useDispatch()
    const [ filters, setFilters ] = useState({
        page: 1,
        filter_by_buy_type: false, 
        filter_by_sell_type: false, 
        filter_by_product: "", 
        filter_by_specific_date: "", 
        filter_by_start_date: "", 
        filter_by_end_date: "", 
        filter_by_supplier: "", 
        filter_by_client: "", 
        filter_by_seller: ""
    })

    useEffect(() => {
        dispatch(getTransactionCards(filters.page, filters.filter_by_buy_type, filters.filter_by_sell_type, filters.filter_by_product, filters.filter_by_specific_date, filters.filter_by_start_date, filters.filter_by_end_date, filters.filter_by_supplier, filters.filter_by_client, filters.filter_by_seller))
        dispatch(getProductsStocks())
    }, [dispatch])

    const cards = useSelector((state) => state.cards) || []; 
    const products = useSelector((state) => state.products) || [];

    
    
    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        
        if (property==="filter_by_buy_type" || property==="filter_by_sell_type") {            
            setFilters({...filters, [property]: !(filters[property])})          
        } else {
            setFilters({...filters, [property]: value})
            console.log(cards);

        }

    }
    
    return (
        <div className={style.containerTransactions}>
            <img src={filtroIcon} alt="Filtro" style={{display: "flex", alignSelf: "flex-end",height: "37px"}}/>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <button name="filter_by_buy_type" onClick={(e)=>changeHandler(e)} style={{display: "flex", flexDirection: "row", backgroundColor: "rgb(201, 201, 201)", color: filters.filter_by_buy_type ? "rgb(141, 141, 141)" : "black", borderColor: "transparent", alignItems: "center"}}><span style={{display: "flex", width: "1em", height: "1em", backgroundColor: filters.filter_by_buy_type ? "rgb(141, 141, 141)" : "black", borderRadius: "50%", margin: "5px"}}></span>Compras</button>
                <button name="filter_by_sell_type" onClick={(e)=>changeHandler(e)} style={{display: "flex", flexDirection: "row", backgroundColor: "rgb(201, 201, 201)", color: filters.filter_by_sell_type ? "rgb(141, 141, 141)" : "black", borderColor: "transparent", alignItems: "center"}}><span style={{display: "flex", width: "1em", height: "1em", backgroundColor: filters.filter_by_sell_type ? "rgb(141, 141, 141)" : "black", borderRadius: "50%", margin: "5px"}}></span>Ventas</button>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Producto <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <select name="filter_by_product" id="" onChange={(e) => changeHandler(e)}>
                    <option value="">Todos</option>
                    {products ? products.map((prod)=> (
                            <option key={prod.name} style={{margin: "0px"}}>{prod.name}</option>
                        )): ""} 
                </select>
                <Calendar/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Proveedor <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <select name="" id="">
                    <option value="">Todos</option>
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
                <select name="filter_by_seller" id="">
                    <option value={""}>Todos</option>
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
                <div style={{display: "grid", gridTemplateRows: "repeat(4, 1fr)", gridTemplateColumns: "repeat(2, 1fr)", flexDirection: "column", color: "#8C8C8C", marginLeft: "10px"}}>
                    {cards.sellers ? Object.entries(cards.sellers).map(([key, value])=> (
                        <p key={key} style={{margin: "0px"}}>{key} ({value})</p>
                    )) : ""}          
                </div>   
            </div>

            <div className={style.cards}>
                <p style={{margin: "0px", marginLeft: "10px", fontWeight: "500"}}>CANAL DE VENTA</p>
                <div style={{display: "grid", gridTemplateRows: "repeat(4, 1fr)", gridTemplateColumns: "repeat(2, 1fr)", flexDirection: "column", color: "#8C8C8C", marginLeft: "10px"}}>
                    {cards.channels ? Object.entries(cards.channels).map(([key, value])=> (
                        <p key={key} style={{margin: "0px"}}>{key} ({value.toFixed(2)})</p>
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