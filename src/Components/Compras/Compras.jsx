import React, { useEffect, useState } from "react";
import style from "./Compras.module.css"
import { Divider, Button, Dialog } from "@mui/material";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Calendar from "../Calendar/Calendar";
import Payment from "../Payment/Payment";
import CloseIcon from '@mui/icons-material/Close';
import axios from "axios";


const Compras = React.forwardRef((props, ref) => {
    
    const [ newProduct, setNewProduct ] = useState({
        quantity: 1,
        supplier: {
            name: "",
        },
        payment_method: "CASH",
        date: Date.now(),
        products: [{
            product_name: "",
            buy_price: "",
            color: "",
            serial_id: "",
            battery_percent: 0,
            state: "AVAILABLE",
            observations: "Sin observaciones",
        }],
    })

    const [ cart, setCart ] = useState({
        quantity: 1,
        supplier: {
            name: "",
        },
        payment_method: "CASH",
        date: Date.now(),
        products: [],
    })

    const [ errors, setErrors ] = useState({
        quantity: "",
        buy_price: "",
    })

    const [openConfirm, setOpenConfirm] = useState(false);
    const handleOpenConfirm = () => setOpenConfirm(true);
    const handleCloseConfirm = () => setOpenConfirm(false);

    useEffect(() => {
    }, [newProduct])

    const changeHandler = (event, index) => {
        const property = event.target.name
        const value = event.target.value

        if (property === "supplier") {
            setNewProduct({...newProduct, supplier:{name: value}})
            setCart({...newProduct, supplier:{name: value}})
            return;
        }

        if (["product_name","buy_price","quantity"].includes(property)) {
            const updatedNewProduct = {... newProduct}

            if (property!=="quantity") {
                const updatedProducts = newProduct.products.map((product) => {
                    return { ...product, [property]: value };
                });
                updatedNewProduct.products = updatedProducts;
            } else {
                validate({...newProduct, [property]: value})
                updatedNewProduct[property] = value;
            }
            if (updatedNewProduct.quantity>0){
                const productsArray = Array(parseInt(updatedNewProduct.quantity, 10)).fill(updatedNewProduct.products[0]);
                updatedNewProduct.products = productsArray;
            } else {
                const productsArray = Array(parseInt(1, 10)).fill(updatedNewProduct.products[0]);
                updatedNewProduct.products = productsArray;
            }
            setNewProduct(updatedNewProduct);            
        }

        if (index>=0) {
            const updateNewProd = cart.products
            updateNewProd[index] = {...updateNewProd[index], [property]: value } 
            setCart({...cart, products: updateNewProd})
        }
    }   

    const addProdHandler = () => {
        const updatedCart = {...cart}
        const cartProducts = newProduct.products
        updatedCart.products = updatedCart.products.concat(cartProducts)
        if (updatedCart.products[0] && updatedCart.products[0].product_name===""){
            updatedCart.products.shift();
        }
        console.log(updatedCart);
        
        setCart(updatedCart)
    }

    const validate = (newProduct) => {
        let newErrors = {}
        const numberRegex = /^\d+$/;
        if(numberRegex.test(newProduct.quantity) && newProduct.quantity > 0){
            setErrors({...errors, quantity:""})
        } else {
            newErrors["quantity"] = "Debe ser un número entero mayor a 0"
        }
        // if(numberRegex.test(newProduct.products.buy_price)){
        //     setErrors({...errors, buy_price:""})
        // } else {
        //     newErrors["buy_price"] = "Ingrese un número válido"
        // }
        setErrors(newErrors)
    }

    const handleDateChange = (selection) => {
        setNewProduct({ ...newProduct, date: selection.startDate.getTime()});
        setCart({ ...cart, date: selection.startDate.getTime()});
    }

    const handlePaymentChange = (selection) => {
        console.log(selection);
        setNewProduct({...newProduct, payment_method: selection});
        setCart({...cart, payment_method: selection});
    }

    const deleteFromCart = (index) => {
        const newUpdatedCart = {...cart}
        newUpdatedCart.products.splice(index, 1)
        setCart(newUpdatedCart)
        console.log(newUpdatedCart);
    }

    const totalBuyPrice = cart.products.reduce((total, product) => {
        return total + (parseFloat(product.buy_price || 0));
    }, 0);

    const submitHandler = async (event) => {
        console.log(errors);
        
        if (Object.values(errors).every((error) => error === "")) {
            try {
                console.log(cart);
                
                await axios.post("https://api.gstock.francelsoft.com/gstock/transaction/buy", cart, {
                    headers: {
                        "Authorization": "admin",}} )
                alert("Compra cargada exitosamente")
                setCart({
                    quantity: 1,
                    supplier: {
                        name: "",
                    },
                    payment_method: "CASH",
                    date: Date.now(),
                    products: [],
                })
                setErrors({
                    quantity: "",
                    buy_price: "",
                })
            } catch(error){
                console.log("error");
                
                window.alert("Error al cargar la compra", error)
            }
        }
    }

    return (
        <div ref={ref} className={style.containerCompras} tabIndex={-1}>
            <Button 
                onClick={props.handleCloseCompras}
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
                }}><CloseIcon/></Button>
            <h2 style={{ fontSize: "20px", margin: "" }}>Agregar una compra</h2>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
                    <p className={style.letras}>Proveedor</p>
                    <input type="text" style={{ height: "15px" }} value={newProduct.supplier.name} onChange={changeHandler} name="supplier"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <Calendar onDateChange={handleDateChange}/>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <Payment className={style.payment} payment={handlePaymentChange}/>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <h2 style={{ fontSize: "20px" }}>Agregar un producto</h2>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
                    <p className={style.letras}>Producto</p>
                    <input type="text" style={{ height: "15px" }} value={newProduct.products.product_name} onChange={changeHandler} name="product_name"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>
                
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
                    <p className={style.letras}>Cantidad</p>
                    <input type="text" style={{ height: "15px" }} placeholder="1" value={newProduct.quantity} onChange={changeHandler} name="quantity"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
                    <p className={style.letras}>Precio Unitario</p>
                    <input type="text" style={{ height: "15px" }} placeholder="$ 00000" value={newProduct.products.buy_price} onChange={changeHandler} name="buy_price"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>
                
                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    style={buttonStyle}
                    onClick={addProdHandler}>Agregar producto
                </Button>
                
                <div className={style.cuadroTotal}>
                    <p className={style.letras}>TOTAL</p>
                    <div id="cart" className={style.cart}>
                        {cart.products.length > 0 ? (cart.products.map((product, index) => (
                            <div key={index} style={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)", gridTemplateColumns: "repeat(6, 1fr)", alignItems: "center" }}>
                                <div style={{ gridColumn: "span 2" }}>{product.product_name}</div>
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
                    <h1 style={{ margin: "0px", color: "rgb(149, 148, 148)"}}>${totalBuyPrice}</h1>
                </div>

                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    onClick={()=>handleOpenConfirm()}
                    style={buttonStyle}>Finalizar compra
                </Button>

                <Dialog
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openConfirm}
                    onClose={()=>handleCloseConfirm()}
                    className={style.confirmationModal}
                    closeAfterTransition
                    disablePortal
                    style={{ position: "absolute", justifyContent: "center", alignItems: "center"}}>
                        <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px"}}>
                            <p style={{margin: "0px"}}>¿Quieres agregar esta compra?</p>
                            {cart.products.length > 0 ? (cart.products.map((product, index) => (
                            <div key={index} style={{marginTop: "5px"}}>
                                <p className={style.letras}>{product.product_name} (${product.buy_price}, {product.color.toUpperCase()}, {product.serial_id}, {product.battery_percent}%, {product.observations})</p>
                            </div>)
                            )) : (<p></p>)}
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={buttonStyle}
                                onClick={()=> {submitHandler();handleCloseConfirm()}}>Confirmar
                            </Button>
                        </div>
                </Dialog>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                {cart.products[0]?.product_name !== "" && cart.products.length > 0 ? (cart.products.map((product, index) => (
                    <div key={product.product_name+"-"+index}>
                        <p style={{ margin: "10px 0px 0px 0px", fontWeight: "bold" }}>{product.product_name}</p>
                    <div style={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gridTemplateColumns: "repeat(4, 1fr)", gap: "0px" }}>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Color</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>IMEI</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Batería</p>
                        <p style={{ marginTop: "5px", marginBottom: "3px" }}>Estado</p>
                        <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder="" value={newProduct.products.color} onChange={e => changeHandler(e, index)} name="color"/>
                        <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder="" value={newProduct.products.serial_id} onChange={e => changeHandler(e, index)} name="serial_id"/>
                        <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder="" value={newProduct.products.battery_percent} onChange={e => changeHandler(e, index)} name="battery_percent"/>
                        <select name="state" onChange={e => changeHandler(e, index)}>
                            <option value="AVAILABLE">Disponible</option>
                            <option value="RESERVED">Reservado</option>
                            <option value="DEFECTIVE">Defectuoso</option>
                            <option value="BROKEN">Fallado</option>
                        </select>
                        {/* <button name="state" onClick={ e => changeState()}>{product.state}</button> */}
                    </div>
                    <input type="text" placeholder="Observaciones" style={{ margin: "0px 0px 10px 0px", width: "86%", borderRadius: "20spx"}}/>
                    {index > newProduct.products.length ? <Divider variant="middle" component="li" sx={dividerStyle}/> : <div></div>}
                </div>))) : (<div></div>) }
        </div>
    )
})

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
    fontWeight: "bold",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

const botonCopiar = {

    backgroundColor: "black",
    borderColor: "transparent",
    borderRadius: "20px",
    height: "2.3em",
    width: "2.3em",
    minWidth: "0px",
    marginLeft: "10px",
    boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.4)",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

const dividerStyle = {
    borderColor: 'transparent',
    background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
    margin: '0px', 
    padding:"0px", 
    height: "1px", 
    width:"90%"
}

export default Compras;