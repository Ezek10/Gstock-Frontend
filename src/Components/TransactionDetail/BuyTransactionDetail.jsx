import React, { useState } from "react";
import style from "./BuyTransactionDetail.module.css"
import { Button, Dialog, Divider } from "@mui/material";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CalendarTransactions from "../Calendar/CalendarTransactions";
import Payment from "../Payment/Payment";
import { useDispatch } from "react-redux";
import CloseIcon from '@mui/icons-material/Close';
import { deleteTransaction, putTransactionBuy } from "../../Redux/actions";
import closeConfirm from "../../assets/closeConfirm.png"

const BuyTransactionDetail = React.forwardRef(({ handleCloseDetail, transaction, setTransaction, updateTransaction }, ref) => {
    
    const formatingTransaction = () => {
        const newArray = []
        transaction.products.map(prod => (
            newArray.push({
                battery_percent: prod.battery_percent,
                buy_price: prod.buy_price,
                color: prod.color,
                observations: prod.observations,
                product_name: prod.product.name,
                serial_id: prod.serial_id,
                state: prod.state,
            })
        ))        
        return newArray
    }

    const [openCheck, setOpenCheck] = useState(false);
    const handleOpenCheck = () => setOpenCheck(true)
    const handleCloseCheck = () => setOpenCheck(false);
    
    const dispatch = useDispatch()
    const [ newTransaction, setNewTransaction ] = useState({
        products: formatingTransaction(),
        type: "BUY",
        date: transaction.date,
        payment_method: transaction.payment_method,
        supplier: transaction.supplier,
        id: transaction.id
    })

    const [ newProduct, setNewProduct ] = useState({
        battery_percent: 0,
        buy_price: 0,
        color: "",
        observations: "",
        product_name: "",
        serial_id: "",
        state: "AVAILABLE",
        quantity: 1,
    })


    const states = ["AVAILABLE", "RESERVED", "DEFECTIVE", "BROKEN"]

    const transactionDetailHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        setNewTransaction({ ...transaction, supplier:{name: value} })
    }    

    const updateproductState = (product, itemIndex) => {
        const newState = (states.indexOf(product.state) + 1) % states.length;
        const updatedProducts = { ...transaction };
        updatedProducts.products[itemIndex].state = states[newState]; 
        setTransaction(updatedProducts);
    }

    const handleDateChange = (selection) => {
        setNewTransaction({ ...newTransaction, date: selection.startDate.getTime()/1000});
    }

    const handlePaymentChange = (selection) => {
        setNewTransaction({...newTransaction, payment_method: selection});
    }

    const handleCartChange = (event) => {
        const property = event.target.name
        const value = event.target.value
        setNewProduct({...newProduct, [property]: value })

    }

    const addProdHandler = () => {
        const productsArray = Array(parseInt(newProduct.quantity, 10)).fill(newProduct);
        const oldProducts = formatingTransaction()
        setNewTransaction({...newTransaction, products: [...oldProducts, ...productsArray]})
    }

    const deleteFromCart = (index) => {
        const newUpdatedCart = [...transaction.products]
        newUpdatedCart.splice(index, 1)
        setTransaction({...transaction, products: newUpdatedCart})
    }

    const capitalizeWords = (str) => {
        if (!str) {return str}
        return str
            .split(' ') // Divide la cadena en palabras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
            .join(' '); // Une las palabras nuevamente
    };

    const totalBuyPrice = newTransaction.products.reduce((total, product) => {
        return total + (parseFloat(product.buy_price || 0));
    }, 0);

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
                }}><CloseIcon sx={{fontSize: 15, fontWeight: "bold", color: "white" }}/>
            </Button>
            <div>
                <div style={{display: "flex", flexDirection: "column"}}>
                    <h2 style={{ fontSize: "20px", margin: "10px 10px 0px 0px" }}>Datos del grupo</h2>
                    <p style={{ margin: "-10px 10px 0px 0px" }}>Compra</p>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Proveedor <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={capitalizeWords(transaction.name)} name="supplier" onChange={transactionDetailHandler}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle} />

                <CalendarTransactions onDateChange={handleDateChange}
                />

                <Divider variant="middle" component="li" sx={dividerStyle} />   

                <Payment payment={handlePaymentChange}/>

                <Divider variant="middle" component="li" sx={dividerStyle} />   

                <h2 style={{ fontSize: "15px" }}>Pago Parcial</h2>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "20px", margin: "12px 10px 12px 0px" }}>
                    <p className={style.letras}>Monto <ArrowRightIcon sx={{fontSize: 18}}/></p>
                   {/* <input type="text" style={{ height: "15px", fontSize: 12 }} value={newProduct.supplier.name} onChange={changeHandler} name="supplier"/>*/}
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <h2 style={{ fontSize: "20px", fontWeight: "500",margin: "10px 10px 0px 0px" }}>Producto</h2>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Producto <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={``} name="product_name" onChange={handleCartChange}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle} />  

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Cantidad <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={``} name="quantity" onChange={handleCartChange}/>
                </div>
                
                <Divider variant="middle" component="li" sx={dividerStyle} />  

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Precio Unitario <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={``} name="buy_price" onChange={handleCartChange}/>
                </div>

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
                        {newTransaction.products.length > 0 ? (newTransaction.products.map((product, index) => (
                            <div key={index} style={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)", gridTemplateColumns: "repeat(6, 1fr)", alignItems: "center" }}>
                                <div style={{ gridColumn: "span 2" }}>{capitalizeWords(product.product_name)}</div>
                                <div style={{marginLeft: "15px"}}>{capitalizeWords(product.color)}</div>
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
                    <h1 style={{ margin: "0px", color: "rgb(149, 148, 148)"}}>${totalBuyPrice}</h1>
                </div>

                {newTransaction.products.length > 0 ? (newTransaction.products.map((product, index) => (
                    <div key={product.product_name+"-"+index}>
                        <p style={{ margin: "0px", fontWeight: "bold" }}>{product.product_name}</p>
                    <div style={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gridTemplateColumns: "25% 25% 25% 25%", gap: "0px" }}>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Color</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>IMEI</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Batería</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Estado</p>
                        <input type="text" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder={product.color}  name="color"/>
                        <input type="text" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder={product.serial_id}  name="serial_id"/>
                        <input type="text" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder={product.battery_percent}  name="battery_percent"/>
                        <button style={{ height: "22px", margin: "0px", width: "88%", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)", borderRadius: "20px", border: "transparent", fontSize: "1.7vh", textAlign: "center" }} onClick={() => updateproductState(product, index)}>{product.state==="AVAILABLE" ? "Disponible" :  product.state==="RESERVED" ? "Reservado" : product.state==="DEFECTIVE" ? "Fallado" : "Roto" }</button>
                    </div>
                    <input type="text" placeholder="Observaciones" style={{ margin: "0px 0px 10px 0px", width: "94%", borderRadius: "20spx"}}/>
                    <Divider variant="middle" component="li" sx={dividerStyle} />
                </div>))) : (<div></div>) }

                <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", width: "90%", alignItems: "center"}}>
                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={buttonStyle}
                        onClick={() => dispatch(putTransactionBuy(newTransaction))}
                        >Guardar cambios
                    </Button>

                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={{
                            width: "fit_content",
                            backgroundColor: "red",
                            color: "white",
                            borderColor: "transparent",
                            borderRadius: "20px",
                            textTransform: 'none',
                            height: "2.5em",
                        }}
                        onClick={() => handleOpenCheck()}
                        >Eliminar transacción
                    </Button>
                </div>

                <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openCheck}
                onClose={()=>handleCloseCheck()}
                closeAfterTransition
                disablePortal
                style={{ position: "absolute", display: "flex" }}>
                    <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px", fontSize: "20px", fontWeight: "500", alignItems: "center",}}>
                        <button style={{ position: "absolute", margin: "-5px 0px 0px 0px", right: "15px", top: "10px",height: "25px", width: "25px", borderColor: "transparent", backgroundColor: "transparent", '&:hover': {
                                    cursor: "pointer",
                                }}} onClick={()=>handleCloseCheck()}>
                            <img src={closeConfirm} alt="closeConfirm" style={{width: "25px"}}/>
                        </button>
                        <p style={{display: "flex", margin: "0px", textAlign: "center", marginLeft: "10%",width: "80%", alignItems: "center" }}>¿Quieres eliminar esta transacción de manera permanente?</p>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={buttonStyle}
                                onClick={()=> {dispatch(deleteTransaction(transaction.id));handleCloseCheck()}}>Confirmar
                            </Button>
                        </div>
                    </div>
            </Dialog>
            </div>
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

export default BuyTransactionDetail;