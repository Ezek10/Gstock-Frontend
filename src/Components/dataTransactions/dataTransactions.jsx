import React, { useEffect } from "react";
import style from "./dataTransactions.module.css"
import { useDispatch, useSelector } from "react-redux";
import { getTransactionCards, getSuppliers, getClients, getSellers } from "../../Redux/actions";
import { Divider } from "@mui/material";
import CalendarFilters from "../Calendar/CalendarFilters";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import filtroIcon from "../../assets/filtro.png"

const DataTransactions = ({filters, setFilters}) => {

    const cards = useSelector((state) => state.cards) || []; 
    const products = useSelector((state) => state.products) || [];
    const suppliers = useSelector((state) => state.suppliers) || [];
    const clients = useSelector((state) => state.clients) || [];
    const sellers = useSelector((state) => state.sellers) || [];

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSuppliers());
        dispatch(getSellers());
        dispatch(getClients());
    }, [dispatch]);

    useEffect(() => {
        dispatch(getTransactionCards(filters));
    }, [filters, dispatch])

    const toggleHandler = (event) => {
        const { name } = event.target;
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: !prevFilters[name] // Toggle the state of the filter
        }));
    };

    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value === "null" ? null : event.target.value;
        setFilters({...filters, [property]: value})
    }
    
    const resetFilters = () => {
        setFilters({
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
        });
    };

    const capitalizeWords = (str) => {
        return str
            .split(' ') // Divide la cadena en palabras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
            .join(' '); // Une las palabras nuevamente
    };

    return (
        <div className={style.containerTransactions}>
            <img src={filtroIcon} alt="Filtro" style={{display: "flex", alignSelf: "flex-end",height: "37px"}}/>
            <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <button
                    name="filter_by_buy_type"
                    onClick={toggleHandler}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "rgb(201, 201, 201)",
                        color: filters.filter_by_buy_type ? "rgb(141, 141, 141)" : "black",
                        borderColor: "transparent",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            display: "flex",
                            width: "1em",
                            height: "1em",
                            backgroundColor: filters.filter_by_buy_type ? "rgb(141, 141, 141)" : "black",
                            borderRadius: "50%",
                            margin: "5px",
                        }}
                    />
                    Compras
                </button>
                <button
                    name="filter_by_sell_type"
                    onClick={toggleHandler}
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        backgroundColor: "rgb(201, 201, 201)",
                        color: filters.filter_by_sell_type ? "rgb(141, 141, 141)" : "black",
                        borderColor: "transparent",
                        alignItems: "center",
                    }}
                >
                    <span
                        style={{
                            display: "flex",
                            width: "1em",
                            height: "1em",
                            backgroundColor: filters.filter_by_sell_type ? "rgb(141, 141, 141)" : "black",
                            borderRadius: "50%",
                            margin: "5px",
                        }}
                    />
                    Ventas
                </button>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Producto <ArrowDropDownIcon sx={{fontSize: 18}}/></p>
                <select name="filter_by_product" style={{fontSize: 10, textOverflow: "ellipsis"}} value={filters.filter_by_product || ""} onChange={changeHandler} >
                <option value="null"></option>
                { products && products.map( prod => 
                    <option key={capitalizeWords(prod.name)} value={prod.id} style={{margin: "0px"}}>{capitalizeWords(prod.name)}</option>
                )}
                </select>
                <CalendarFilters
                    filters={filters}
                    setFilters={setFilters}
                />
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Proveedor <ArrowDropDownIcon sx={{fontSize: 18}}/></p>
                <select name="filter_by_supplier" style={{fontSize: 12, textOverflow: "ellipsis"}}  value={filters.filter_by_supplier || ""} onChange={changeHandler}>
                    <option value="null"></option>
                    {suppliers ? suppliers.map((suppliers) => (
                        <option key={capitalizeWords(suppliers.name)} value={suppliers.id} style={{margin: "0px"}}>{capitalizeWords(suppliers.name)}</option>
                    )) : null} 
                </select>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Cliente <ArrowDropDownIcon sx={{fontSize: 18}}/></p>
                <select name="filter_by_client" style={{fontSize: 12, textOverflow: "ellipsis"}}  value={filters.filter_by_client || ""} onChange={changeHandler}>
                    <option value="null"></option>
                    {clients ? clients.map((client) => (
                        <option key={capitalizeWords(client.name)} value={client.id} style={{margin: "0px"}}>{capitalizeWords(client.name)}</option>
                    )) : null} 
                </select>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p style={{margin: "0px", display: "flex", flexDirection: "row", alignItems: "center"}}>Vendedor <ArrowDropDownIcon sx={{fontSize: 18}}/></p>
                <select name="filter_by_seller" style={{fontSize: 12, textOverflow: "ellipsis"}}  value={filters.filter_by_seller || ""} onChange={changeHandler}>
                    <option value="null"></option>
                    {sellers ? sellers.map((seller) => (
                        <option key={capitalizeWords(seller.name)} value={seller.id} style={{margin: "0px"}}>{capitalizeWords(seller.name)}</option>
                    )) : null} 
                </select>
                <button
                    style={{
                        height: "29px",
                        borderRadius: "50px",
                        borderColor: "transparent",
                        backgroundColor: "white"
                    }}
                    onClick={resetFilters}
                >
                    Eliminar filtros
                </button>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div className={style.cards}>
                <p style={{margin: "5px 0px 0px 20px", fontWeight: "500"}}>GANANCIAS TOTALES</p>
                <p style={{display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "0px", marginRight: "10px", fontSize: "64px", fontWeight: "800"}}>${cards.earns}</p>
            </div>

            <div className={style.cards}>
                <p style={{margin: "5px 0px 0px 20px", marginLeft: "10px", fontWeight: "500"}}>PRODUCTOS VENDIDOS</p>
                <p style={{display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "0px", marginRight: "10px", fontSize: "64px", fontWeight: "800"}}>{cards.product_sold}</p>
            </div>

            <div className={style.cards}>
                <p style={{margin: "5px 0px 0px 20px", marginLeft: "10px", fontWeight: "500"}}>PRODUCTOS COMPRADOS</p>
                <p style={{display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "0px", marginRight: "10px", fontSize: "64px", fontWeight: "800"}}>{cards.product_bought}</p>
            </div>

            <div className={style.cards}>
                <p style={{margin: "5px 0px 0px 20px", marginLeft: "10px", fontWeight: "500"}}>VENDEDORES</p>   
                <div style={{display: "grid", gridTemplateRows: "repeat(4, 1fr)", gridTemplateColumns: "repeat(2, 1fr)", flexDirection: "column", color: "#8C8C8C", marginLeft: "10px"}}>
                    {cards.sellers ? Object.entries(cards.sellers).map(([key, value])=> (
                        <p key={key} style={{margin: "0px"}}>{key} ({value})</p>
                    )) : ""}          
                </div>   
            </div>

            <div className={style.cards}>
                <p style={{margin: "5px 0px 0px 20px", marginLeft: "10px", fontWeight: "500"}}>CANAL DE VENTA</p>
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