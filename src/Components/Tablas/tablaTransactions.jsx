import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../Redux/actions";
import style from "./tablaTransactions.module.css"

const TablaTransactions = () => {

    const [openDetail, setOpenDetail] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState([]);
    const modalRef = useRef(null);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTransactions())
    }, [dispatch])
    
    const transactions = useSelector((state) => state.transactions) || [];

    console.log(transactions);
    
    
    return(
        <div className={style.tabla}>
            <CustomTableContainer component={Paper} 
                sx={{overflowY:"scroll", 
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
                        }}}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                    <TableRow>
                            <HeaderTableCell sx={{borderLeftWidth: "0px" }}>Nombre</HeaderTableCell>
                            <HeaderTableCell>Tipo</HeaderTableCell>
                            <HeaderTableCell>Cantidad</HeaderTableCell>
                            <HeaderTableCell>Fecha</HeaderTableCell>
                            <HeaderTableCell>Monto</HeaderTableCell>
                            <HeaderTableCell>Pago</HeaderTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody >
                    {transactions.map((prod) => (
                        <TableRow sx={{ '&:hover': {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}} key={prod.id}>
                            {/* <CustomTableCell sx={{ width: "3%",  padding: "0px 0px 0px 10px",fontWeight: "bold", '&:hover': {cursor: "pointer"} }}>{!hasEmptyValue(prod) ? <img src={warning} alt="Warning" style={{height: "10px"}}/> : ""}</CustomTableCell> */}
                            <CustomTableCell sx={{ width: "35%", fontWeight: "bold", '&:hover': {cursor: "pointer"}, borderLeftWidth: "0px" }}>{prod.name}</CustomTableCell>
                            <CustomTableCell sx={{ textAlign: 'center', width: "10%", fontWeight: "bold", '&:hover': {cursor: "pointer"}  }}>{prod.type}</CustomTableCell>
                            <CustomTableCell sx={{ textAlign: "center", width: "15%", fontWeight: "bold", '&:hover': {cursor: "pointer"} }}>{}</CustomTableCell>
                            <CustomTableCell sx={{ textAlign: "center", width: "15%", fontWeight: "bold", '&:hover': {cursor: "pointer"} }}>{}</CustomTableCell>
                            <CustomTableCell sx={{ textAlign: "center", width: "15%", fontWeight: "bold", '&:hover': {cursor: "pointer"} }}>{prod.total}</CustomTableCell>
                            <CustomTableCell sx={{ textAlign: "center", width: "10%", fontWeight: "bold", '&:hover': {cursor: "pointer"}  }}>{prod.payment_method}</CustomTableCell>
                        </TableRow>
                    ))}
                    
                    </TableBody>
                </Table>
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
    border: "4px solid white",
    borderTopWidth:"0px",
    borderBottomWidth: "0px",
  }));

  const HeaderTableCell = styled(TableCell)(({ theme }) => ({
    textAlign: 'center',
    backgroundColor: "transparent",
    borderBottomColor: "transparent",
    borderTopColor: "transparent",
    padding: "15px",
    fontSize: "20px",
    fontWeight: "600",
    overflow: "hidden",
    border: "4px solid white",
    borderTopWidth:"0px",
    borderBottomWidth: "0px",
    background: "linear-gradient(to bottom, rgb(220, 220, 220), rgb(224, 224, 224))",
  }));

  const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    background: "linear-gradient(to bottom, rgb(220, 220, 220), rgb(255, 255, 255))", // Apply gradient background
    boxShadow: "0px 0px 0px 0px transparent",
    position: "relative",
    width: "100%",
    height: "65vh",
    overflow: "hidden"
  }));

export default TablaTransactions;