import React, { useState } from "react";
import { Button, Dialog, Divider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import {
  deleteTransaction,
  getTransactions,
  putTransactionSell,
  getProductsStocks
} from "../../Redux/actions";
import style from "./BuyTransactionDetail.module.css"
import Payment from "../Payment/Payment";
import CalendarTransactions from "../Calendar/CalendarTransactions";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import closeConfirm from "../../assets/closeConfirm.png"
import Exchange from "../Exchange/Exchange";
import zIndex from "@mui/material/styles/zIndex";

const SellTransactionDetail = React.forwardRef(({ handleCloseDetail, transaction, setTransaction, updateTransaction }, ref) => {

  const [updatedTransaction, setUpdatedTransaction] = useState(transaction)
  const [newProduct, setNewProduct] = useState({
    battery_percent: 0,
    buy_price: 0,
    color: "",
    observations: "",
    product: {},
    sell_price: 0,
    serial_id: "",
    state: "AVAILABLE"
  })
  const [openExchange, setOpenExchange] = useState(false);
  const [exchangeProducts, setExchangeProducts] = useState([]);

  const dispatch = useDispatch();

  const stock = useSelector((state) => state.products) || [];

  const transactionDetailHandler = (event) => {
    const property = event.target.name
    const value = event.target.value
    if (property === "client" || property === "cellphone" || property === "email") {
      setUpdatedTransaction({ ...updatedTransaction, client: { ...updatedTransaction.client, [property]: value } })
    }
    setTransaction({ ...transaction, [property]: value })
  }

  const [openCheck, setOpenCheck] = useState(false);
  const handleOpenCheck = () => setOpenCheck(true)
  const handleCloseCheck = () => setOpenCheck(false);
  const handleOpenExchange = () => {
    if (openExchange) {
      setOpenExchange(false)
    } else {
      setOpenExchange(true)
    }
  };

  const handleCartChange = (event) => {
    const property = event.target.name
    const value = event.target.value

    if (property === "product_name") {
      if (value) {
        setNewProduct({ ...newProduct, product: { name: value } })
      } else {
        setNewProduct({
          battery_percent: 0,
          buy_price: 0,
          color: "",
          observations: "",
          product: {},
          sell_price: 0,
          serial_id: "",
          state: "AVAILABLE"
        })
      }
    } else if (property === "serial_id") {
      const specificProduct = stock.filter(option => option.name === newProduct.product.name) // Filtrar por nombre específico
        .flatMap(option => option.stocks) // Aplanar el arreglo de stocks para acceder a los serial_id
        .find(stockItem => stockItem.serial_id === value) // Filtrar productos con serial_id disponible

      setNewProduct({ ...newProduct, ...specificProduct })
    } else {
      setNewProduct({ ...newProduct, [property]: value })
    }
  }

  const handleDateChange = (selection) => {
    setUpdatedTransaction({ ...updatedTransaction, date: selection.startDate.getTime() / 1000 });
  }

  const capitalizeWords = (str) => {
    if (!str) { return str }
    return str
      .split(' ') // Divide la cadena en palabras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
      .join(' '); // Une las palabras nuevamente
  };

  const handlePaymentChange = (selection) => {
    setUpdatedTransaction({ ...updatedTransaction, payment_method: selection });
  }

  const handlePartialPaymentChange = (event) => {
    const value = event.target.value;
    setUpdatedTransaction({ ...updatedTransaction, partial_payment: value });
  }

  const addProdHandler = () => {
    if (newProduct.serial_id) {
      const updatedProducts = [...updatedTransaction.products, newProduct]
      setUpdatedTransaction({ ...updatedTransaction, products: updatedProducts })
      setNewProduct({
        battery_percent: 0,
        buy_price: 0,
        color: "",
        observations: "",
        product: {},
        sell_price: 0,
        serial_id: "",
        state: "AVAILABLE"
      })
    }
  }

  const deleteFromCart = (index) => {
    const newUpdatedCart = [...updatedTransaction.products]
    newUpdatedCart.splice(index, 1)
    setUpdatedTransaction({ ...updatedTransaction, products: newUpdatedCart })
  }

  const updateTransactionHandle = async () => {
    setUpdatedTransaction({
      ...updatedTransaction,
      total: totalSellPrice - totalSwapProducts
    })
    await updateTransaction(updatedTransaction)
  }

  const deleteTransactionHandle = async () => {
    await dispatch(deleteTransaction(transaction.id))
    dispatch(getTransactions())
    dispatch(getProductsStocks())
    handleCloseCheck()
    handleCloseDetail()
  }

  const changeTransaction = (event) => {
    const primarySelected = {
      contact_via: true,
    }

    const seller = {
      name_seller: "name"
    }

    if (primarySelected[event.target.name]) {
      setUpdatedTransaction({
        ...updatedTransaction,
        [event.target.name]: event.target.value
      })
    }
    if (seller[event.target.name]) {
      setUpdatedTransaction({
        ...transaction,
        seller: {
          ...updatedTransaction.seller,
          [seller[event.target.name]]: event.target.value
        }
      })
    }
    console.log(updatedTransaction)
  }

  const handleAddExchangeSellTransaction = (exchangeCart) => {
    setExchangeProducts(prevExchangeProducts => {
      const newExchangeProducts = [...prevExchangeProducts, ...exchangeCart];
      setUpdatedTransaction(prevProduct => {
        return {
          ...prevProduct, swap_products: [
            ...prevExchangeProducts,
            ...exchangeCart
          ], has_swap: true
        };
      })
      return newExchangeProducts;
    })
  }

  const deleteFromExchangeCart = (index) => {
    const newUpdatedCart = { ...updatedTransaction }
    console.log(newUpdatedCart)
    newUpdatedCart.swap_products.splice(index, 1)
    setUpdatedTransaction(newUpdatedCart)
  }


  const totalSellPrice = updatedTransaction.products.reduce((total, product) => {
    return total + (parseFloat(product.sell_price || 0));
  }, 0);

  const totalSwapProducts = updatedTransaction.swap_products.reduce((sum, swap) => sum + (parseFloat(swap.buy_price) || 0), 0);

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
        }}><CloseIcon sx={{ fontSize: 15, fontWeight: "bold", color: "white" }} />
      </Button>

      <div>
        <h2 className={style.dataTitle}>Datos de la transacción</h2>
        <p className={style.dataSubtitle}>Venta</p>
      </div>

      <div className={style.paddingLeft} style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
        <p className={style.letras}>*Cliente <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
        <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} value={capitalizeWords(updatedTransaction.client.name)} name="client" onChange={transactionDetailHandler} />
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <div className={`${style.paddingLeft} ${style.rowLeft}`}>
        <div className={style.rowIntern}>
          <p className={style.letras}>Tel <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
          <input className={style.inputRow} type="text" style={{ height: "15px", margin: "0px 10px 0px 10px", width: "25%" }} value={updatedTransaction.client.cellphone} name="cellphone" onChange={transactionDetailHandler} />
        </div>
        <div className={style.rowIntern}>
          <p className={style.letras}>Email <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
          <input className={style.inputRow} type="text" style={{ height: "15px", margin: "0px 0px 0px 10px", width: "25%" }} value={capitalizeWords(updatedTransaction.client.email)} name="email" onChange={transactionDetailHandler} />
        </div>
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <div className={`${style.paddingLeft} ${style.rowLeft}`}>
        <div className={style.rowIntern}>
          <p className={style.letras}>
            Canal de venta <ArrowDropDownIcon sx={{ fontSize: 18 }} />
          </p>
          <select
            name="contact_via"
            value={updatedTransaction.contact_via}
            onChange={changeTransaction}
          >
            <option value="INSTAGRAM">Instagram</option>
            <option value="FACEBOOK">Facebook</option>
            <option value="TIKTOK">Whats App</option>
            <option value="REFERED">Refered</option>
            <option value="OTHER">Other</option>
          </select>
        </div>
        <CalendarTransactions value={transaction.date} onDateChange={handleDateChange} />
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <div className={style.paddingLeft} style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
        <p className={style.letras}>*Vendedor <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
        <input
          type="text"
          value={updatedTransaction.seller.name || ""}
          style={{ fontSize: 12, height: "15px", margin: "12px 10px 12px 10px", width: "40%" }}
          onChange={changeTransaction} name="name_seller"
        />
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <div className={style.paddingLeft} style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Payment value={transaction.payment_method} payment={handlePaymentChange} />
        <Button
          variant="outlined"
          size="small"
          target="_blank"
          style={buttonStyle}
          onClick={handleOpenExchange}
        >Agregar canje
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openExchange}
          className={style.modal}
          onClose={handleOpenExchange}
          closeAfterTransition
        >
          <Fade in={openExchange}>
            <Exchange
              handleCloseExchange={handleOpenExchange}
              exchangeCart={handleAddExchangeSellTransaction}
            />
          </Fade>
        </Modal>
      </div>

      {/*
            <Divider variant="middle" component="li" sx={dividerStyle} />

            <h2 style={{ fontSize: "15px" }}>Pago Parcial</h2>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center",  height: "20px", margin: "12px 10px 12px 0px" }}>
                <p className={style.letras}>Monto <ArrowRightIcon sx={{fontSize: 18}}/></p>
                <input 
                type="number" 
                style={{ height: "15px", fontSize: 12 }} 
                onChange={handlePartialPaymentChange} 
                name="partial_payment"
                placeholder={transaction.partial_payment}
                />
            </div>
            */}
      <Divider variant="middle" component="li" sx={dividerStyle} />

      <h2 className={style.paddingLeft}>Nuevo producto</h2>

      <div className={style.paddingLeft} style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "0px 0px 0px 0px" }}>
        <p className={style.letras}>
          *Producto
          <ArrowRightIcon sx={{ fontSize: 18 }} />
        </p>
        <select
          type="text"
          name="product_name"
          value={newProduct.product.name || ""}
          onChange={handleCartChange}
        >
          <option key={transaction.products.name} value="">Elija un modelo</option>
          {stock.map((prod) => (
            prod.stocks.length === 0 ? null : <option key={prod.name} value={prod.name}>{capitalizeWords(prod.name)}</option>
          ))}
        </select>
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      <div className={style.paddingLeft} style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "0px 0px 0px 0px" }}>
        <p className={style.letras}>*IMEI <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
        <select type="text" value={newProduct.serial_id || ""} onChange={handleCartChange} name="serial_id" style={{ fontSize: 12, height: "20px", margin: "12px 10px 12px 10px", width: "105px", borderRadius: "20px", border: "0px", paddingLeft: "5px" }}>
          <option key={newProduct.serial_id} value="">Elija un IMEI</option>
          {stock
            ?.filter(option => option.name === newProduct.product.name) // Filtrar por nombre específico
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

      <div className={style.paddingLeft} style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "10px 0px 10px 0px" }}>
        <p className={style.letras}>*Precio de venta <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
        <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} value={newProduct.sell_price ?? ''} placeholder="$0000" name="sell_price" onChange={handleCartChange} />
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
          {updatedTransaction.products.map((product, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateRows: "repeat(1, 1fr)",
                gridTemplateColumns: "repeat(6, 1fr)",
                alignItems: "center"
              }}
            >
              <div style={{ gridColumn: "span 2" }}>
                {capitalizeWords(product.product.name)}
              </div>
              <div>
                {product.color ? capitalizeWords(product.color) : ""}
              </div>
              <div>
                {product.battery_percent}%
              </div>
              <div >
                ${product.sell_price}
              </div>
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
          )}
        </div>
        {updatedTransaction.swap_products?.length > 0 ?
          <div id="cart" className={style.cart}>
            {updatedTransaction.swap_products?.map((prod, index) => (
              <div
                key={index}
                style={{
                  display: "grid",
                  gridTemplateRows: "repeat(1, 1fr)",
                  gridTemplateColumns: "repeat(6, 1fr)",
                  flexDirection: "center",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}>
                <div style={{ gridColumn: "span 2" }}>
                  {prod.product_name ?
                    capitalizeWords(prod.product_name)
                    : capitalizeWords(prod.product.name)
                  }
                </div>
                <div>{prod.color ? capitalizeWords(prod.color) : ""}</div>
                <div>{prod.battery_percent}%</div>
                <div>
                  -${prod.buy_price}
                </div>
                <Button
                  variant="outlined"
                  size="small"
                  target="_blank"
                  onClick={() => deleteFromExchangeCart(index)}
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
              </div>
            ))}
          </div> : <div></div>}
        <h1 style={{ margin: "0px", color: "rgb(149, 148, 148)" }}>${totalSellPrice - totalSwapProducts}</h1>
      </div>

      <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
        <Button
          variant="outlined"
          size="small"
          target="_blank"
          style={buttonStyle}
          onClick={updateTransactionHandle}
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
        onClose={() => handleCloseCheck()}
        closeAfterTransition
        disablePortal
        style={{ position: "absolute", display: "flex" }}>
        <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px", fontSize: "20px", fontWeight: "500", alignItems: "center", }}>
          <button style={{
            position: "absolute", margin: "-5px 0px 0px 0px", right: "15px", top: "10px", height: "25px", width: "25px", borderColor: "transparent", backgroundColor: "transparent", '&:hover': {
              cursor: "pointer",
            }
          }} onClick={() => handleCloseCheck()}>
            <img src={closeConfirm} alt="closeConfirm" style={{ width: "25px" }} />
          </button>
          <p style={{ display: "flex", margin: "0px", textAlign: "center", marginLeft: "10%", width: "80%", alignItems: "center" }}>¿Quieres eliminar esta transacción de manera permanente?</p>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="small"
              target="_blank"
              style={window.innerWidth >= 1024 ? buttonStyleDesktop : buttonStyle}
              onClick={deleteTransactionHandle}>Confirmar
            </Button>
          </div>
        </div>
      </Dialog>

    </div>
  )
})

SellTransactionDetail.displayName = "SellTransactionDetail"

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
  width: "fit-content",
  paddingX: "4px",
  marginTop: "10px",
  marginBottom: "10px",
  marginLeft: "5px",
  marginRight: "auto",
  textTransform: 'none',
  color: "white",
  '&:hover': {
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "rgb(80, 80, 80)"
  }
}

const buttonStyleDesktop = {
  ...buttonStyle,
  marginLeft: "0px !important",
}

export default SellTransactionDetail;