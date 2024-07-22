import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import stock from "../../assets/stock"
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import GroupDetail from "../GroupDetail/GroupDetail";
import { getProductsStocks } from "../../Redux/actions";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

    useEffect(() => {
        dispatch(getProductsStocks())
    }, [dispatch])
    
    const stocks = stock.result.content;

    return(
        <div style={{ margin: "1.5%" }}>
            <CustomTableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                            <HeaderTableCell>Producto</HeaderTableCell>
                            <HeaderTableCell>Cantidad</HeaderTableCell>
                            <HeaderTableCell>Precio</HeaderTableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {stocks.map((prod) => (
                        <TableRow key={prod.id}>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ width: "55%", fontWeight: "bold", paddingLeft: "40px", '&:hover': {cursor: "pointer"} }}>{prod.name}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: 'center', width: "20%", fontWeight: "bold" }}>{prod.stocks.length}</CustomTableCell>
                            <CustomTableCell onClick={() => handleOpenDetail(prod)} sx={{ textAlign: "end", width: "25%", paddingRight: "40px", fontWeight: "bold" }}>${prod.list_price}</CustomTableCell>
                        </TableRow>
                    ))}
                    
                    </TableBody>
                </Table>
                <VerticalLine style={{ left: "55%" }} />
                <VerticalLine style={{ left: "75%" }} />
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openDetail}
                    onClose={handleCloseDetail}
                    closeAfterTransition>
                    <Fade in={openDetail}>
                        <div ref={modalRef}>
                            {selectedProduct && <GroupDetail handleCloseDetail={handleCloseDetail} product={selectedProduct} />}
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
    fontSize: "18px",
    fontWeight: "bold"
  }));

  const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
    background: "linear-gradient(to bottom, rgb(220, 220, 220), rgb(255, 255, 255))", // Apply gradient background
    boxShadow: "0px 0px 0px 0px transparent",
    width: "100%",
    height: "50vh",
    position: "relative",
    overflow: "hidden"
  }));

  const VerticalLine = styled('div')({
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '5px',
    backgroundColor: 'white',
  });

export default TablaStock;