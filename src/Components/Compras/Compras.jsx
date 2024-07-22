import React, { useEffect, useState } from "react";
import style from "./Compras.module.css"
import { Divider, Select, MenuItem, FormControl, Button, Box, Popper } from "@mui/material";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Calendar from "../Calendar/Calendar";
import Payment from "../Payment/Payment";

const Compras = React.forwardRef((props, ref) => {

    
    const [ newProduct, setNewProduct ] = useState({
        quantity: 1,
        supplier: {
            name: "",
        },
        payment_method: "CASH",
        date: "",
        products: [{
            product_name: "",
            buy_price: "",
        }],
    })

    const [ cart, setCart ] = useState({
        quantity: 1,
        supplier: {
            name: "",
        },
        payment_method: "CASH",
        date: "",
        products: [],
    })


    const [ errors, setErrors ] = useState({
        quantity: "",
        products: [{
            buy_price: "",
        }],
    })

    useEffect(() => {
        console.log(newProduct);
    }, [newProduct])

    const changeHandler = (event) => {
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
                /// hay un error cad vez que se cambia el precio se añade un producto nuevo y esta aca cone se map
                
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
    }   

    const addProdHandler = () => {
        const updatedCart = {...cart}
        const cartProducts = newProduct.products
        updatedCart.products = updatedCart.products.concat(cartProducts)
        if (updatedCart.products[0].product_name===""){
            updatedCart.products.shift();
        }
        console.log(updatedCart);
        
        setCart(updatedCart)        
        
    }


    const validate = (newProduct) => {
        let newErrors = {}
        const numberRegex = /^\d+$/;
        if((numberRegex.test(newProduct.quantity))){
            setErrors({...errors, quantity:""})
        } else {
            newErrors["quantity"] = "Debe ser un número entero"
        }
        setErrors(newErrors)
    }

    const handleDateChange = (selection) => {
        setNewProduct({ ...newProduct, date: selection.startDate.getTime()});
        setCart({ ...cart, date: selection.startDate.getTime()});
    }

    const handlePaymentChange = (selection) => {
        setNewProduct({...newProduct, payment_method: selection});
        setCart({...cart, payment_method: selection});
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
                }}>X</Button>
            <h2 style={{ fontFamily: 'Calibri', fontSize: "20px", margin: "" }}>Agregar una compra</h2>
            <div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
                    <p className={style.letras}>Proveedor</p>
                    <input type="text" style={{ height: "15px" }} value={newProduct.supplier.name} onChange={changeHandler} name="supplier"/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <Calendar onDateChange={handleDateChange}/>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <Payment className={style.payment} payment={handlePaymentChange}/>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <h2 style={{ fontFamily: 'Calibri', fontSize: "20px" }}>Agregar un producto</h2>
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

                <div>
                    <div style={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gridTemplateColumns: "repeat(4, 1fr)", gap: "0px" }}>
                        <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}>Color</p>
                        <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}>IMEI</p>
                        <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}>Batería</p>
                        <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}>Estado</p>
                        <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder="" />
                        <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder=""/>
                        <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder=""/>
                        <input type="text" style={{ height: "12px", margin: "0px", paddingLeft: "5px" }} placeholder=""/>
                    </div>
                    <input type="text" placeholder="Observaciones" style={{ margin: "0px", width: "87%", borderRadius: "5px"}}/>
                </div>
                
                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    style={buttonStyle}
                    onClick={addProdHandler}>Agregar producto</Button>
                
                <div className={style.cuadroTotal}>
                    <p className={style.letras}>TOTAL</p>
                    <div>

                    </div>
                    <h1 style={{ margin: "0px", fontFamily: 'Calibri', color: "rgb(149, 148, 148)"}}>${newProduct.products.buy_price*newProduct.quantity}</h1>
                </div>

                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    style={buttonStyle}>Finalizar compra</Button>

            </div>
        </div>
    )
})

const buttonStyle = {
    backgroundColor: "black",
    borderColor: "transparent",
    borderRadius: "20px",
    height: "2.5em",
    width:"auto",
    paddingX: "4px",
    marginTop: "5px",
    marginBottom: "5px",
    textTransform: 'none',
    color: "white",
    fontWeight: "bold",
    fontSize: "10px",
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