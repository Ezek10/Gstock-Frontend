import { useState, useRef, useEffect } from "react";
import style from "./Payment.module.css";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';


const PagoSelector = ({ payment }) => {
    const [isOpenPago, setIsOpenPago] = useState(false);
    const [selectedPago, setSelectedPago] = useState('CASH'); // Valor inicial
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
        <div className={style.selector} style={{ position: 'relative' }}>
            <div 
                onClick={toggleDropdownPago} 
                style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            >
                <p className={style.letras}>
                    Pago <ArrowDropDownIcon sx={{ fontSize: 18 }} />
                </p>
                {/* Mostrar la opción seleccionada aquí, al lado del texto "Pago" */}
                <span style={{ marginLeft: '8px' }}>{paymentOptions[selectedPago]}</span>
            </div>
            {isOpenPago && (
                <div 
                    ref={dropdownRefPago}
                    style={{
                        position: 'absolute',
                        top: '30px', // Ajusta este valor según sea necesario
                        left: 0,
                        zIndex: 1000,
                        backgroundColor: 'white',
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        maxHeight: '200px',
                        overflowY: 'auto',
                        width: '185px'
                    }}
                >
                    {Object.keys(paymentOptions).map(option => (
                        <div 
                            key={option} 
                            onClick={() => handlePagoSelect(option)} 
                            style={{
                                padding: '5px 10px', 
                                cursor: 'pointer', 
                                transition: 'background-color 0.2s ease'
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#CECECE'; }} 
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                        >
                            {paymentOptions[option]} {/* Muestra el texto amigable */}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PagoSelector;
