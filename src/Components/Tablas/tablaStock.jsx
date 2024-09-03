import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import GroupDetail from "../GroupDetail/GroupDetail";
import { getProductsStocks } from "../../Redux/actions";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import warning from "../../assets/warning.png"
import style from "./tablaStock.module.css"

const TablaStock = () => {

    const [openDetail, setOpenDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const modalRef = useRef(null);
    const dispatch = useDispatch()

    const handleOpenDetail = (prod) => {
        setSelectedProduct(prod);
        setOpenDetail(true);
    };

    const handleCloseDetail = () => {
        setSelectedProduct(null)
        setOpenDetail(false)
    };

    const updateProduct = (product) => {
        const updatedProducts = [...stocks]
        const productIndex = updatedProducts.findIndex(prod => prod.id === product.id);
        updatedProducts[productIndex] = product;
        dispatch(temp => temp({
            type: "GET_PRODUCTS_STOCKS",
            payload: updatedProducts,
        }))
    }
    const stocks = useSelector((state) => state.products) || [];

    useEffect(() => {
        dispatch(getProductsStocks())
    }, [dispatch])
    

    const hasEmptyValue = (product) => {

        if (!product.stocks) return true;
        if (!product.list_price || product.list_price===0) return true;
        let isNotFull = true;
        product.stocks.forEach(item => {
            isNotFull &= !!item.color && !!item.battery_percent && !!item.serial_id
        });
        
        return isNotFull;
    };

    return(
        <div className={style.tabla}>
            <CustomTableContainer component={Paper} 
                sx={{
                    overflowY: "scroll",   
                    "&::-webkit-scrollbar": {
                        width: "7px",
                        borderRadius: "100%",
                        position: "absolute",
                    }, 
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "rgb(255, 255, 255)"
                    }, 
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "rgb(141, 141, 141)",
                        borderRadius: "5px",
                    }
                }} >
                <Table >
                    <TableHead>
                    <TableRow>
                            <HeaderTableCell></HeaderTableCell>
                            <HeaderTableCell sx={{border: "8px solid white",borderTopWidth:"0px",borderBottomWidth: "0px", borderLeftWidth: "0px" }}>Producto</HeaderTableCell>
                            <HeaderTableCell sx={{border: "8px solid white",borderTopWidth:"0px",borderBottomWidth: "0px"}}>Cantidad</HeaderTableCell>
                            <HeaderTableCell sx={{border: "4px solid white",borderTopWidth:"0px",borderBottomWidth: "0px"}}>Precio</HeaderTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody >
                    {stocks.map((prod) => (
                        <TableRow sx={{ '&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}} key={prod.id}>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ width: "3%",  padding: "0px 0px 0px 10px",fontWeight: "bold", '&:hover': {cursor: "pointer"},  }}>{!hasEmptyValue(prod) ? <img src={warning} alt="Warning" style={{height: "10px"}}/> : ""}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ width: "52%", padding: "0px", fontWeight: "bold", '&:hover': {cursor: "pointer"}, border: "4px solid white",borderTopWidth:"0px",borderBottomWidth: "0px", borderLeftWidth: "0px" }}>{prod.name}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: 'center', width: "20%", fontWeight: "bold", color: prod.stocks.length > 3 ? "black" : "red", '&:hover': {cursor: "pointer"},border: "8px solid white",borderTopWidth:"0px",borderBottomWidth: "0px"  }}>{prod.stocks.length ? prod.stocks.length : 0}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: "center", width: "25%", fontWeight: "bold", '&:hover': {cursor: "pointer"}, border: "4px solid white",borderTopWidth:"0px",borderBottomWidth: "0px" }}>{prod.list_price===null ? "Sin precio" : `$${prod.list_price}`}</CustomTableCell>
                        </TableRow>
                    ))}
                    
                    </TableBody>
                </Table>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openDetail}
                    onClose={handleCloseDetail}
                    closeAfterTransition>
                    <Fade in={openDetail}>
                        <div ref={modalRef}>
                            {selectedProduct && <GroupDetail handleCloseDetail={handleCloseDetail} products={selectedProduct} setProducts={setSelectedProduct} updateProductList={updateProduct}/>}
                        </div>
                    </Fade>
                </Modal>
            </CustomTableContainer>
        </div>
    )
}

const CustomTableCell = styled(TableCell)(({ theme }) => ({
    borderBottom: "1px solid transparent",
    backgroundColor: 'transparent',
    paddingTop: "5px",
    paddingBottom: "5px",
    height: "10px",
 
  }));

  const HeaderTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: 'center',
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    padding: "15px",
    fontSize: "20px",
    fontWeight: "600",
    background: "linear-gradient(to bottom, rgb(220, 220, 220), rgb(224, 224, 224))",
  }));

  const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    background: "linear-gradient(to bottom, rgb(220, 220, 220), rgb(255, 255, 255))", // Apply gradient background
    boxShadow: "0px 0px 0px 0px transparent",
    width: "100%",
    height: "65vh",
    position: "relative",
    overflow: "hidden"
  }));

export default TablaStock;