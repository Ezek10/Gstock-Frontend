import React, { useEffect, useState } from "react";
import style from "./Compras.module.css"
import { Divider, Button, Dialog } from "@mui/material";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import CalendarTransactions from "../Calendar/CalendarTransactions";
import Payment from "../Payment/Payment";
import CloseIcon from '@mui/icons-material/Close';
import { postBuyTransaction, getProductsStocks, getSuppliers } from "../../Redux/actions";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import check from "../../assets/check.png"
import closeConfirm from "../../assets/closeConfirm.png"
import { useDispatch } from "react-redux";


const Compras = React.forwardRef((props, ref) => {
  const dispatch = useDispatch()
  const [newProduct, setNewProduct] = useState({
    quantity: 1,
    supplier: {
      name: "",
    },
    payment_method: "CASH",
    partial_payment: "",
    date: Date.now(),
    products: [{
      product_name: "",
      buy_price: null,
      color: "",
      serial_id: null,
      battery_percent: 100,
      state: "AVAILABLE",
      observations: null,
      sell_price: null,
    }],
  })

  const [cart, setCart] = useState({
    quantity: 1,
    supplier: {
      name: "",
    },
    payment_method: "CASH",
    partial_payment: null,
    date: Date.now(),
    products: [],
  })

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => {
    if (!cart.supplier.name) {
      alert("Falta Proveedor")
      return
    }
    if (cart.products.length < 1) {
      alert("Faltan Productos")
      return
    }
    setOpenConfirm(true);
  }
  const handleCloseConfirm = () => setOpenConfirm(false);

  const [openCheck, setOpenCheck] = useState(false);
  const handleOpenCheck = () => {
    setOpenCheck(true);
    setTimeout(() => {
      setOpenCheck(false)
      props.handleCloseCompras();
    }, 500)
  };

  const handleCloseCheck = () => setOpenCheck(false);

  const states = ["AVAILABLE", "RESERVED", "DEFECTS", "BROKEN"]

  const changeHandler = (event, index) => {
    const property = event.target.name
    let value = event.target.value === "" ? null : event.target.value

    // change products properties
    if (index >= 0 && property !== "supplier") {
      const updateNewProd = cart.products
      updateNewProd[index] = { ...updateNewProd[index], [property]: value }
      setCart({ ...cart, products: updateNewProd })
    }

    // change supplier 
    if (property === "supplier") {
      setNewProduct({ ...newProduct, supplier: { name: value } })
      // setCart({ ...newProduct, supplier: { name: value } })
      return;
    }

    const updatedNewProduct = { ...newProduct }

    if (property === "quantity") {
      updatedNewProduct[property] = value > 0 ? value : "";
    } else {
      const updatedProducts = newProduct.products.map((product) => {
        return { ...product, [property]: value };
      });
      updatedNewProduct.products = updatedProducts;
    }
    if (updatedNewProduct.quantity > 0) {
      const productsArray = Array(parseInt(updatedNewProduct.quantity)).fill(updatedNewProduct.products[0]);
      updatedNewProduct.products = productsArray;
    }
    setNewProduct(updatedNewProduct);
  }

  const changeSellPrice = (event, index) => {
    let value = event.target.value;
    if(/^0/.test(value)) {
      value = value.replace(/^0+/, '');
    }
    // Actualiza `newProduct`
    const updatedNewProduct = {
      ...newProduct,
      products: newProduct.products.map((product, idx) =>
        idx === index ? { ...product, sell_price: value } : product
      ),
    };
  
    setNewProduct(updatedNewProduct);
  
    // Actualiza `cart`
    const updatedCart = {
      ...cart,
      products: cart.products.map((product, idx) =>
        idx === index ? { ...product, sell_price: value } : product
      ),
    };
  
    setCart(updatedCart);
  };

  const addProdHandler = () => {
    const updatedCart = { ...cart }
    updatedCart.supplier.name = newProduct.supplier.name
    updatedCart.supplier.name = newProduct.supplier.name
    const cartProducts = newProduct.products
    if (cartProducts[0].product_name === "" || cartProducts[0].buy_price < 1) {
      return
    }
    updatedCart.products = updatedCart.products.concat(cartProducts)
    if (updatedCart.products[0] && updatedCart.products[0].product_name === "") {
      updatedCart.products.shift();
    }
    setCart(updatedCart)
  }

  const handleDateChange = (selection) => {
    setNewProduct({ ...newProduct, date: selection.startDate.getTime() / 1000 });
    setCart({ ...cart, date: selection.startDate.getTime() / 1000 });
  }

  const handlePaymentChange = (selection) => {
    setNewProduct({ ...newProduct, payment_method: selection });
    setCart({ ...cart, payment_method: selection });
  }

  // keep for partial payment
  const handlePartialPaymentChange = (event) => {
    const value = event.target.value;
    setNewProduct({ ...newProduct, partial_payment: value });
    setCart({ ...cart, partial_payment: value });
  }

  const deleteFromCart = (index) => {
    const newUpdatedCart = { ...cart }
    newUpdatedCart.products.splice(index, 1)
    setCart(newUpdatedCart)
  }

  const totalBuyPrice = cart.products.reduce((total, product) => {
    return total + (parseFloat(product.buy_price || 0));
  }, 0);

  const updateproductState = (product, itemIndex) => {
    const newState = (states.indexOf(product.state) + 1) % states.length;
    const updatedProducts = { ...cart };
    updatedProducts.products[itemIndex].state = states[newState];
    setCart(updatedProducts);
  }

  const finishBuy = async (event) => {
    submitHandler();
    handleOpenCheck();
    handleCloseConfirm();
  }

  const submitHandler = async (event) => {
    try {
      // Creamos un nuevo objeto "transactionData" que incluye el valor de "partial_payment"
      const transactionData = {
        ...cart,
        partial_payment: parseFloat(cart.partial_payment),
        buy_price: parseFloat(cart.buy_price)
      };

      await postBuyTransaction(transactionData)

      // Actualizar el estado de "TablaStock"
      await dispatch(getProductsStocks())
      await dispatch(getSuppliers())

    } catch (error) {
      window.alert("Error al cargar la compra", error)
    }
  };

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
          borderRadius: "50px",
          color: "white",
          position: "absolute",
          top: "15px",
          right: "20px",
          padding: "0px",
          '&:hover': {
            color: "#fff",
            backgroundColor: "rgb(80, 80, 80)"
          }
        }}><CloseIcon sx={{ fontSize: 15, fontWeight: "bold", color: "white" }} /></Button>
      <h2 style={{ fontSize: "20px", margin: "" }}>Agregar una compra</h2>

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
        <p className={style.letras}>*Proveedor <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
        <input type="text" style={{ height: "15px", fontSize: 12 }} value={newProduct.supplier.name} onChange={changeHandler} name="supplier" />
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <CalendarTransactions onDateChange={handleDateChange} />

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <Payment className={style.payment} payment={handlePaymentChange} />

      {/*
                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <h2 style={{ fontSize: "15px" }}>Pago Parcial</h2>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "20px", margin: "12px 10px 12px 0px" }}>
                    <p className={style.letras}>Monto <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <input type="number" style={{ height: "15px", fontSize: 12 }} value={newProduct.partial_payment} placeholder="$ 00000" onChange={handlePartialPaymentChange} name="partial_payment"/>
                </div>
                */}

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <h2 style={{ fontSize: "20px" }}>Agregar un producto</h2>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
        <p className={style.letras}>*Producto <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
        <input type="text" style={{ height: "15px", fontSize: 12 }} value={newProduct.products.product_name} onChange={changeHandler} name="product_name" />
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
        <p className={style.letras}>*Cantidad <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
        <input 
          type="number" 
          style={{ height: "15px", fontSize: 12 }} 
          value={newProduct.quantity} 
          onChange={(e) => {
            e.preventDefault()
            if(/^0/.test(e.target.value)) {
              return
            }
            changeHandler(e)
          }} 
          name="quantity" 
        />
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh" }}>
        <p className={style.letras}>*Precio Unitario<ArrowRightIcon sx={{ fontSize: 18 }} /></p>
        <input 
          type="number" 
          style={{ height: "15px", fontSize: 12 }} 
          placeholder="$ 00000" 
          value={newProduct.products.buy_price} 
          onChange={changeHandler} name="buy_price" 
        />
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />
      <p style={{ fontSize: 3 }}> </p>
      <Button
        variant="outlined"
        size="small"
        target="_blank"
        style={buttonStyle}
        onClick={addProdHandler}>Agregar producto
      </Button>
      <p style={{ fontSize: 3 }}> </p>

      <div className={style.cuadroTotal}>
        <p className={style.letras}>TOTAL</p>
        <div id="cart" className={style.cart}>
          {cart.products.length > 0 ? (cart.products.map((product, index) => (
            <div key={index} style={{ display: "grid", gridTemplateRows: "repeat(1, 1fr)", gridTemplateColumns: "repeat(6, 1fr)", alignItems: "center" }}>
              <div style={{ gridColumn: "span 2" }}>{product.product_name}</div>
              <div style={{ marginLeft: "15px" }}>{product.color.toUpperCase()}</div>
              <div style={{ marginLeft: "15px" }}>{product.battery_percent}%</div>
              <div style={{ display: "flex", alignItems: "center", justifySelf: "flex-end" }}>${product.sell_price ?? product.buy_price}</div>
              <Button
                variant="outlined"
                size="small"
                target="_blank"
                onClick={() => deleteFromCart(index)}
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
                <CloseIcon sx={{ fontSize: 10, fontWeight: "bold", color: "white" }} />
              </Button>

            </div>)
          )) : (<p></p>
          )}
        </div>
        <h1 style={{ margin: "0px", color: "rgb(149, 148, 148)" }}>${totalBuyPrice}</h1>
      </div>
      <p style={{ fontSize: 3 }}> </p>

      <Button
        variant="outlined"
        size="small"
        target="_blank"
        onClick={() => handleOpenConfirm()}
        style={buttonStyle}>Finalizar compra
      </Button>
      <p style={{ fontSize: 3 }}> </p>

      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openConfirm}
        onClose={() => handleCloseConfirm()}
        className={style.confirmationModal}
        closeAfterTransition
        disablePortal
        style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
        <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-evenly", height: "20px" }}>
            <p style={{ margin: "0px" }}>¿Quieres agregar esta compra?</p>
            <button style={{
              marginTop: "-5px", height: "25px", width: "25px", borderColor: "transparent", backgroundColor: "transparent", '&:hover': {
                cursor: "pointer",
              }
            }} onClick={() => handleCloseConfirm()}>
              <img src={closeConfirm} alt="closeConfirm" style={{ width: "25px" }} />
            </button>
          </div>
          {cart.products.length > 0 ? (cart.products.map((product, index) => (
            <div key={index} style={{ marginTop: "5px" }}>
              <p style={{ fontWeight: "300", fontSize: "14px" }}>{product.product_name} ${product.sell_price ?? product.buy_price}</p>
            </div>)
          )) : (<p></p>)}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="small"
              target="_blank"
              style={buttonStyle}
              onClick={() => finishBuy()}>Confirmar
            </Button>
          </div>
        </div>
      </Dialog>

      <Dialog
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={openCheck}
        onClose={() => handleCloseCheck()}
        closeAfterTransition
        disablePortal
        style={{ position: "absolute", display: "flex" }}>
        <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px", fontSize: "20px", fontWeight: "500", alignItems: "center", }}>
          <p style={{ margin: "0px", textAlign: "center" }}>La compra se agregó correctamente</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <img src={check} alt="Check" style={{ height: "43px", display: "grid", alignSelf: "center" }} />
          </div>
        </div>
      </Dialog>

      {cart.products[0]?.product_name !== "" && cart.products.length > 0 ? (cart.products.map((product, index) => (
        <div key={product.product_name + "-" + index}>
          <p style={{ margin: "0px", fontWeight: "bold" }}>{product.product_name}</p>
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", // Etiqueta y campo en dos columnas
            gridGap: "5px",
            rowGap: "10px",
            alignItems: "center", // Alinea verticalmente el contenido
          }}>
            <p style={{ marginTop: "5px", marginBottom: "3px" }}>Color</p>
            <p style={{ marginTop: "5px", marginBottom: "3px" }}>IMEI</p>
            <p style={{ marginTop: "5px", marginBottom: "3px" }}>Batería</p>
            <p style={{ marginTop: "5px", marginBottom: "3px" }}>Precio de Venta</p>
            <p style={{ marginTop: "5px", marginBottom: "3px" }}>Estado</p>
            <input type="text" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder="" value={newProduct.products.color} onChange={e => changeHandler(e, index)} name="color" />
            <input type="text" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder="" value={newProduct.products.serial_id} onChange={e => changeHandler(e, index)} name="serial_id" />
            <input type="number" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder="100%" value={newProduct.products.battery_percent} onChange={e => changeHandler(e, index)} name="battery_percent" />
            <input type="number" style={{ height: "12px", margin: "0px", width: "70%" }} placeholder="" value={newProduct.products.sell_price} onChange={e => changeSellPrice(e, index)} name="sell_price" />
            <button style={{ height: "22px", margin: "0px", width: "88%", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)", borderRadius: "20px", border: "transparent", fontSize: "1.7vh" }} onClick={() => updateproductState(product, index)}>{product.state === "AVAILABLE" ? "Disponible" : product.state === "RESERVED" ? "Reservado" : product.state === "DEFECTS" ? "Fallado" : "Roto"}</button>
          </div>
          <input type="text" placeholder="Observaciones" style={{ margin: "0px 0px 10px 0px", width: "95%", borderRadius: "20spx" }} />
          {index > newProduct.products.length ? <Divider variant="middle" component="li" sx={dividerStyle} /> : <div></div>}
        </div>))) : (<div></div>)}
    </div>
  )
})
Compras.displayName = "Compras";
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
  '&:hover': {
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "rgb(80, 80, 80)"
  }
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
  '&:hover': {
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "rgb(80, 80, 80)"
  }
}

const dividerStyle = {
  borderColor: 'transparent',
  background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
  margin: '0px',
  padding: "0px",
  height: "1px",
  width: "90%"
}

export default Compras;