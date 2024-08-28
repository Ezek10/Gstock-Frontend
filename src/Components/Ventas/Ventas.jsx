import React, { useEffect, useState } from "react";
import style from "./Ventas.module.css"
import { Divider, Button, Dialog } from "@mui/material";
import Calendar from "../Calendar/Calendar";
import Payment from "../Payment/Payment";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { getProductsStocks } from "../../Redux/actions";
import axios from "axios";
import CloseIcon from '@mui/icons-material/Close';
import Exchange from "../Exchange/Exchange";
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from "react-redux";
import check from "../../assets/check.png" 
import closeConfirm from "../../assets/closeConfirm.png"

const Ventas = React.forwardRef((props, ref) => {

    const [ errors, setErrors ] = useState({        
    })

    const [ inStock, setInStock ] = useState([])
    const [ product, setProduct ] = useState({})
    const dispatch = useDispatch()
    const [ sellPrice, setSellPrice ] = useState(0)
    const [exchangeProducts, setExchangeProducts] = useState([]);
    const [ cart, setCart ] = useState({
        client: {
            name: "",
            tel: "",
            email: ""
        },
        type: "SELL",
        contact_via: "INSTAGRAM",
        payment_method: "CASH",
        date: Date.now(),
        seller: {
            name: ""
        },
        products: [],
        has_swap: false,
        swap_products: []
    })

    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        let aux = []
        if (["client","seller", "tel", "email"].includes(property)) {
            
            if (["client","seller"].includes(property)){
                // setSellProduct({...sellProduct, [property]:{name: value}})
                setCart({...cart, [property]:{name: value}})
            } else {
                // setSellProduct({...sellProduct, client:{...sellProduct.client, [property]: value}})
                setCart({...cart, client:{...cart.client, [property]: value}})
            }
        } else if (property==="contact_via") {
            // setSellProduct({...sellProduct, [property]:value})
            setCart({...cart, [property]:value})
        } else if (property==="serial_id"){
            const uniqueItem = inStock.filter(item => item.serial_id.includes(value))
            setProduct({ ...product, ...uniqueItem[0] })
        } else if (property==="sell_price"){
            setSellPrice(value)
        } else if (property==="product_name") {
            aux = stocks.filter(item => item.name === value)
            
            setInStock(aux[0].stocks)
            setProduct({...product, product_name: value})
            
        } else {
            const newCart = [{
                product_name: product.product_name,
                id: product.id,
                sell_price: sellPrice,
                color: product.color,
                serial_id: product.serial_id,
                battery_percent: product.battery_percent
            }]
            
            if (cart!=="") {
                const updateCart = cart.products.concat(newCart)
                setCart({...cart, products: updateCart})
            } else {
                setCart({...cart, products: newCart})
                setInStock({})
            }
        }

        return;
    }

    useEffect(() => {
        dispatch(getProductsStocks())
    }, [dispatch])

    const stocks = useSelector((state) => state.products) || [];

    const handleDateChange = (selection) => {
        setCart({ ...cart, date: selection.startDate.getTime()});
    }

    const handlePaymentChange = (selection) => {
        setCart({...cart, payment_method: selection});
    }

    const deleteFromCart = (index) => {
        const newUpdatedCart = {...cart}
        newUpdatedCart.products.splice(index, 1)
        setCart(newUpdatedCart)
    }

    const deleteFromExchangeCart = (index) => {
        const newUpdatedCart = {...cart}
        newUpdatedCart.swap_products.splice(index, 1)
        setCart(newUpdatedCart)
        console.log(newUpdatedCart);
    }
    
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleOpenConfirm = () => setOpenConfirm(true);
    const handleCloseConfirm = () => setOpenConfirm(false);

    const [openCheck, setOpenCheck] = useState(false);
    const handleOpenCheck = () => {
        setOpenCheck(true)};
        setTimeout(() => {
            setOpenCheck(false)
        }, 3000)
    const handleCloseCheck = () => setOpenCheck(false);

    const [openExchange, setOpenExchange] = useState(false);
    const handleOpenExchange = () => setOpenExchange(true);
    const handleCloseExchange = () => setOpenExchange(false);
    
    const handleAddExchange = (exchangeCart) => {
        setExchangeProducts(prevExchangeProducts => {
            const newExchangeProducts = [...prevExchangeProducts, ...exchangeCart];
            setCart(prevCart => {
                const updateCart = [...prevCart.swap_products, ...newExchangeProducts];
                return {...prevCart, swap_products: updateCart, has_swap: true};
            });
        return newExchangeProducts;
        });
    } 

    console.log(cart);
    
    const totalBuyPrice = () => {
        let swap = 0
        
        if (!cart.swap_products) {
            swap = 0
        } else {
            swap = cart.swap_products.reduce((total, product) => {
                return total + (parseFloat(product.buy_price || 0));
            }, 0);
        }
        
        return cart.products.reduce((total, product) => {
            return total + (parseFloat(product.sell_price || 0));
        }, 0) - swap
        
    }
    
    const submitHandler = async (event) => {
        
        if (Object.values(errors).every((error) => error === "")) {
            try {
                console.log(cart);
                
                await axios.post("https://api.gstock.francelsoft.com/gstock/transaction/sell", cart, {
                    headers: {
                        "Authorization": "admin",}} )
                setCart({
                    client: {
                        name: "",
                        tel: "",
                        email: ""
                    },
                    type: "SELL",
                    contact_via: "INSTAGRAM",
                    payment_method: "CASH",
                    date: Date.now(),
                    seller: {
                        name: ""
                    },
                    products: [],
                    has_swap: false,
                    swap_products: []
                })
                setErrors({
                    quantity: "",
                    buy_price: "",
                })
            } catch(error){
                console.log("error");
                
                window.alert("Error al cargar la venta", error)
            }
        }
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

            <h2 style={{ fontSize: "20px", marginBottom: "10px" }}>Agregar una venta</h2>

            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p className={style.letras}>Cliente <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "100px" }} value={cart.client.name ? cart.client.name : ""} onChange={changeHandler} name="client"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p className={style.letras}>Tel <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "40%"  }} value={cart.client.tel || ""} onChange={changeHandler} name="tel"/>
                    <p className={style.letras}>Email <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "40%"  }} value={cart.client.email || ""} onChange={changeHandler} name="email"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div className={style.selector}>
                    <p className={style.letras}>Canal de venta <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <select name="contact_via" onChange={changeHandler} value={cart.contact_via}>
                        <option value="INSTAGRAM">Instagram</option>
                        <option value="FACEBOOK">Facebook</option>
                        <option value="TIKTOK">Tiktok</option>
                        <option value="REFERED">Refered</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "20px", margin: "12px 10px 12px 0px" }}>
                    <p className={style.letras}>Vendedor <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" value={cart.seller.name || ""} onChange={changeHandler} name="seller"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p className={style.letras}>Producto <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <select type="text" name="product_name" value={product.product_name || ""} onChange={changeHandler} style={{ height: "20px", margin: "12px 10px 12px 10px", width: "180px", borderRadius: "20px", border: "0px", paddingLeft: "10px" }}>
                        <option key={product.product_name} value="">Elija un modelo</option>
                        {stocks.map((prod) => (
                            <option key={prod.name} value={prod.name}>{prod.name}</option>
                        ))}
                    </select>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "44px"}}>
                    <p className={style.letras}>IMEI <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <select type="text" value={product.serial_id || ""} onChange={changeHandler} name="serial_id" style={{ height: "20px", margin: "12px 10px 12px 10px", width: "105px", borderRadius: "20px", border: "0px", paddingLeft: "5px" }}>
                        <option key={product.serial_id} value="">Elija un IMEI</option>
                        {inStock?.map(option => (
                             option.serial_id==="" || cart.products.some(prod => prod.serial_id.includes(option.serial_id)) ? null : <option key={option.serial_id} value={option.serial_id}>
                                 {option.serial_id}
                                </option> 
                             ))
                            }
                    </select>
                    <p className={style.letras}>Color <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <p style={{ alignItems: "center", paddingLeft: "15px"}}>{product.color?.toUpperCase()}</p>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <Calendar onDateChange={handleDateChange}/>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p style={{display: "flex", alignItems: "center", width: "9vw", margin: "0px" }}>Precio Unitario <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="text" style={{ width: "4vw", margin: "0px 10px 0px -10px" }} placeholder="$ 00000" value={sellPrice || 0} onChange={changeHandler} name="sell_price"/>
                    </div>
                    <Payment style={{display: "flex", justifyContent: "flex-end"}} payment={handlePaymentChange}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>
                
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={buttonStyle}
                        onClick={changeHandler}>Agregar producto
                    </Button>
                    
                    <Button 
                        onClick={handleOpenExchange}
                        variant="outlined"
                        target="_blank"
                        style={buttonStyle}> Agregar canje
                    </Button>

                    <Modal
                        aria-labelledby="transition-modal-title"
                        aria-describedby="transition-modal-description"
                        open={openExchange}
                        onClose={handleCloseExchange}
                        closeAfterTransition>
                        <Fade in={openExchange}>
                            <Exchange handleCloseExchange={handleCloseExchange} exchangeCart={handleAddExchange}/>
                        </Fade>
                    </Modal>

                </div>
                <div className={style.cuadroTotal}>
                    <p className={style.letras}>TOTAL</p>
                    <div id="cart" className={style.cart}>
                    {cart.products.map((prod, index) => (                        
                            <div key={index} style={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)", gridTemplateColumns: "repeat(6, 1fr)", flexDirection: "row" }}>
                                <div style={{ gridColumn: "span 2" }}>{prod.product_name}</div>
                                <div>{prod.serial_id}</div>
                                <div>{prod.color?.toUpperCase()} </div>
                                <div> {prod.battery_percent}%</div>
                                <div style={{marginRight: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>${prod.sell_price}
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
                                        '&:hover': {
                                            backgroundColor: "rgb(129, 0, 0)",
                                            borderColor: "white",
                                        }
                                    }}>
                                    <CloseIcon sx={{fontSize: 10, fontWeight: "bold", color: "white" }}/>
                                </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                    {cart.swap_products?.length > 0 ? <div id="cart" className={style.cart}>
                        {cart.swap_products?.map((prod, index) => (
                            <div key={index} style={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)", gridTemplateColumns: "repeat(6, 1fr)", flexDirection: "row" }}>
                                <div style={{ gridColumn: "span 2" }}> {prod.product_name} </div>
                                <div>{prod.serial_id}</div>
                                <div>{prod.color?.toUpperCase()}</div>
                                <div>{prod.battery_percent}%</div>
                                <div style={{marginRight: "20px", display: "flex", alignItems: "center", justifyContent: "flex-end" }}>-${prod.buy_price}
                                <Button 
                                    variant="outlined" 
                                    size="small"
                                    target="_blank"
                                    onClick={()=> deleteFromExchangeCart(index)}
                                    sx={{
                                        width: "10px",
                                        height: "10px",
                                        minWidth: 0,
                                        marginLeft: "5px",
                                        padding: "0px",
                                        backgroundColor: "red",
                                        borderColor: "white",
                                        boxShadow: "1px 1px 0px rgba(0, 0, 0, 0.3)",
                                        '&:hover': {
                                            backgroundColor: "rgb(129, 0, 0)",
                                            borderColor: "white",
                                        }
                                    }}>
                                    <CloseIcon sx={{fontSize: 10, fontWeight: "bold", color: "white" }}/>
                                </Button>
                                </div>
                            </div>
                        ))}
                    </div> : <div></div>}
                    <h1 className={style.responsiveText}>${totalBuyPrice()}</h1>
                </div>
                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    onClick={()=>handleOpenConfirm()}
                    style={buttonStyle}>Finalizar Venta
                </Button>

                <Dialog
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openConfirm}
                    onClose={()=>handleCloseConfirm()}
                    className={style.confirmationModal}
                    closeAfterTransition
                    disablePortal
                    style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
                        <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "11px 15px 11px 15px"}}>
                            <div style={{display: "flex", justifyContent: "space-evenly", height: "20px"}}>
                                <p style={{marginTop: "-5px", fontWeight: "500", fontSize: "20px"}}>¿Quieres agregar esta venta?</p>
                                <button style={{ marginTop: "-5px",height: "25px", width: "25px", borderColor: "transparent", backgroundColor: "transparent", '&:hover': {
                                            cursor: "pointer",
                                        }}} onClick={()=>handleCloseConfirm()}>
                                    <img src={closeConfirm} alt="closeConfirm" style={{width: "25px"}}/>
                                </button>
                            </div>
                            {cart.products.length > 0 ? (cart.products.map((product, index) => (
                            <div key={index} style={{marginTop: "5px"}}>
                                <p style={{fontWeight: "300", fontSize: "14px"}}>{product.product_name} (${product.sell_price}, {product.color?.toUpperCase()}, {product.serial_id}, {product.battery_percent}%, {product.state}{product.observations ? `, ${product.observations}` : ""})</p>
                            </div>)
                            )) : (<p></p>)}
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <Button 
                                    variant="outlined" 
                                    size="small"
                                    target="_blank"
                                    style={buttonStyle}
                                    onClick={()=> {submitHandler();handleOpenCheck(), handleCloseConfirm(), props.handleCloseVentas()}}>Confirmar
                                </Button>
                            </div>
                        </div>
                </Dialog>

                <Dialog
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openCheck}
                    onClose={()=>handleCloseCheck()}
                    closeAfterTransition
                    disablePortal
                    style={{ position: "absolute", display: "flex" }}>
                        <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px", fontSize: "20px", fontWeight: "500", alignItems: "center",}}>
                            <p style={{margin: "0px", textAlign: "center"}}>La venta fue agregada</p>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img src={check} alt="Check" style={{height: "43px", display: "grid", alignSelf: "center"}}/>
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
    margin: '1px', 
    padding:"0px", 
    height: "1px", 
    width:"90%",
    '&:hover': {
        cursor: "none"
    }
}

const buttonStyle = {
    backgroundColor: "black",
    borderColor: "transparent",
    fontSize: "15px",
    borderRadius: "20px",
    height: "2.2em",
    width:"fit-content",
    paddingX: "4px",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "20px",
    textTransform: 'none',
    alignItems: "center",
    color: "white",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}


export default Ventas;