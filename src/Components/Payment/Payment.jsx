import React, { useState } from "react"
import style from "./Payment.module.css"
import ArrowRightIcon from '@mui/icons-material/ArrowRight';


const Payment = ( { payment } ) => {

    const [ option, setOption ] = useState('CASH')

    const handlePagoChange = (event) => {
        const value = event.target.value
        setOption(value)
        payment(value)
        console.log(option);
        
    }

    return (

        <div className={style.selector}>
            <p className={style.letras}>Pago<ArrowRightIcon sx={{fontSize: 18}}/></p>
            
            <select name="contact_via" onChange={handlePagoChange} value={option}>
                <option value="CASH">Efectivo</option>
                <option value="TRANSFER">Transferencia</option>
                <option value="DEBIT">Débito</option>
                <option value="CREDIT">Crédito</option>
                <option value="CRYPTO">Cripto</option>
            </select>
            
        </div>
    )   
}

export default Payment;