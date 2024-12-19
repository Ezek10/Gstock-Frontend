import React, { useRef, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/system';
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import Tooltip from '@mui/material/Tooltip';
import GroupDetail from "../GroupDetail/GroupDetail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import warning from "../../assets/warning.png"
import style from "./tablaStock.module.css"

const TablaStock = ({ stocks, onOpenDetail }) => {
  const [emptyRowCount, setEmptyRowCount] = useState(0);

  useEffect(() => {
    const calculateEmptyRows = () => {
      const tableHeight = window.innerHeight * 0.65;
      const rowHeight = 36;
      const displayedRows = stocks.length;
      const rowsThatFit = Math.floor(tableHeight / rowHeight);
      const emptyRows = Math.max(0, rowsThatFit - displayedRows);
      setEmptyRowCount(emptyRows);
    };

    calculateEmptyRows(); // Inicialmente calcula filas vacías

    window.addEventListener('resize', calculateEmptyRows);
    return () => window.removeEventListener('resize', calculateEmptyRows);
  }, [stocks]);

  const capitalizeWords = (str) => {
    if (!str) { return str }
    return str
      .split(' ') // Divide la cadena en palabras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
      .join(' '); // Une las palabras nuevamente
  };

  const hasEmptyValue = (product) => {

    if (!product.stocks) return false;
    return product.stocks.some(item => item.missing_data === true);
  };

  return (
    <div className={style.tabla}>
      <CustomTableContainer component={Paper}
        className="customContainer"
        sx={{
          tableLayout: "auto",
          width: "86%",
          margin: "auto",
          padding: "0px"
        }}>
        <Table >
          <TableHead>
            <TableRow>
              <HeaderTableCell>
              </HeaderTableCell>
              <HeaderTableCell sx={{ border: "8px solid white", borderTopWidth: "0px", borderBottomWidth: "0px", borderLeftWidth: "0px" }}>Producto</HeaderTableCell>
              <HeaderTableCell sx={{ border: "8px solid white", borderTopWidth: "0px", borderBottomWidth: "0px" }}>Cantidad</HeaderTableCell>
              <HeaderTableCell sx={{ border: "4px solid white", borderTopWidth: "0px", borderBottomWidth: "0px" }}>Precio Venta</HeaderTableCell>
            </TableRow>
          </TableHead>
          <TableBody >
            {stocks.map((prod) => (
              <TableRow sx={{ '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' } }} key={prod.id}>
                <CustomTableCell onClick={() => onOpenDetail(prod)} sx={{ width: "3%", padding: "0px 0px 0px 10px", '&:hover': { cursor: "pointer" }, }}>{hasEmptyValue(prod) ? (<Tooltip title="Faltan datos en algun item de este producto" arrow><img src={warning} alt="Warning" style={{ height: "10px" }} /> </Tooltip>) : ""}</CustomTableCell>
                <CustomTableCell onClick={() => onOpenDetail(prod)} sx={{ width: "52%", padding: "0px", '&:hover': { cursor: "pointer" }, border: "4px solid white", borderTopWidth: "0px", borderBottomWidth: "0px", borderLeftWidth: "0px" }}>{capitalizeWords(prod.name)}</CustomTableCell>
                <CustomTableCell onClick={() => onOpenDetail(prod)} sx={{ textAlign: 'center', width: "20%", color: prod.stocks.length > 3 ? "black" : "red", '&:hover': { cursor: "pointer" }, border: "8px solid white", borderTopWidth: "0px", borderBottomWidth: "0px" }}>{prod.stocks.length ? prod.stocks.length : 0}</CustomTableCell>
                <CustomTableCell onClick={() => onOpenDetail(prod)} sx={{ textAlign: "center", width: "25%", '&:hover': { cursor: "pointer" }, border: "4px solid white", borderTopWidth: "0px", borderBottomWidth: "0px" }}>{prod.list_price === null ? "Sin precio" : `$${prod.list_price}`}</CustomTableCell>
              </TableRow>
            ))}
            {Array.from({ length: emptyRowCount }).map((_, index) => (
              <TableRow key={`empty-row-${index}`}>
                <CustomTableCell sx={{ width: "3%", padding: "0px 0px 0px 10px", borderBottom: "none" }}>&nbsp;</CustomTableCell>
                <CustomTableCell sx={{ width: "52%", padding: "0px", border: "4px solid white", borderTopWidth: "0px", borderBottomWidth: "0px", borderLeftWidth: "0px" }}>&nbsp;</CustomTableCell>
                <CustomTableCell sx={{ textAlign: 'center', width: "20%", border: "8px solid white", borderTopWidth: "0px", borderBottomWidth: "0px" }}>&nbsp;</CustomTableCell>
                <CustomTableCell sx={{ textAlign: "center", width: "25%", border: "4px solid white", borderTopWidth: "0px", borderBottomWidth: "0px" }}>&nbsp;</CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </CustomTableContainer>
    </div>
  )
}

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Mukta',
  fontSize: 20,
  fontWeight: 400,
  borderBottom: "1px solid transparent",
  backgroundColor: 'transparent',
  paddingTop: "2px",
  paddingBottom: "2px",
  whiteSpace: 'nowrap'
}));

const HeaderTableCell = styled(TableCell)(({ theme }) => ({
  fontFamily: 'Mukta',
  fontSize: 20,
  fontWeight: 600,
  textAlign: 'center',
  backgroundColor: "transparent",
  borderBottomColor: "transparent",
  padding: "15px",
  background: "linear-gradient(to bottom, rgb(220, 220, 220), rgb(224, 224, 224))",
  whiteSpace: 'nowrap'
}));

const CustomTableContainer = styled(TableContainer)(({ theme }) => ({
  background: "linear-gradient(to bottom, rgb(220, 220, 220), rgb(255, 255, 255))",
  boxShadow: "0px 0px 0px 0px transparent",
  width: "100%",
  height: "auto",
  overflowY: "auto",
  position: "relative",
}));

export default TablaStock;