import React, { useEffect, useState } from "react";
import style from "./GroupDetail.module.css"
import { Button, Divider } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { putProductDetail, putProductStock } from "../../Redux/actions";
import { useDispatch } from "react-redux";

const GroupDetail = React.forwardRef(({ handleCloseDetail, product }, ref) => {

    const dispatch = useDispatch()

    const [ stockDetail , setStockDetail ] = useState({
        id: product.id,
        list_price: product.list_price,
    })
    const stock = product.stocks;
    const [ productDetail, setProductDetail ] = useState(product.stocks)
    const aux = []
    
    useEffect(()=> {
    }, [productDetail])
    
    const stockDetailHandler = (event) => {
        const property = event.target.name
        const value = event.target.value
        setStockDetail({ ...stockDetail, [property]: value})        
    }


    const productDetailHandler = (event, i) => {
        const property = event.target.name
        const value = event.target.value
        setProductDetail(prevProductDetail => 
            prevProductDetail.map((item, index) =>
                index === i
                    ? { ...item, [property]: value }  // Actualiza el objeto en el índice 'i'
                    : item  // Deja los demás objetos sin cambios
            )
        );
    }

    const submitHandler = async () => {
        dispatch(putProductStock(stockDetail))
    }

    const submitProductHandler = async () => {
        productDetail.forEach(element => {
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
                    '&:hover':{
                        color: "#fff",
                        borderColor: "transparent",
                        backgroundColor: "rgb(80, 80, 80)"}
                }}>X
            </Button>
            <div>
                <div style={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <h2 style={{ fontFamily: 'Calibri', fontSize: "20px", marginRight: "10px" }}>Datos del grupo</h2>

                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={buttonStyle}>Eliminar grupo
                    </Button>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "10px" }}>
                    <p className={style.letras}>Producto</p>
                    <p style={{ fontSize: "15px", fontFamily: "Calibri", fontWeight: "bold", margin: "0px 0px 0px 10%" }}> {product.name}</p>
                </div>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "22px 0px 12px 0px" }}>
                    <p className={style.letras}>Cantidad</p>
                    <p style={{ fontSize: "15px", fontFamily: "Calibri", fontWeight: "bold", margin: "0px 0px 0px 10%" }}> {stock.length}</p>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", margin: "12px 0px 12px 0px" }}>
                    <p key={product.id} className={style.letras}>Proveedor/es</p>
                    {stock.map((prov, provIndex) => {
                        if (!aux.includes(prov.supplier.name)) {
                            aux.push(prov.supplier.name)
                            return(
                            <p key={product.id} style={{fontSize: "15px", fontFamily: "Calibri", fontWeight: "bold", margin: "0px 0px 0px 10px", color: prov.supplier.color}}>{prov.supplier.name}</p>)
                        }
                    })}
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh", margin: "5px 0px 5px 0px"  }}>
                    <p className={style.letras}>Precio Unitario</p>
                    <input type="text" style={{ height: "15px" }} placeholder={`$${stockDetail.list_price}`} name="list_price" value={product.list_price || "0" } onChange={stockDetailHandler}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <h2 style={{ fontFamily: 'Calibri', fontSize: "20px", marginRight: "10px" }}>Datos de cada item</h2>
                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={botonCopiar}>
                        <ContentCopyIcon/>    
                    </Button>
                </div>

                {stock.map((prod, prodIndex) => (
                    <div key={prodIndex}>
                        <h2 style={{ fontFamily: 'Calibri', fontSize: "20px", margin: "10px 0px 0px 0px", color: prod.supplier.color }}>{product.name}</h2>
                        <div style={{ display: "grid", gridTemplateRows: "repeat(2, 1fr)", gridTemplateColumns: "repeat(5, 1fr)", gap: "0px", alignItems: "center" }}>
                            <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}>Color</p>
                            <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}>IMEI</p>
                            <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}>Batería</p>
                            <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}>Estado</p>
                            <p style={{ marginTop: "10px", marginBottom: "3px", fontFamily: 'Calibri', fontSize: "12px" }}></p>
                            <input type="text" style={{ height: "15px", margin: "0px", paddingLeft: "5px", width: "50px" }} placeholder={prod.color} name="color" value={productDetail[prodIndex]?.color || "" } onChange={e => productDetailHandler(e, prodIndex)}/>
                            <input type="text" style={{ height: "15px", margin: "0px", paddingLeft: "5px" }} placeholder={prod.serial_id} name="serial_id" value={productDetail[prodIndex]?.serial_id || "" } onChange={e => productDetailHandler(e, prodIndex)}/>
                            <input type="text" style={{ height: "15px", margin: "0px", paddingLeft: "5px" }} placeholder={prod.battery_percent} name="battery_percent" value={productDetail[prodIndex]?.battery_percent || "" } onChange={e => productDetailHandler(e, prodIndex)}/>
                            <input type="text" style={{ height: "15px", width: "70px", margin: "0px", paddingLeft: "5px" }} placeholder={prod.state} name="state" value={prod.state} onChange={e => productDetailHandler(e, prodIndex)}/>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={botonCopiar}>
                                <ContentCopyIcon/>  
                            </Button>
                        </div>
                    </div>
                ))}

                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    style={buttonStyle}
                    onClick={() => {submitHandler(), submitProductHandler()}}>Guardar cambios
                </Button>



            </div>


        </div>
    )
})

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

const botonCopiar = {
    backgroundColor: "black",
    borderColor: "transparent",
    borderRadius: "20px",
    height: "30px",
    width: "30px",
    minWidth: "0px",
    marginLeft: "10px",
    fontSize: "12px",
    color: "white",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

const dividerStyle = {
    borderColor: 'transparent',
    background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
    margin: '1px', 
    padding:"0px", 
    height: "1px", 
    width:"90%"
}

export default GroupDetail;