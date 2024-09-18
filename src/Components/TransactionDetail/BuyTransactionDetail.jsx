import React from "react";
import style from "./BuyTransactionDetail.module.css"
import { Button, Divider } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CalendarTransactions from "../Calendar/CalendarTransactions";
import Payment from "../Payment/Payment";
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';

const BuyTransactionDetail = React.forwardRef(({ handleCloseDetail, transaction, setTransaction, updateTransaction }, ref) => {

    const dispatch = useDispatch()

    const states = ["AVAILABLE", "RESERVED", "DEFECTIVE", "BROKEN"]

    const transactionDetailHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        setTransaction({ ...transaction, [property]: value })
    }

    const updateproductState = (product, itemIndex) => {
        const newState = (states.indexOf(product.state) + 1) % states.length;
        const updatedProducts = { ...transaction };
        updatedProducts.products[itemIndex].state = states[newState]; 
        setTransaction(updatedProducts);
    }


    console.log(transaction);
    

    return (
        <div className={style.containerTransactionDetail}>
            <Button
                onClick={handleCloseDetail}
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
                    '&:hover': {
                        color: "#fff",
                        borderColor: "transparent",
                        backgroundColor: "rgb(80, 80, 80)"
                    }
                }}>X
            </Button>
            <div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h2 style={{ fontSize: "20px", margin: "10px 10px 0px 0px" }}>Datos del grupo</h2>
                    <p style={{ margin: "-10px 10px 0px 0px" }}>Compra</p>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Proveedor <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={transaction.name} name="suppplier" onChange={transactionDetailHandler}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle} />

                <CalendarTransactions 
                // onDateChange={handleDateChange}
                />

                <Divider variant="middle" component="li" sx={dividerStyle} />   

                <Payment/>

                <Divider variant="middle" component="li" sx={dividerStyle} />   

                <h2 style={{ fontSize: "20px", fontWeight: "500",margin: "10px 10px 0px 0px" }}>Producto</h2>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Producto <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={``} name="product"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle} />  

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Cantidad <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={``} name="quantity"/>
                </div>
                
                <Divider variant="middle" component="li" sx={dividerStyle} />  

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Precio Unitario <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={``} name="list_price"/>
                </div>

                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    style={buttonStyle}
                    // onClick={addProdHandler}
                    >Agregar producto
                </Button>

                <div className={style.cuadroTotal}>
                    <p className={style.letras}>TOTAL</p>
                    <div id="cart" className={style.cart}>
                        {transaction.products.length > 0 ? (transaction.products.map((product, index) => (
                            <div key={index} style={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)", gridTemplateColumns: "repeat(6, 1fr)", alignItems: "center" }}>
                                <div style={{ gridColumn: "span 2" }}>{product.product.name}</div>
                                <div style={{marginLeft: "15px"}}>{product.color.toUpperCase()}</div>
                                <div style={{marginLeft: "15px"}}>{product.battery_percent}%</div>
                                <div style={{ display: "flex", alignItems: "center", justifySelf: "flex-end" }}>${product.buy_price}</div>
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
                                        justifySelf: "flex-end",
                                        boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.3)",
                                        '&:hover': {
                                            backgroundColor: "rgb(129, 0, 0)",
                                            borderColor: "white",
                                        }
                                    }}>
                                    <CloseIcon sx={{fontSize: 10, fontWeight: "bold", color: "white" }}/>
                                </Button>

                            </div>)
                            )) : (<p></p>
                        )}
                    </div>
                    <h1 style={{ margin: "0px", color: "rgb(149, 148, 148)"}}>$</h1>
                </div>

                {transaction.products.length > 0 ? (transaction.products.map((product, index) => (
                    <div key={product.product.name+"-"+index}>
                        <p style={{ margin: "0px", fontWeight: "bold" }}>{product.product.name}</p>
                    <div style={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gridTemplateColumns: "25% 25% 25% 25%", gap: "0px" }}>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Color</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>IMEI</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Batería</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Estado</p>
                        <input type="text" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder={product.color}  name="color"/>
                        <input type="text" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder={product.serial_id}  name="serial_id"/>
                        <input type="text" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder={product.battery_percent}  name="battery_percent"/>
                        <button style={{ height: "22px", margin: "0px", width: "88%", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)", borderRadius: "20px", border: "transparent", fontSize: "1.7vh" }} onClick={() => updateproductState(product, index)}>{product.state==="AVAILABLE" ? "Disponible" :  product.state==="RESERVED" ? "Reservado" : product.state==="DEFECTIVE" ? "Fallado" : "Roto" }</button>
                    </div>
                    <input type="text" placeholder="Observaciones" style={{ margin: "0px 0px 10px 0px", width: "92%", borderRadius: "20spx"}}/>
                    <Divider variant="middle" component="li" sx={dividerStyle} />
                </div>))) : (<div></div>) }
            </div>
        </div>
    )
})

const dividerStyle = {
    borderColor: 'transparent',
    background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
    margin: '1px',
    padding: "0px",
    height: "1px",
    width: "90%",
}

const buttonStyle = {
    backgroundColor: "black",
    borderColor: "transparent",
    borderRadius: "20px",
    height: "2.5em",
    minWidth: "100px",
    width: "fit-content",
    paddingX: "4px",
    marginTop: "5px",
    marginBottom: "5px",
    textTransform: 'none',
    color: "white",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

export default BuyTransactionDetail;