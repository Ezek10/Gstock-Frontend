import React, { useState } from "react";
import style from "./BuyTransactionDetail.module.css"
import { Button , Divider} from "@mui/material";
import Payment from "../Payment/Payment";
import CalendarTransactions from "../Calendar/CalendarTransactions";
import { useDispatch, useSelector } from "react-redux";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { putTransactionSell } from "../../Redux/actions";

const SellTransactionDetail = React.forwardRef(({ handleCloseDetail, transaction, setTransaction, updateTransaction  }, ref) => {

    const [ updatedTransaction, setUpdatedTransaction ] = useState({
        products: Array.isArray(transaction.products) 
        ? transaction.products.flatMap(prod => prod.product) 
        : [],
        type: "SELL",
        seller: transaction.seller,
        client: transaction.client,
        payment_method: "CASH",
        date: transaction.date,
        contact_via: transaction.contact_via,
        swap_products: transaction.swap_products
    })

    const [ newProduct, setNewProduct ] = useState({})

    const stock = useSelector((state) => state.products) || [];   

    const transactionDetailHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        if (property==="client" || property==="cellphone" || property==="email") {
            setUpdatedTransaction({...updatedTransaction, client: {[property]: value} })
        }
        setTransaction({ ...transaction, [property]: value })
    }

    const handleCartChange = (event) => {
        const property = event.target.name
        const value = event.target.value

        if (property==="product_name") {
            setNewProduct({...newProduct, name: value})
        } else {
            setNewProduct({...newProduct, [property]: value })
        } 
    }

    const handleDateChange = (selection) => {
        setUpdatedTransaction({ ...updatedTransaction, date: selection.startDate.getTime()/1000});
    }

    const handlePaymentChange = (selection) => {
        setUpdatedTransaction({...updatedTransaction, payment_method: selection});
    }

    const addProdHandler = () => {

        setUpdatedTransaction({...updatedTransaction, products: [...updatedTransaction.products, newProduct]})
    }

    const deleteFromCart = (index) => {
        const newUpdatedCart = [...updatedTransaction.products]
        newUpdatedCart.splice(index, 1)
        setUpdatedTransaction({...updatedTransaction, products: newUpdatedCart})
    }

    console.log(newProduct.name);
    
    console.log("Transacciones", transaction);
    console.log("STOCK",stock);
    

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
                <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={updatedTransaction.client.name} name="client" onChange={transactionDetailHandler}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                <p className={style.letras}>Tel <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 10px 0px 10px", width: "25%" }} placeholder={updatedTransaction.client.cellphone} name="cellphone" onChange={transactionDetailHandler}/>
                <p className={style.letras}>Email <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px", width: "25%"  }} placeholder={updatedTransaction.client.email} name="email" onChange={transactionDetailHandler}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p className={style.letras}>Canal de venta <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <p className={style.letras}>{transaction.contact_via}</p>
                <CalendarTransactions onDateChange={handleDateChange}/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p className={style.letras}>Vendedor <ArrowRightIcon sx={{fontSize: 18}}/></p>
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

            <h2>Nuevo producto</h2>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                <p className={style.letras}>Product <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <select type="text" name="product_name" value={newProduct.name || ""} onChange={handleCartChange} style={{ fontSize: 12, height: "20px", margin: "12px 10px 12px 10px", width: "80%", borderRadius: "20px", border: "0px", paddingLeft: "10px" }}>
                        <option key={transaction.products.name} value="">Elija un modelo</option>
                        {stock.map((prod) => (
                            prod.stocks.length===0 ? null : <option key={prod.name} value={prod.name}>{prod.name}</option>
                        ))}
                    </select>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p className={style.letras}>IMEI <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <select type="text" value={newProduct.serial_id || ""} onChange={handleCartChange} name="serial_id" style={{ fontSize: 12, height: "20px", margin: "12px 10px 12px 10px", width: "105px", borderRadius: "20px", border: "0px", paddingLeft: "5px" }}>
                        <option key={newProduct.serial_id} value="">Elija un IMEI</option>
                        {stock
                            ?.filter(option => option.name === newProduct.name) // Filtrar por nombre específico
                            .flatMap(option => option.stocks) // Aplanar el arreglo de stocks para acceder a los serial_id
                            .filter(stockItem => stockItem.serial_id !== "" && !transaction.products.some(prod => prod.serial_id?.includes(stockItem.serial_id))) // Filtrar productos con serial_id disponible
                            .map(stockItem => (
                                <option key={stockItem.serial_id} value={stockItem.serial_id}>
                                    {stockItem.serial_id}
                                </option>
                            ))
                        }
                    </select>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <CalendarTransactions/>
            </div>

            <Divider variant="middle" component="li" sx={dividerStyle} />

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
                <p className={style.letras}>Precio Unitario <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder="$0000" name="sell_price" onChange={handleCartChange}/>
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
                            <div style={{ gridColumn: "span 2" }}>{product.name}</div>
                            <div style={{marginLeft: "15px"}}>{product.color ? product.color.toUpperCase() : ""}</div>
                            {/* <div style={{marginLeft: "15px"}}>{product.battery_percent}%</div> */}
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
                // onClick={() => dispatch(putTransactionSell(updateTransaction))}
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