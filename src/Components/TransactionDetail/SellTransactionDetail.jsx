import React, { useState } from "react";
import style from "./BuyTransactionDetail.module.css"
import { Button , Divider} from "@mui/material";
import Payment from "../Payment/Payment";
import CalendarTransactions from "../Calendar/CalendarTransactions";
import { useDispatch } from "react-redux";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { putTransactionSell } from "../../Redux/actions";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const SellTransactionDetail = React.forwardRef(({ handleCloseDetail, transaction, setTransaction, updateTransaction  }, ref) => {

    const [ newProduct, setNewProduct ] = useState({
        battery_percent: 0,
        buy_price: 0,
        product: {
            name: "",
            list_price: 0
        },
        serial_id: "",
        state: "AVAILABLE",
    })

    const transactionDetailHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        setTransaction({ ...transaction, [property]: value })
    }

    const handleCartChange = (event) => {
        const property = event.target.name
        const value = event.target.value

        if (property==="product" || property==="list_price") {
            setNewProduct({...newProduct, product: {[property]: value} })
        } else {
            setNewProduct({...newProduct, [property]: value })
        }
        console.log(newProduct);
    }

    const handleDateChange = (selection) => {
        setTransaction({ ...newProduct, date: selection.startDate.getTime()/1000});
    }

    const handlePaymentChange = (selection) => {
        setTransaction({...newProduct, payment_method: selection});
    }

    const addProdHandler = () => {
        setTransaction({...transaction, products: [...transaction.products, newProduct]})
    }

    const deleteFromCart = (index) => {
        const newUpdatedCart = [...transaction.products]
        newUpdatedCart.splice(index, 1)
        setTransaction({...transaction, products: newUpdatedCart})
    }

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
                <h2 style={{ fontSize: "20px", margin: "10px 10px 0px 0px" }}>Datos de la transacción</h2>
                <p style={{ margin: "-10px 10px 0px 0px" }}>Venta</p>
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                <p className={style.letras}>Cliente <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={transaction.name} name="client" onChange={transactionDetailHandler}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                <p className={style.letras}>Tel <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 10px 0px 10px", width: "25%" }} placeholder={transaction.name} name="tel" onChange={transactionDetailHandler}/>
                <p className={style.letras}>Email <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px", width: "25%"  }} placeholder={transaction.name} name="email" onChange={transactionDetailHandler}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p className={style.letras}>Canal de venta <ArrowDropDownIcon sx={{fontSize: 18}}/></p>
                <p className={style.letras}>{transaction.contact_via}</p>
                <CalendarTransactions onDateChange={handleDateChange}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p className={style.letras}>Cliente <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <p className={style.letras}>{transaction.seller.name}</p>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <Payment payment={handlePaymentChange}/>
                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    style={buttonStyle}
                    // onClick={addProdHandler}
                    >Agregar canje
                </Button>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <h2>Producto</h2>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                <p className={style.letras}>Product <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={transaction.name} name="product" onChange={handleCartChange}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p className={style.letras}>IMEI <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={transaction.serial_id} name="serial_id" onChange={handleCartChange}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <CalendarTransactions/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p className={style.letras}>Precio Unitario <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={transaction.name} name="sell_price" onChange={handleCartChange}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <Button 
                variant="outlined" 
                size="small"
                target="_blank"
                style={buttonStyle}
                onClick={addProdHandler}
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
                            <div style={{ display: "flex", alignItems: "center", justifySelf: "flex-end" }}>${product.sell_price}</div>
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

            <Button 
                variant="outlined" 
                size="small"
                target="_blank"
                style={buttonStyle}
                onClick={() => putTransactionSell(dispatch(transaction))}
                >Guardar cambios
            </Button>

        </div>
    )
})

const dividerStyle = {
    borderColor: 'transparent',
    background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
    margin: '5px',
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

export default SellTransactionDetail;