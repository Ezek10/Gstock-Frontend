import React, { useState, useEffect, useRef } from "react";
import style from "./Tabs.module.css"
import TablaStock from "../Tablas/tablaStock";
import { Button } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import TablaTransactions from "../Tablas/tablaTransactions"
import { Modal } from '@mui/base/Modal';
import Fade from '@mui/material/Fade';
import Compras from "../../Components/Compras/Compras";
import Ventas from "../../Components/Ventas/Ventas";
import DataTransactions from "../dataTransactions/dataTransactions";
import DataTransactionsMobile from "../dataTransactions/dataTransactionsMobile";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { IoIosSearch } from "react-icons/io";
import GroupDetail from "../GroupDetail/GroupDetail";
import ArrowRight from '@mui/icons-material/ArrowRight';
import ArrowLeft from '@mui/icons-material/ArrowLeft';
import { format } from 'date-fns';

const Tabs = () => {

  const [filters, setFilters] = useState({
    page: 1,
    filter_by_buy_type: false,
    filter_by_sell_type: false,
    filter_by_product: null,
    filter_by_specific_date: null,
    filter_by_start_date: null,
    filter_by_end_date: null,
    filter_by_supplier: null,
    filter_by_client: null,
    filter_by_seller: null
  })
  const stocks = useSelector((state) => state.products) || [];
  const dispatch = useDispatch()

  // useStates
  const [search, setSearch] = useState("");
  const [filteredStocks, setFilteredStocks] = useState([]);
  const [openDetail, setOpenDetail] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const products = useSelector((state) => state.products) || [];
  const suppliers = useSelector((state) => state.suppliers) || [];
  const clients = useSelector((state) => state.clients) || [];
  const sellers = useSelector((state) => state.sellers) || [];
  // refs
  const modalRef = useRef(null);

  useEffect(() => {
    setFilteredStocks(stocks);
  }, [stocks]);

  const [openCompras, setOpenCompras] = useState(false);
  const [openFilters, setOpenFilters] = useState(false);

  const handleOpenCompras = () => setOpenCompras(true);
  const handleCloseCompras = () => setOpenCompras(false);

  const [openVentas, setOpenVentas] = useState(false);
  const handleOpenVentas = () => setOpenVentas(true);
  const handleCloseVentas = () => setOpenVentas(false);
  const handleCloseFilters = () => setOpenFilters(false);

  const handleSearch = (event) => {
    const search = event.target.value.toLowerCase();
    setSearch(search);

    // Filtrar los productos en base al término de búsqueda
    const filtered = stocks.filter((product) =>
      product.name.toLowerCase().includes(search)
    );
    setFilteredStocks(filtered);
  };

  const [activetab, setActiveTab] = useState(0);
  const seleccionar = (index) => {
    setActiveTab(index);
  }

  const markerPosition = activetab === 0 ? 50 : 0;

  const capitalizeWords = (str) => {
    if (!str) { return str }
    return str
      .split(' ') // Divide la cadena en palabras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
      .join(' '); // Une las palabras nuevamente
  };

  // Agregar la función de copiado
  const copyTableToClipboard = () => {
    // Filtrar solo productos con stock > 0
    const productsWithStock = stocks.filter(prod => prod.stocks.length > 0);

    // Función para determinar número de tabulaciones necesarias
    const getSpacesNeeded = (str, targetLength = 16) => {
      const length = str.length;
      const spacesNeeded = Math.max(0, targetLength - length); // Garantiza que no sea negativo
      return ' '.repeat(spacesNeeded);
    }

    // Crear el encabezado con tabulaciones
    const headerStock = ` Color${getSpacesNeeded("Color", 8)}bat.${getSpacesNeeded("bat.", 5)}$`;

    const rows = productsWithStock.map(prod => {
      const name = capitalizeWords(prod.name);

      // Procesar cada stock del producto
      const stockRows = prod.stocks.map(stock => {
        const color = stock.color || 'N/A';
        const colorPadding = getSpacesNeeded(color, 8);
        const batteryPercent = stock.battery_percent !== undefined ? `${stock.battery_percent}%` : 'N/A';
        const batteryPadding = getSpacesNeeded(batteryPercent, 5)
        const sellPrice = stock.sell_price ? `$${stock.sell_price}` : !prod.list_price ? 'N/A' : `$${prod.list_price}`;
        return ` ${color}${colorPadding}${batteryPercent}${batteryPadding}${sellPrice}`;
      });

      return [`${name}\n${headerStock}\n${stockRows.join('\n')}`];
    });

    // Unir todo el contenido
    const tableContent = `\`\`\`${rows.join('\n')}\`\`\``;

    // Copiar al portapapeles
    navigator.clipboard.writeText(tableContent)
      .then(() => {
        alert('Tabla copiada al portapapeles (solo productos con stock)');
      })
      .catch(err => {
        console.error('Error al copiar:', err);
        alert('Error al copiar la tabla');
      });

  };

  const handleCloseDetail = () => {
    setSelectedProduct(null)
    setOpenDetail(false)
  };

  const handleOpenDetail = (prod) => {
    setSelectedProduct(prod);
    setOpenDetail(true);
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


  return (
    <div activetab={`${activetab}00%`} className={style.container}>
      <ul className={style.tabs}>
        <li className={activetab == 0 ? style.active : ""} onClick={() => seleccionar(0)}>
          Stock
        </li>
        <li className={activetab == 1 ? style.active : ""} onClick={() => seleccionar(1)}>
          Transacciones
        </li>
        <span
          className={style.activeWindow}
          style={{ left: `${markerPosition}%` }}>
        </span>
      </ul>
      <div className={style.stockContainer}>
        {activetab === 0 &&
          <div className={style.stockTable}>
            <div className={style.tableStockAndCopy}>
              <TablaStock stocks={filteredStocks} onOpenDetail={handleOpenDetail} />
              <Button
                className={style.btnCopy}
                onClick={copyTableToClipboard}
                variant="outlined"
                size="small"
                target="_blank"
              >
                <ContentCopyIcon />
              </Button>
            </div>
            <div className={style.stockPanel}>
              <div className={style.yetAnotherContainer}>
                <div className={style.stockPanelInputContainer}>
                  <IoIosSearch className={style.stockPanelInputIcon} />
                  <input
                    type="text"
                    placeholder="Busca un producto"
                    className={style.stockPanelInput}
                    value={search}
                    onChange={handleSearch}
                  />
                </div>
                <div className={style.stockPanelBtn}>
                  <Button
                    onClick={handleOpenCompras}
                    variant="outlined"
                    target="_blank"
                    style={butonStyle}> + Compra
                  </Button>
                  <Button
                    onClick={handleOpenVentas}
                    variant="outlined"
                    target="_blank"
                    style={butonStyle}> + Venta
                  </Button>

                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openCompras}
                    onClose={handleCloseCompras}
                    closeAfterTransition
                    style={{ width: '100%' }}
                  >
                    <Fade in={openCompras}>
                      <Compras handleCloseCompras={handleCloseCompras} />
                    </Fade>
                  </Modal>

                  <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openVentas}
                    onClose={handleCloseVentas}
                    closeAfterTransition>
                    <Fade in={openVentas}>
                      <Ventas handleCloseVentas={handleCloseVentas} />
                    </Fade>
                  </Modal>

                  {selectedProduct && (
                    <Modal
                      aria-labelledby="transition-modal-title"
                      aria-describedby="transition-modal-description"
                      open={openDetail}
                      onClose={handleCloseDetail}
                      closeAfterTransition
                    >
                      <Fade in={openDetail}>
                        <GroupDetail
                          key={selectedProduct.id}
                          handleCloseDetail={handleCloseDetail}
                          products={selectedProduct}
                          setProducts={setSelectedProduct}
                          updateProductList={updateProduct}
                        />
                      </Fade>
                    </Modal>
                  )}
                </div>
                <div >
                  <div style={{ fontSize: "15px", textAlign: "center" }}>
                    <strong>Seleccione un producto</strong> de la tabla<br />
                    para acceder a los <strong>datos del grupo</strong>.
                  </div>
                </div>
              </div>
            </div>
          </div>}
        {activetab === 1 &&
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-start", marginTop: "10px" }}>
            <div className={style.container1}>
              <button
                className={`${openFilters ? style.btnOpenFilters : style.btnCloseFilters}`}
                onClick={() => setOpenFilters(!openFilters)}
              >

                {openFilters && (
                  <>
                    <img className={style.filterMobileImg} src='./src/assets/filtroMobile.png' alt="" />
                    <img src='./src/assets/openFilters.png' alt="" />
                  </>
                )}
                {
                  !openFilters && (
                    <>
                      <img className={style.filterMobileImg} src='./src/assets/filtroMobile2.png' alt="" />
                      <img src='./src/assets/openFilters.png' alt="" style={{ transform: 'scaleX(-1)' }} />
                    </>
                  )
                }
              </button>

              <div className={`${openFilters ? '' : style.containerFiltersMobile}`}>
                <DataTransactionsMobile filters={filters} setFilters={setFilters} handleCloseFilters={handleCloseFilters} />
              </div>

              <div className={style.container3}>
                <p className={style.textFilter}>Filtros marcados:</p>
                <p className={style.textFilter}>
                  {
                    filters.filter_by_product &&
                    <span>
                      Producto: {filters.filter_by_product ? products.find(el => el.id === filters.filter_by_product).name : "-"}<br />
                    </span>
                  }
                  {
                    filters.filter_by_start_date &&
                    <span>
                      Fecha: {`${format(new Date(filters.filter_by_start_date * 1000), "dd/MM/yy")}`}<br />
                    </span>
                  }
                  {
                    filters.filter_by_supplier &&
                    <span>
                      Proveedor: {filters.filter_by_supplier ? suppliers.find(el => el.id === filters.filter_by_supplier).name : "-"}<br />
                    </span>
                  }
                  {
                    filters.filter_by_client &&
                    <span>
                      Cliente: {filters.filter_by_client ? clients.find(el => el.id === filters.filter_by_client).name : "-"}<br />
                    </span>
                  }
                  {
                    filters.filter_by_seller &&
                    <span>
                      Vendedor: {filters.filter_by_seller ? sellers.find(el => el.id === filters.filter_by_seller).name : "-"}<br />
                    </span>
                  }
                </p>
              </div>
              <TablaTransactions filters={filters} />

              <div className={style.container2}>
                <DataTransactions filters={filters} setFilters={setFilters} />
              </div>

            </div>
          </div>}
      </div>
    </div>
  )
}

const butonStyle = {
  fontFamily: 'Mukta',
  fontWeight: 400,
  fontSize: 15,
  backgroundColor: "black",
  borderColor: "transparent",
  borderRadius: "50px",
  height: "2em",
  width: "45%",
  overflow: "clip",
  whiteSpace: "nowrap",
  textTransform: 'none',
  color: "white",
  boxSizing: "border-box",
  '&:hover': {
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "rgb(80, 80, 80)"
  }
}

export default Tabs;