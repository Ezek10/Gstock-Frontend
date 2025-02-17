import React, { useState } from "react";
import style from "./GroupDetail.module.css"
import { Button, Dialog, Divider } from "@mui/material";
import { deleteProducts, getProductsStocks, putProductDetail, putProductStock } from "../../Redux/actions";
import { useDispatch } from "react-redux";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import check from "../../assets/check.png"

const GroupDetail = React.forwardRef(({ handleCloseDetail, products, setProducts, updateProductList }, ref) => {

  const [openConfirm, setOpenConfirm] = useState(false);
  const handleOpenConfirm = () => setOpenConfirm(true);
  const handleCloseConfirm = () => setOpenConfirm(false);

  const dispatch = useDispatch()
  const aux = []
  const states = ["AVAILABLE", "RESERVED", "DEFECTIVE", "BROKEN"]

  const stockDetailHandler = (event) => {
    const property = event.target.name
    const value = event.target.value
    setProducts({ ...products, [property]: value })
  }
  const capitalizeWords = (str) => {
    if (!str) { return str }
    return str
      .split(' ') // Divide la cadena en palabras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
      .join(' '); // Une las palabras nuevamente
  };
  const [openCheck, setOpenCheck] = useState(false);
  const handleOpenCheck = () => {
    setOpenCheck(true)
  };
  setTimeout(() => {
    setOpenCheck(false)
  }, 3000)
  const handleCloseCheck = () => setOpenCheck(false);

  const productDetailHandler = (event, i) => {
    const property = event.target.name
    const value = event.target.value
    let updatedProducts = { ...products };
    updatedProducts.stocks[i] = { ...products.stocks[i], [property]: value };
    setProducts(updatedProducts);
  }

  const submitHandler = async () => {
    dispatch(putProductStock({
      id: products.id,
      name: products.name,
      list_price: products.list_price
    }))
  }

  const submitProductHandler = async () => {
    products.stocks.forEach(element => {
      dispatch(putProductDetail(element))
    });
    dispatch(getProductsStocks())
  }

  const updateproductState = (product, itemIndex) => {
    const newState = (states.indexOf(product.state) + 1) % states.length;
    const updatedProducts = { ...products };
    updatedProducts.stocks[itemIndex].state = states[newState];
    setProducts(updatedProducts);
  }

  return (
    <div ref={ref} className={style.containerGroupDetail}>
      <div className={style.containerGroupDetailIntern}>
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
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <h2 style={{ fontSize: "20px", marginRight: "10px" }}>Datos del grupo</h2>

            <Button
              variant="outlined"
              size="small"
              target="_blank"
              onClick={() => handleOpenConfirm()}
              style={buttonStyle}>Eliminar grupo
            </Button>

            <Dialog
              aria-labelledby="transition-modal-title"
              aria-describedby="transition-modal-description"
              open={openConfirm}
              onClose={() => handleCloseConfirm()}
              className={style.confirmationModal}
              closeAfterTransition
              disablePortal
              style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
              <div style={{ display: "flex", flexDirection: "column", minWidth: "100px", minHeight: "50px", padding: "20px" }}>
                <p style={{ margin: "0px" }}>¿Quieres eliminar este grupo?</p>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    variant="outlined"
                    size="small"
                    target="_blank"
                    style={buttonStyle}
                    onClick={() => { dispatch(deleteProducts(products.id)); handleCloseConfirm(); handleCloseDetail() }}>Confirmar
                  </Button>
                </div>
              </div>
            </Dialog>
          </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
            <p className={style.letras}>Producto <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
            <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} name="name" value={capitalizeWords(products.name)} onChange={stockDetailHandler} />
          </div>

          <Divider variant="middle" component="li" sx={dividerStyle} />

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
            <p className={style.letras}>Cantidad <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
            <p style={{ fontWeight: 400, margin: "0px 0px 0px 10px" }}> {products.stocks.length}</p>
          </div>

          <Divider variant="middle" component="li" sx={dividerStyle} />

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
            <p key={products.id} className={style.letras}>Proveedor/es <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
            {products.stocks.map(prov => {
              if (!aux.includes(prov.supplier.name)) {
                aux.push(prov.supplier.name)
                return (
                  <p  key={prov.id} style={{ fontWeight: 400, margin: "0px 0px 0px 10px", color: prov.supplier.color }}>{capitalizeWords(prov.supplier.name)}</p>)
              }
            })}
          </div>

          <Divider variant="middle" component="li" sx={dividerStyle} />

          <div style={{ display: "flex", flexDirection: "row", height: "22px", alignItems: "center", margin: "12px 0px 12px 0px" }}>
            <p className={style.letras}>Precio de venta <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
            <input type="number" style={{ height: "15px", width: "20%", marginLeft: 5 }} name="list_price" placeholder={"$00000"} value={products.list_price} onChange={stockDetailHandler} />
          </div>

          <Divider variant="middle" component="li" sx={dividerStyle} />

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
            <h2 style={{ fontSize: "20px", marginRight: "10px" }}>Datos de cada item</h2>
          </div>

          {products.stocks.map((prod, prodIndex) => (
            <div key={prodIndex}>
              <h2 style={{ fontSize: "18px", margin: "10px 0px 0px 0px", color: prod.supplier.color }}>{products.name}</h2>
              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", // Etiqueta y campo en dos columnas
                gridGap: "5px",
                rowGap: "10px",
                alignItems: "center", // Alinea verticalmente el contenido
              }}>
                <p style={{ margin: "10px 0px 0px 0px" }}>Color</p>
                <p style={{ margin: "10px 0px 0px 0px" }}>IMEI</p>
                <p style={{ margin: "10px 0px 0px 0px" }}>Baterí­a</p>
                <p style={{ margin: "10px 0px 0px 0px" }}>Precio de Venta</p>
                <p style={{ margin: "10px 0px 0px 0px" }}>Estado</p>
                <input type="text" style={{ height: "15px", margin: "0px 5px 0px 0px", width: "70%", fontSize: "1.7vh" }} name="color" value={products.stocks[prodIndex]?.color || ""} onChange={e => productDetailHandler(e, prodIndex)} />
                <input type="text" style={{ height: "15px", margin: "0px", width: "70%" }} name="serial_id" value={products.stocks[prodIndex]?.serial_id || ""} onChange={e => productDetailHandler(e, prodIndex)} />
                <input type="number" style={{ height: "15px", margin: "0px", width: "70%" }} name="battery_percent" value={products.stocks[prodIndex]?.battery_percent || ""} onChange={e => productDetailHandler(e, prodIndex)} />
                <input type="number" style={{ height: "15px", margin: "0px", width: "70%" }} name="sell_price" value={products.stocks[prodIndex]?.sell_price || ""} onChange={e => productDetailHandler(e, prodIndex)} />
                {/* <input type="text" style={{ height: "15px", margin: "0px", width: "70%", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)", fontSize: "1.55vh" }} placeholder={prod.state} name="state" value={prod.state} onChange={e => productDetailHandler(e, prodIndex)} /> */}
                <button style={{ height: "22px", margin: "0px", width: "88%", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)", borderRadius: "20px", border: "transparent", fontSize: "1.7vh" }} onClick={() => updateproductState(prod, prodIndex)}>{prod.state === "AVAILABLE" ? "Disponible" : prod.state === "RESERVED" ? "Reservado" : prod.state === "DEFECTIVE" ? "Fallado" : "Roto"}</button>
              </div>
              <input type="text" style={{ height: "15px", width: "95%", margin: "0px", paddingLeft: "5px" }} placeholder={prod.observations || "Obsevaciones"} name="observations" value={prod.observations} onChange={e => productDetailHandler(e, prodIndex)} />
            </div>
          ))}
          <Button
            variant="outlined"
            size="small"
            target="_blank"
            style={buttonStyle}
            onClick={() => { submitHandler(); submitProductHandler(); updateProductList(products); handleOpenCheck() }}>Guardar cambios
          </Button>

          <Dialog
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={openCheck}
            onClose={() => handleCloseCheck()}
            closeAfterTransition
            disablePortal
            style={{ position: "absolute", display: "flex" }}>
            <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px", fontSize: "20px", fontWeight: "500", alignItems: "center", }}>
              <p style={{ margin: "0px", textAlign: "center" }}>Los cambios se guardaron correctamente</p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <img src={check} alt="Check" style={{ height: "43px", display: "grid", alignSelf: "center" }} />
              </div>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  )
})

GroupDetail.displayName = "GroupDetail"

const buttonStyle = {
  backgroundColor: "black",
  borderColor: "transparent",
  borderRadius: "20px",
  height: "fit-content",
  width: "fit-content",
  paddingX: "4px",
  marginTop: "10px",
  marginBottom: "10px",
  marginRight: "20px",
  textTransform: 'none',
  color: "white",
  '&:hover': {
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "rgb(80, 80, 80)"
  }
}

const botonCopiar = {
  backgroundColor: "black",
  borderColor: "transparent",
  borderRadius: "6px",
  height: "30px",
  width: "30px",
  minWidth: "0px",
  fontSize: "12px",
  color: "white",
  '&:hover': {
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "rgb(80, 80, 80)"
  }
}

const dividerStyle = {
  borderColor: 'transparent',
  background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
  margin: '1px',
  padding: "0px",
  height: "1px",
  width: "90%",
}

export default GroupDetail;