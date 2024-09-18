import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { useEffect } from "react";
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../../Redux/actions";
import style from "./tablaTransactions.module.css"
import BuyTransactionDetail from "../TransactionDetail/BuyTransactionDetail";
import SellTransactionDetail from "../TransactionDetail/BuyTransactionDetail";

const TablaTransactions = ({filters}) => {

    const [emptyRowCount, setEmptyRowCount] = useState(0);
    const [openDetailBuyTransaction, setOpenDetailBuyTransaction] = useState(false);
    const [openDetailSellTransaction, setOpenDetailSellTransaction] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState([]);
    const modalRef = useRef(null);
    const dispatch = useDispatch()

    const handleOpenDetail = (prod) => {
        setSelectedTransaction(prod);
        if (prod.type==="BUY") {
            console.log(prod);
            setOpenDetailBuyTransaction(true);
        } else {
            setOpenDetailSellTransaction(true)
        }
    };

    const handleCloseDetail = () => {
        setSelectedTransaction(null)
        setOpenDetailBuyTransaction(false)
        setOpenDetailSellTransaction(false)
    };

    const transactions = useSelector((state) => state.transactions) || [];   

    useEffect(() => {
        dispatch(getTransactions(filters))
    }, [filters, dispatch])

    useEffect(() => {
        const calculateEmptyRows = () => {
            const tableHeight = window.innerHeight * 0.65;
            const rowHeight = 34;
            const displayedRows = transactions.length;
            const rowsThatFit = Math.floor(tableHeight / rowHeight);
            const emptyRows = Math.max(0, rowsThatFit - displayedRows);
            setEmptyRowCount(emptyRows);
        };

        calculateEmptyRows(); // Inicialmente calcula filas vacías

        window.addEventListener('resize', calculateEmptyRows);
        return () => window.removeEventListener('resize', calculateEmptyRows);
    }, [transactions]);

    const formatDate = (rawDate) => {
        const date = new Date(rawDate)
        const formattedDate = date.toLocaleDateString('es-ES', {
            day: '2-digit',
            month: '2-digit',
            year: '2-digit'
        });
        return formattedDate
    }

    const updateTransaction = (transaction) => {
        const updatedTransactions = [...transactions]
        const transactionIndex = updatedTransactions.findIndex(prod => prod.id === product.id);
        updatedTransactions[transactionIndex] = transaction;
        dispatch(temp => temp({
            type: "GET_TRANSACTIONS",
            payload: updatedTransactions,
        }))
    }

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
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ fontWeight: "bold", '&:hover': {cursor: "pointer"}, borderLeftWidth: "0px" }}>{prod.name}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: 'center', width: "15%", fontWeight: "bold", '&:hover': {cursor: "pointer"}  }}>{prod.type}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: "center", width: "15%", fontWeight: "bold", '&:hover': {cursor: "pointer"} }}>{prod.products.length}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: "center", width: "15%", fontWeight: "bold", '&:hover': {cursor: "pointer"} }}>{formatDate(prod.date)}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: "center", width: "15%", fontWeight: "bold", '&:hover': {cursor: "pointer"} }}>{prod.total}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: "center", width: "15%", fontWeight: "bold", '&:hover': {cursor: "pointer"}  }}>{prod.payment_method}</CustomTableCell>
                        </TableRow>
                    ))}
                    {Array.from({ length: emptyRowCount }).map((_, index) => (
                        <TableRow key={`empty-row-${index}`}>
                            <CustomTableCell sx={{borderLeftWidth: "0px" }}>&nbsp;</CustomTableCell>
                            <CustomTableCell>&nbsp;</CustomTableCell>
                            <CustomTableCell>&nbsp;</CustomTableCell>
                            <CustomTableCell>&nbsp;</CustomTableCell>
                            <CustomTableCell>&nbsp;</CustomTableCell>
                            <CustomTableCell>&nbsp;</CustomTableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openDetailBuyTransaction}
                    onClose={handleCloseDetail}
                    closeAfterTransition>
                    <Fade in={openDetailBuyTransaction}>
                        <div ref={modalRef}>
                            {selectedTransaction && <BuyTransactionDetail handleCloseDetail={handleCloseDetail} transaction={selectedTransaction} setTransaction={setSelectedTransaction} updateTransaction={updateTransaction}/>}
                        </div>
                    </Fade>
                </Modal>

                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openDetailSellTransaction}
                    onClose={handleCloseDetail}
                    closeAfterTransition>
                    <Fade in={openDetailSellTransaction}>
                        <div ref={modalRef}>
                            {selectedTransaction && <SellTransactionDetail handleCloseDetail={handleCloseDetail}/>}
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