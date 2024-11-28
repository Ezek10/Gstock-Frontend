import { useState, useRef, useEffect } from "react";
import style from "./Payment.module.css";
import ArrowRightIcon from '@mui/icons-material/ArrowRight';



const PagoSelector = ({ payment, value }) => {
  const [isOpenPago, setIsOpenPago] = useState(false);
  const [selectedPago, setSelectedPago] = useState(value || 'CASH'); // Valor inicial
  const dropdownRefPago = useRef(null);

  const paymentOptions = {
    CASH: 'Efectivo',
    TRANSFER: 'Transferencia',
    DEBIT: 'Débito',
    CREDIT: 'Crédito',
    CRYPTO: 'Cripto'
  };

  const toggleDropdownPago = () => {
    setIsOpenPago(prev => !prev);
  };

  const handlePagoSelect = (option) => {
    setSelectedPago(option);
    setIsOpenPago(false);
    payment(option); // Llama a la función de pago con el nuevo valor
  };

  // Cerrar dropdown al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRefPago.current && !dropdownRefPago.current.contains(event.target)) {
        setIsOpenPago(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRefPago]);

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "44px" }}>
      <p className={style.letras}>Pago <ArrowRightIcon sx={{ fontSize: 18 }} /></p>
      <select 
        value={selectedPago}
        onChange={(e) => handlePagoSelect(e.target.value)}
      >
        {Object.keys(paymentOptions).map(option => (
          <option key={option} value={option}>
            {paymentOptions[option]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PagoSelector;
