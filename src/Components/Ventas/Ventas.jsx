import React, { useEffect, useState } from "react";
import style from "./Ventas.module.css"
import { Divider, Button } from "@mui/material";
import Calendar from "../Calendar/Calendar";
import Payment from "../Payment/Payment";
import TextField from '@mui/material/TextField';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { getProductsStocks } from "../../Redux/actions";
import axios from "axios";
import stock from "../../assets/stock";
import CloseIcon from '@mui/icons-material/Close';
import Exchange from "../Exchange/Exchange";
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';

const Ventas = React.forwardRef((props, ref) => {
    
    const [ sellProduct, setSellProduct ] = useState({
        client: {
            name: "",
            tel: "",
            email: ""
        },
        contact_via: "INSTAGRAM",
        payment_method: "CASH",
        date: Date.now(),
        seller: {
            name: ""
        },
        products: [],
        has_swap: false,
        swap_products: [{
            product_name: "",
            buy_price: ""
        }]
    })

    const [ inStock, setInStock ] = useState([])
    const [ product, setProduct ] = useState({})
    const [ nameProd, setNameProd ] = useState("")
    const [ sellPrice, setSellPrice ] = useState(0)
    const [exchangeProducts, setExchangeProducts] = useState([]);
    const [ imei, setImei ] = useState()
    const [ cart, setCart ] = useState({
        client: {
            name: "",
            tel: "",
            email: ""
        },
        contact_via: "INSTAGRAM",
        payment_method: "CASH",
        date: Date.now(),
        seller: {
            name: ""
        },
        products: [],
        has_swap: false,
        swap_products: [{
            product_name: "",
            buy_price: ""
        }]
    })

    const changeHandler = (event) => {
        const property = event.target.name
        const value = event.target.value

        if (["client","seller", "tel", "email"].includes(property)) {
            if (["client","seller"].includes(property)){
                setSellProduct({...sellProduct, [property]:{name: value}})
            } else {
                console.log(sellProduct);
                setSellProduct({...sellProduct, client:{...sellProduct.client, [property]: value}})
            }
        } else if (property==="contact_via") {
            setSellProduct({...sellProduct, [property]:value})
        } else if (property==="serial_id"){
            const uniqueItem = inStock.filter(item => item.serial_id.includes(value))
            setProduct(uniqueItem[0])
            setImei(value)
            console.log(product);
        } else if (property==="sell_price"){
            setSellPrice(value)
        } else {
            const newCart = [{
                product_name: nameProd,
                id: product.id,
                sell_price: sellPrice
            }]
            if (sellProduct!=="") {
                const updateCart = sellProduct.products.concat(newCart)
                setSellProduct({...sellProduct, products: updateCart})
                setCart({...cart, products: updateCart})
            } else {
                setSellProduct({...sellProduct, products: newCart})
                setCart({...cart, products: newCart})
            }
        }
        console.log(sellProduct);
        return;
    }

    useEffect(() => {
        console.log(product);
    }, [sellProduct])

    const productList = (event) => {
        const prod = stock.result.content
        const value = event.target.value
        setNameProd(value)
        console.log(prod);
        let aux = []
        if (value!=="") {
            const filteredItems = prod.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
            if (filteredItems.length>0) {
                filteredItems.forEach(prod => {aux = aux.concat(prod.stocks)})
                setInStock(aux)
            } 
        } else {
            setInStock(aux)
        }
    }

    const handleDateChange = (selection) => {
        setSellProduct({ ...sellProduct, date: selection.startDate.getTime()});
    }

    const handlePaymentChange = (selection) => {
        console.log(sellProduct);
        setSellProduct({...sellProduct, payment_method: selection});
    }

    const deleteFromCart = (index) => {
        const newUpdatedCart = {...cart}
        newUpdatedCart.products.splice(index, 1)
        setCart(newUpdatedCart)
        console.log(newUpdatedCart);
    }

    const totalBuyPrice = cart.products.reduce((total, product) => {
        return total + (parseFloat(product.sell_price || 0));
    }, 0);

    const [openExchange, setOpenExchange] = useState(false);
    const handleOpenExchange = () => setOpenExchange(true);
    const handleCloseExchange = () => setOpenExchange(false);

    const handleAddExchange = (exchangeCart) => {
        setExchangeProducts([...exchangeProducts, ...exchangeCart]);
        console.log(exchangeProducts);
        const updateCart = sellProduct.products.concat(exchangeProducts)

        setSellProduct({...sellProduct, products: updateCart})
        setCart({...cart, products: updateCart})

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

            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <p className={style.letras}>Cliente</p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "100px" }} value={sellProduct.client.name} onChange={changeHandler} name="client"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p className={style.letras}>Tel</p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "40%"  }} value={sellProduct.client.tel} onChange={changeHandler} name="tel"/>
                    <p className={style.letras}>Email</p>
                    <input type="text" style={{ height: "15px", margin: "12px 10px 12px 10px", width: "40%"  }} value={sellProduct.client.email} onChange={changeHandler} name="email"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div className={style.selector}>
                    <p className={style.letras}>Canal de venta <ArrowDropDownIcon sx={{fontSize: 18}}/></p>
                    <select name="contact_via" onChange={changeHandler} value={sellProduct.contact_via}>
                        <option value="INSTAGRAM">Instagram</option>
                        <option value="FACEBOOK">Facebook</option>
                        <option value="TIKTOK">Tiktok</option>
                        <option value="REFERED">Refered</option>
                        <option value="OTHER">Other</option>
                    </select>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "15px", margin: "12px 10px 12px 0px" }}>
                    <p className={style.letras}>Vendedor</p>
                    <input type="text" value={sellProduct.seller.name} onChange={changeHandler} name="seller"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "15px", margin: "12px 10px 12px 0px" }}>
                    <p className={style.letras}>Producto</p>
                    <input type="text" style={{ margin: "0px 0px 0px 21px" }} value={nameProd} onChange={productList}/> 
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <p className={style.letras}>IMEI</p>
                    <select type="text" value={product.serial_id} onChange={changeHandler} name="serial_id" style={{ height: "19px", margin: "12px 10px 12px 10px", width: "60px", borderRadius: "20px", border: "0px" }}>
                        {inStock?.map(option => (
                            <option key={option.serial_id} value={option.serial_id}>
                                {option.serial_id}
                            </option>
                        ))}
                    </select>
                    <p className={style.letras}>Color </p>
                    <p style={{fontSize: "15px", fontWeight: "bold", alignItems: "center", fontFamily: "Calibri", paddingLeft: "15px"}}>{nameProd ? product.color?.toUpperCase() : ""}</p>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <Calendar onDateChange={handleDateChange}/>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }}>
                    <div style={{ display: "flex", flexDirection: "row", paddingRight: "10%"}}>
                    <p className={style.letras}>Precio Unitario</p>
                    <input type="text" style={{ width: "90px", margin: "12px 10px 12px 10px" }} placeholder="$ 00000" value={sellPrice} onChange={changeHandler} name="sell_price"/>
                    </div>
                    <Payment className={style.payment} payment={handlePaymentChange}/>
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
                    {cart.products?.map((prod, index) => (
                            <div key={index} style={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)", gridTemplateColumns: "repeat(4, 1fr)", flexDirection: "row" }}>
                                <div> {prod.product_name} </div>
                                <div>{prod.color?.toUpperCase()}</div>
                                <div></div>
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
                    <h1 className={style.responsiveText}>${totalBuyPrice}</h1>
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