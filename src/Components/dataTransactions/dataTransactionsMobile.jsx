import React, { useState, useRef, useEffect } from "react";
import style from "./dataTransactions.module.css"
import { useDispatch, useSelector } from "react-redux";
import {
  getTransactionCards,
  updateFilters,
  resetFilters
} from "../../Redux/actions";
import { Divider } from "@mui/material";
import CalendarFiltersMobile from "../Calendar/CalendarFiltersMobile";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'; // flechita
import DeleteOutlineIcon from '@mui/icons-material/Delete'; //Tacho de basura de eliminar filtros
import filtroIcon from "../../assets/filtro.png"

const DataTransactions = React.forwardRef(({ filters, setFilters, handleCloseFilters }, ref) => {

  const cards = useSelector((state) => state.cards) || [];
  const products = useSelector((state) => state.products) || [];
  const suppliers = useSelector((state) => state.suppliers) || [];
  const clients = useSelector((state) => state.clients) || [];
  const sellers = useSelector((state) => state.sellers) || [];

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getTransactionCards(filters));
  }, [filters, dispatch])

  useEffect(() => {
    dispatch(updateFilters(filters))
  }, [filters])

  const resetFilters = () => {
    setFilters({
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
    });
    setSelectedFilter('both'); // Agregamos esta línea para restaurar la selección
  };

  const capitalizeWords = (str) => {
    if (!str) { return str }
    return str
      .split(' ') // Divide la cadena en palabras
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
      .join(' '); // Une las palabras nuevamente
  };

  const [isOpenProduct, setIsOpenProduct] = useState(false);
  const [isOpenSupplier, setIsOpenSupplier] = useState(false);
  const [isOpenClient, setIsOpenClient] = useState(false);
  const [isOpenSeller, setIsOpenSeller] = useState(false);


  const dropdownRef = useRef(null);
  const dropdownRefSupplier = useRef(null);
  const dropdownRefClient = useRef(null);
  const dropdownRefSeller = useRef(null);


  const toggleDropdownProduct = () => setIsOpenProduct(!isOpenProduct);
  const toggleDropdownSupplier = () => setIsOpenSupplier(!isOpenSupplier);
  const toggleDropdownClient = () => setIsOpenClient(!isOpenClient);
  const toggleDropdownSeller = () => setIsOpenSeller(!isOpenSeller);

  const [selectedFilter, setSelectedFilter] = useState('both'); // 'purchases', 'sales', 'both'

  // Estilos base para los filtro de Compras y Ventas
  const baseButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    padding: '8px 10px',
    color: 'black',
    border: '1px solid #e0e0e0',
    borderRadius: '20px',
    cursor: 'pointer',
    height: "27px",
    transition: 'all 0.3s ease',
    whiteSpace: 'nowrap',
    marginRight: '8px'
  };

  // Estilos para botón seleccionado y no seleccionado
  const getButtonStyle = (buttonType) => ({
    ...baseButtonStyle,
    backgroundColor: selectedFilter === buttonType ? 'white' : '#CECECE',
    color: selectedFilter === buttonType ? 'black' : '#888888',
    border: selectedFilter === buttonType ? '1px solid #e0e0e0' : '1px solid #858585', // Borde actualizado aquí
  });

  const handleComprasSelect = () => {
    setSelectedFilter('purchases');
    setFilters({ ...filters, filter_by_sell_type: true, filter_by_buy_type: false });
  };

  const handleVentasSelect = () => {
    setSelectedFilter('sales');
    setFilters({ ...filters, filter_by_sell_type: false, filter_by_buy_type: true });
  };

  const handleComprasVentasSelect = () => {
    setSelectedFilter('both');
    setFilters({ ...filters, filter_by_sell_type: false, filter_by_buy_type: false });
  };

  const handleProductSelect = (productId) => {
    setFilters({ ...filters, filter_by_product: productId });
    setIsOpenProduct(false);
  };

  const handleSupplierSelect = (supplierID) => {
    setFilters({ ...filters, filter_by_supplier: supplierID });
    setIsOpenSupplier(false);
  };

  const handleClientSelect = (clientID) => {
    setFilters({ ...filters, filter_by_client: clientID });
    setIsOpenClient(false);
  };

  const handleSellerSelect = (sellerID) => {
    setFilters({ ...filters, filter_by_seller: sellerID });
    setIsOpenSeller(false);
  };


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpenProduct(false);// Aquí se cierra el dropdown de productos
      }
      if (dropdownRefSupplier.current && !dropdownRefSupplier.current.contains(event.target)) {
        setIsOpenSupplier(false); // Aquí se cierra el dropdown de proveedores
      }
      if (dropdownRefClient.current && !dropdownRefClient.current.contains(event.target)) {
        setIsOpenClient(false); // Aquí se cierra el dropdown de clientes
      }
      if (dropdownRefSeller.current && !dropdownRefSeller.current.contains(event.target)) {
        setIsOpenSeller(false); // Aquí se cierra el dropdown de vendedores
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  return (
    <div className={style.containerTransactions}
      ref={ref}
    >
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", padding: '10px' }}>
        <button
          style={getButtonStyle('purchases')}
          onMouseEnter={(e) => {
            if (selectedFilter !== 'purchases') {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={handleComprasSelect}
        >
          Compras
        </button>
        <button
          style={getButtonStyle('sales')}
          onMouseEnter={(e) => {
            if (selectedFilter !== 'sales') {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={handleVentasSelect}
        >
          Ventas
        </button>
        <button
          style={getButtonStyle('both')}
          onMouseEnter={(e) => {
            if (selectedFilter !== 'both') {
              e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}
          onClick={handleComprasVentasSelect}
        >
          Compras + Ventas
        </button>

      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      {/*Filtro Producto*/}
      <div style={{ alignItems: "start", display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div className={style.dropdown}>
          <div ref={dropdownRef} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div
              onClick={toggleDropdownProduct}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                marginRight: "5px"
              }}
            >
              Producto
              <ArrowDropDownIcon sx={{ fontSize: 18, marginLeft: '5px' }} /> {/* Espacio entre "Producto" y flecha */}
            </div>
            {isOpenProduct && (
              <div
                className={style.scroll}
                style={{
                  position: 'absolute',
                  fontSize: 14,
                  top: '100%',
                  left: 0,
                  zIndex: 1001,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  width: '185px' // Ancho del dropdown
                }}>
                <div onClick={() => handleProductSelect(null)} style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4285F4'; }} // color gris de fondo al pasar el mouse
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }} // restablecer fondo al salir el mouse
                >
                  Todos los productos
                </div>
                {products && products.map(prod => (
                  <div
                    key={prod.id}
                    onClick={() => handleProductSelect(prod.id)}
                    style={{ padding: '5px 10px', cursor: 'pointer', transition: 'background-color 0.2s ease', }} // transicion de fondo
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4285F4'; }} // color gris de fondo al pasar el mouse
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }} // restablecer fondo al salir el mouse
                  >
                    {capitalizeWords(prod.name)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ whiteSpace: 'nowrap', textOverflow: 'ellipsis', fontSize: 14, fontWeight: 275 }}>
            {filters.filter_by_product
              ? capitalizeWords(products.find(p => p.id === filters.filter_by_product)?.name || '')
              : ""}
          </div>

        </div>

        <Divider variant="middle" component="li" sx={dividerStyle} />


        {/*Filtro Fecha*/}
        <CalendarFiltersMobile
          filters={filters}
          setFilters={setFilters}
        />
      </div>

      <Divider variant="middle" component="li" sx={dividerStyle} />

      {/* Filtro Proveedor */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "start", gap: '10px' }}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div ref={dropdownRefSupplier} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <div
              onClick={toggleDropdownSupplier}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                marginRight: "5px"
              }}
            >
              Proveedor
              <ArrowDropDownIcon sx={{ fontSize: 18, marginLeft: '5px' }} />
            </div>
            {isOpenSupplier && (
              <div
                className={style.scroll}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  fontSize: 14,
                  zIndex: 1000,
                  backgroundColor: 'white',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  width: '185px'
                }}>
                <div onClick={() => handleSupplierSelect(null)} style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4285F4'; }} // color gris de fondo al pasar el mouse
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }} // restablecer fondo al salir el mouse
                >
                  Todos los proveedores
                </div>
                {suppliers && suppliers.map(sup => (
                  <div
                    key={sup.id}
                    onClick={() => handleSupplierSelect(sup.id)}
                    style={{ padding: '5px 10px', cursor: 'pointer', transition: 'background-color 0.2s ease', }} // transicion de fondo
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4285F4'; }} // color gris de fondo al pasar el mouse
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }} // restablecer fondo al salir el mouse
                  >
                    {capitalizeWords(sup.name)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginLeft: '5px', width: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 14, fontWeight: 275 }}>
            {filters.filter_by_supplier
              ? capitalizeWords(suppliers.find(s => s.id === filters.filter_by_supplier)?.name || '')
              : ""}

          </div>
        </div>


        <Divider variant="middle" component="li" sx={dividerStyle} />

        {/* Filtro Clientes */}

        <div style={{ display: "flex", flexDirection: "row" }}>
          <div ref={dropdownRefClient} style={{ position: 'relative' }}>
            <div
              onClick={toggleDropdownClient}
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                cursor: "pointer",
                marginRight: "5px"
              }}
            >
              Cliente
              <ArrowDropDownIcon sx={{ fontSize: 18 }} />
            </div>
            {isOpenClient && (
              <div className={style.scroll}
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  zIndex: 1000,
                  fontSize: 14,
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                  maxHeight: '200px',
                  overflowY: 'auto',
                  width: '170px',
                }}>
                <div onClick={() => handleClientSelect(null)} style={{ padding: '5px 10px', cursor: 'pointer' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4285F4'; }} // color gris de fondo al pasar el mouse
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }} // restablecer fondo al salir el mouse
                >
                  Todos los clientes
                </div>
                {clients && clients.map(client => (
                  <div
                    key={client.id}
                    onClick={() => handleClientSelect(client.id)}
                    style={{ padding: '5px 10px', cursor: 'pointer', transition: 'background-color 0.2s ease', }} // transicion de fondo
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4285F4'; }} // color gris de fondo al pasar el mouse
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }} // restablecer fondo al salir el mouse
                  >
                    {capitalizeWords(client.name)}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div style={{ marginLeft: '10px', fontSize: 14, fontWeight: 275 }}>
            {filters.filter_by_client
              ? capitalizeWords(clients.find(c => c.id === filters.filter_by_client)?.name || '')
              : ""}
          </div>
        </div>

      </div>


      <Divider variant="middle" component="li" sx={dividerStyle} />

      {/* Filtro Vendedor */}
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <div ref={dropdownRefSeller} style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <div
            onClick={toggleDropdownSeller}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "5px"
            }}
          >
            Vendedor
            <ArrowDropDownIcon sx={{ fontSize: 18, marginLeft: '5px' }} />
          </div>
          {isOpenSeller && (
            <div
              className={style.scroll}
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                zIndex: 1000,
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px',
                maxHeight: '200px',
                overflowY: 'auto',
                width: '185px'
              }}>
              <div onClick={() => handleSellerSelect(null)} style={{ padding: '5px 10px', cursor: 'pointer' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4285F4'; }} // color gris de fondo al pasar el mouse
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }} // restablecer fondo al salir el mouse
              >
                Todos los vendedores
              </div>
              {sellers && sellers.map(seller => (
                <div
                  key={seller.id}
                  onClick={() => handleSellerSelect(seller.id)}
                  style={{ padding: '5px 10px', cursor: 'pointer', transition: 'background-color 0.2s ease', }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#4285F4'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                >
                  {capitalizeWords(seller.name)}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ marginLeft: '5px', width: '100px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', fontSize: 14, fontWeight: 275 }}>
          {filters.filter_by_seller
            ? capitalizeWords(sellers.find(s => s.id === filters.filter_by_seller)?.name || '')
            : ""}
        </div>
        <button
          style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px 10px',
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #e0e0e0',
            borderRadius: '20px',
            cursor: 'pointer',
            height: "27px",
            transition: 'all 0.3s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0,0,0,0.2)';
          }}
          onClick={resetFilters}
        >
          <DeleteOutlineIcon style={{ marginRight: '2px', fontSize: '18px', marginBottom: "2px" }} />
          Eliminar filtros
        </button>
      </div>

      {/* Contenedor para el Divider y la tarjeta de ganancias */}
      {/* Divider */}
      <Divider variant="middle" component="li" sx={{
        ...dividerStyle,
        margin: '0',  // Elimina cualquier margen existente
        width: '100%',  // Asegura que el divisor ocupe todo el ancho
      }} />

      {/* Tarjeta de ganancias */}
      <div className={style.cards}>
        <p style={{ margin: "5px 0px 0px 20px", fontWeight: 500 }}>GANANCIAS TOTALES</p>
        <p style={{ display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "-15px 10px -10px 0px", fontSize: "50px", fontWeight: "800" }}>${cards.earns}</p>
      </div>

      {/* Tarjeta de productos vendidos */}
      <div className={style.cards}>
        <p style={{ margin: "5px 0px 0px 20px" }}>PRODUCTOS VENDIDOS</p>
        <p style={{ display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "-15px 10px -10px 0px", fontSize: "50px", fontWeight: "800" }}>{cards.product_sold}</p>
      </div>

      {/* Tarjeta de productos comprados */}
      <div className={style.cards}>
        <p style={{ margin: "5px 0px 0px 20px" }}>PRODUCTOS COMPRADOS</p>
        <p style={{ display: "flex", justifyContent: "flex-end", color: "#8C8C8C", margin: "-15px 10px -10px 0px", fontSize: "50px", fontWeight: "800" }}>{cards.product_bought}</p>
      </div>

      {/* Tarjeta de TOP Vendedores */}
      <div className={style.cards} style={{ height: "110px" }}>
        <p style={{ margin: "5px 0px 0px 20px" }}>VENDEDORES</p>
        <div style={{ display: "flex", flexDirection: "column", color: "#8C8C8C", margin: "-10px 10px -10px 10px", paddingBottom: 10 }}>
          {cards.sellers && Object.keys(cards.sellers).length > 0
            ? Object.entries(cards.sellers)
              .sort((a, b) => b[1] - a[1]) // Ordenar de mayor a menor
              .slice(0, 3) // Obtener solo los primeros 3
              .map(([key, value]) => (
                <p key={key} style={{ margin: "0px", textAlign: "right" }}>{key} ({value})</p>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
              <p key={index} style={{ margin: "0px", textAlign: "right" }}>-</p>
            ))
          }
        </div>
      </div>

      {/* Tarjeta de Canal de Venta */}
      <div className={style.cards} style={{ height: "110px" }}>
        <p style={{ margin: "5px 0px 0px 20px" }}>CANAL DE VENTA</p>
        <div style={{ display: "flex", flexDirection: "column", color: "#8C8C8C", margin: "-10px 10px -10px 10px", paddingBottom: 10 }}>
          {cards.channels && Object.keys(cards.channels).length > 0
            ? Object.entries(cards.channels)
              .sort((a, b) => b[1] - a[1]) // Ordenar de mayor a menor
              .slice(0, 3) // Obtener solo los primeros 3
              .map(([key, value]) => (
                <p key={key} style={{ margin: "0px 0px 0px 0px", textAlign: "right" }}>{key} ({value.toFixed(2)})</p>
              ))
            : Array.from({ length: 3 }).map((_, index) => (
              <p key={index} style={{ margin: "0px", textAlign: "right" }}>-</p>
            ))
          }
        </div>
      </div>
    </div>
  )
})

DataTransactions.displayName = "DataTransactions"

const dividerStyle = {
  borderColor: 'transparent',
  background: 'linear-gradient(to right, grey, rgb(201, 201, 201))',
  margin: '1px',
  marginTop: '5px',
  padding: "0px",
  height: "1px",
  width: "90%",
  '&:hover': {
    cursor: "none"
  }
};

export default DataTransactions;