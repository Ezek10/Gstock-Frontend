import React, { useEffect, useState } from "react";
import style from "./Exchange.module.css"
import { Divider, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';

const Exchange = React.forwardRef((props, ref) => {

    const [ exchangeCart, setExchangeCart ] = useState([])
    const [ newProdExchange, setNewProdExchange ] = useState({
            product_name: "",
            buy_price: "",
            color: "",
            serial_id: "",
            battery_percent: 0,
            state: "AVAILABLE",
            observations: "",
    })

    const changeHandler = (event) => {

        if (event) {
            const property = event.target.name
            const value = event.target.value
            setNewProdExchange({...newProdExchange, [property]: value})
            return;
        }

        const updatedCart = [...exchangeCart]
        updatedCart.push(newProdExchange)
        setExchangeCart(updatedCart)
    }

    const deleteFromCart = (index) => {
        const newUpdatedCart = exchangeCart
        newUpdatedCart.splice(index, 1)
        setExchangeCart(newUpdatedCart)
        
        console.log(newUpdatedCart);
    }

    useEffect(() => {
        console.log(exchangeCart);
    }, [exchangeCart])

    const totalBuyPrice = exchangeCart.reduce((total, item) => {
        return total + (parseFloat(item.buy_price || 0));
    }, 0);

    const handleAddExchange = () => {
        props.exchangeCart(exchangeCart);
        // setExchangeCart([])
    };

    return (
        <div ref={ref} className={style.containerExchange} tabIndex={-1}>
            <Button 
                onClick={props.handleCloseExchange}
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
            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Agregar canje</h2>
            <p className={style.letras}>Proveedor Canje</p>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Agregar un producto</h2>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "15px", margin: "12px 10px 12px 0px" }}>
                <p className={style.letras}>Producto</p>
                <input type="text" value={newProdExchange.product_name} onChange={changeHandler} name="product_name"/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "15px", margin: "12px 10px 12px 0px" }}>
                <p className={style.letras}>Cantidad</p>
                <input type="text" />
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "15px", margin: "12px 10px 12px 0px" }}>
                <p className={style.letras}>Precio unitario</p>
                <input type="text" placeholder="$0000"  value={newProdExchange.buy_price} onChange={changeHandler} name="buy_price"/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle}/>

            <div style={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gridTemplateColumns: "repeat(4, 1fr)", gap: "0px", width: "90%" }}>
                <p style={{ marginTop: "5px", marginBottom: "3px", width: "60px"}}>Color</p>
                <p style={{ marginTop: "5px", marginBottom: "3px" }}>IMEI</p>
                <p style={{ marginTop: "5px", marginBottom: "3px" }}>Batería</p>
                <p style={{ marginTop: "5px", marginBottom: "3px" }}>Estado</p>
                <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder="" 
                     value={newProdExchange.color} onChange={changeHandler} name="color"/>
                <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder=""
                    value={newProdExchange.serial_id} onChange={changeHandler} name="serial_id"/>
                <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder=""
                    value={newProdExchange.battery_percent} onChange={changeHandler} name="battery_percent"/>
                <select name="state" onChange={changeHandler}>
                    <option value="AVAILABLE">Disponible</option>
                    <option value="RESERVED">Reservado</option>
                    <option value="DEFECTIVE">Defectuoso</option>
                    <option value="BROKEN">Fallado</option>
                </select>
            </div>
            <input type="text" placeholder="Observaciones" style={{ margin: "0px 0px 10px 0px", width: "86%", borderRadius: "20px"}}
                value={newProdExchange.observations} onChange={changeHandler} name="observations"/>

            <Button 
                variant="outlined" 
                size="small"
                target="_blank"
                style={buttonStyle}
                onClick={() => changeHandler()}>Agregar producto
            </Button>

            <div className={style.cuadroTotal}>
                <p className={style.letras}>TOTAL</p>
                <div id="cart" className={style.cart}>
                {exchangeCart.length > 0 ? (exchangeCart.map((prod, index) => (
                        <div key={index} style={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)", gridTemplateColumns: "repeat(6, 1fr)", alignItems: "center" }}>
                            <div style={{ gridColumn: "span 2" }}>{prod.product_name}</div>
                            <div style={{marginLeft: "15px"}}>{prod.color?.toUpperCase()}</div>
                            <div style={{marginLeft: "15px"}}>{prod.battery_percent}%</div>
                            <div style={{ display: "flex", alignItems: "center", justifySelf: "flex-end" }}>${prod.buy_price}</div>
                            <Button
                                variant="outlined"
                                size="small"
                                target="_blank"
                                onClick={()=> deleteFromCart(index)}
                                sx={{
                                    width: "10px",
                                    height: "10px",
                                    minWidth: 0,
                                    marginLeft: "5px",
                                    padding: "0px",
                                    backgroundColor: "red",
                                    borderColor: "white",
                                    boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.3)",
                                    justifySelf: "center",
                                    '&:hover': {
                                        backgroundColor: "rgb(129, 0, 0)",
                                        borderColor: "white",
                                    }
                                }}>
                                <CloseIcon sx={{fontSize: 10, fontWeight: "bold", color: "white" }}/>
                            </Button>
                        </div>
                    ))) : (<p></p>)}
                </div>
                <h1 className={style.responsiveText}>${totalBuyPrice}</h1>
            </div>

            <Button 
                onClick={handleAddExchange}
                variant="outlined"
                target="_blank"
                style={buttonStyle}> Agregar canje
            </Button>

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
    width:"fit-content",
    paddingX: "4px",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "20px",
    textTransform: 'none',
    color: "white",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

export default Exchange;