import React, { useEffect, useState } from "react";
import style from "./GroupDetail.module.css"
import { Button, Divider } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { putProductDetail, putProductStock } from "../../Redux/actions";
import { useDispatch } from "react-redux";

const GroupDetail = React.forwardRef(({ handleCloseDetail, products, setProducts, updateProductList }, ref) => {

    const dispatch = useDispatch()
    const aux = []
    // const states = ["AVAILABLE", "RESERVED", "DEFECTIVE", "BROKEN"]
    const stockDetailHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        setProducts({ ...products, [property]: value })
    }

    const productDetailHandler = (event, i) => {
        const property = event.target.name
        const value = event.target.value
        let updatedProducts = { ...products };
        updatedProducts.stocks[i] = { ...products.stocks[i], [property]: value };
        setProducts(updatedProducts);
    }

    const submitHandler = async () => {
        dispatch(putProductStock({
            id:products.id,
            name: products.name,
            list_price: products.list_price
        }))
    }

    const submitProductHandler = async () => {
        products.stocks.forEach(element => {
            dispatch(putProductDetail(element))
        });
    }

    return (
        <div className={style.containerGroupDetail}>
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
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <h2 style={{ fontSize: "20px", marginRight: "10px" }}>Datos del grupo</h2>

                    <Button
                        variant="outlined"
                        size="small"
                        target="_blank"
                        style={buttonStyle}>Eliminar grupo
                    </Button>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Producto</p>
                    <input type="text" style={{ height: "15px", margin: "0px 0px 0px 10px" }} placeholder={`${products.name}`} name="name" value={products.name} onChange={stockDetailHandler} />
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle} />

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Cantidad</p>
                    <p style={{ fontWeight: "bold", margin: "0px 0px 0px 10%" }}> {products.stocks.length}</p>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle} />

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p key={products.id} className={style.letras}>Proveedor/es</p>
                    {products.stocks.map(prov => {
                        if (!aux.includes(prov.supplier.name)) {
                            aux.push(prov.supplier.name)
                            return (
                                <p key={products.id} style={{ fontWeight: "bold", margin: "0px 0px 0px 10px", color: prov.supplier.color }}>{prov.supplier.name}</p>)
                        }
                    })}
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle} />

                <div style={{ display: "flex", flexDirection: "row", height: "22px", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p className={style.letras}>Precio Unitario</p>
                    <input type="text" style={{ height: "15px" }} placeholder={`$${products.list_price}`} name="list_price" value={products.list_price || "0"} onChange={stockDetailHandler} />
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle} />

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                    <h2 style={{ fontSize: "20px", marginRight: "10px" }}>Datos de cada item</h2>
                    <Button
                        variant="outlined"
                        size="small"
                        target="_blank"
                        style={botonCopiar}>
                        <ContentCopyIcon />
                    </Button>
                </div>

                {products.stocks.map((prod, prodIndex) => (
                    <div key={prodIndex}>
                        <h2 style={{ fontSize: "18px", margin: "10px 0px 0px 0px", color: prod.supplier.color }}>{products.name}</h2>
                        <div style={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gridTemplateColumns: "22.5% 22.5% 22.5% 22.5% 10%", gap: "0px", alignItems: "center" }}>
                            <p style={{ margin: "10px 0px 0px 0px" }}>Color</p>
                            <p style={{ margin: "10px 0px 0px 0px" }}>IMEI</p>
                            <p style={{ margin: "10px 0px 0px 0px" }}>Baterí­a</p>
                            <p style={{ margin: "10px 0px 0px 0px" }}>Estado</p>
                            <p style={{ margin: "10px 0px 0px 0px", width: "10px" }}></p>
                            <input type="text" style={{ height: "15px", margin: "0px 5px 0px 0px", width: "70%" }} placeholder={prod.color} name="color" value={products.stocks[prodIndex]?.color || ""} onChange={e => productDetailHandler(e, prodIndex)} />
                            <input type="text" style={{ height: "15px", margin: "0px", width: "70%" }} placeholder={prod.serial_id} name="serial_id" value={products.stocks[prodIndex]?.serial_id || ""} onChange={e => productDetailHandler(e, prodIndex)} />
                            <input type="text" style={{ height: "15px", margin: "0px", width: "70%" }} placeholder={prod.battery_percent} name="battery_percent" value={products.stocks[prodIndex]?.battery_percent || ""} onChange={e => productDetailHandler(e, prodIndex)} />
                            <input type="text" style={{ height: "15px", margin: "0px", width: "70%", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.3)", fontSize: "1.55vh" }} placeholder={prod.state} name="state" value={prod.state} onChange={e => productDetailHandler(e, prodIndex)} />
                            {/* <button onClick={e => changeState()}>{product.state}</button> */}
                            <Button
                                variant="outlined"
                                size="small"
                                target="_blank"
                                style={botonCopiar}>
                                <ContentCopyIcon />
                            </Button>
                        </div>
                        <input type="text" style={{ height: "15px", width: "85%", margin: "0px", paddingLeft: "5px" }} placeholder={prod.observations} name="observations" value={prod.observations} onChange={e => productDetailHandler(e, prodIndex)} />
                    </div>
                ))}
                <Button
                    variant="outlined"
                    size="small"
                    target="_blank"
                    style={buttonStyle}
                    onClick={() => { submitHandler(); submitProductHandler(); updateProductList(products) }}>Guardar cambios
                </Button>
            </div>
        </div>
    )
})

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