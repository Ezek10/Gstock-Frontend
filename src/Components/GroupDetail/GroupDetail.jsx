import React from "react";
import style from "./GroupDetail.module.css"
import { Button, Divider } from "@mui/material";
import shadows from "@mui/material/styles/shadows";

const GroupDetail = React.forwardRef(({ handleCloseDetail, product }, ref) => {

    console.log(product);
    console.log(product.stocks[0].supplier.color);
    const aux = []
    const stock = product.stocks;

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
                    <p className={style.letras}>Proveedor/es</p>
                    {stock.map((prov, provIndex) => {
                        if (!aux.includes(prov.supplier.name)) {
                            aux.push(prov.supplier.name)
                            console.log(aux);
                            return(
                            <p style={{fontSize: "15px", fontFamily: "Calibri", fontWeight: "bold", margin: "0px 0px 0px 10px", color: prov.supplier.color}}>{prov.supplier.name}</p>)
                        }
                    })}
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "5vh", margin: "5px 0px 5px 0px"  }}>
                    <p className={style.letras}>Precio Unitario</p>
                    <input type="text" style={{ height: "15px" }} placeholder={`$${product.list_price}`}/>
                </div>

                <Divider variant="middle" component="li" sx={dividerStyle}/>

                <div style={{ display: "flex", flexDirection: "row", alignItems: "center"}}>
                    <h2 style={{ fontFamily: 'Calibri', fontSize: "20px", marginRight: "10px" }}>Datos de cada item</h2>
                    <Button 
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={botonCopiar}>
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
                            <input type="text" style={{ height: "15px", margin: "0px", paddingLeft: "5px" }} placeholder={prod.color}/>
                            <input type="text" style={{ height: "15px", margin: "0px", paddingLeft: "5px" }} placeholder={prod.serial_id}/>
                            <input type="text" style={{ height: "15px", margin: "0px", paddingLeft: "5px" }} placeholder={prod.battery_percent}/>
                            <input type="text" style={{ height: "15px", width: "70px", margin: "0px", paddingLeft: "5px" }} placeholder={prod.state}/>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={botonCopiar}>
                            </Button>
                        </div>
                    </div>
                ))}

                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    style={buttonStyle}>Guardar cambios
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
    height: "2em",
    width: "2em",
    minWidth: "0px",
    marginLeft: "10px",
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