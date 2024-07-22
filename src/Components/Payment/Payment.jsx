import React, { useState } from "react"
import { Divider, Select, MenuItem, InputLabel, FormControl, Button } from "@mui/material";
import style from "./Payment.module.css"


const Payment = ( { payment } ) => {

    const [ option, setOption ] = useState('CASH')

    const handlePagoChange = (event) => {
        console.log(event);
        const value = event.target.value
        setOption(value)
        if (payment){
            payment(value)
        }
    }

    return (

        <div style={{display: "flex", justifyContent: "flex-start", alignItems: "center"}}>
            <p className={style.letras}>Pago</p>
            <FormControl variant="standard" 
                sx={{ 
                    m: 0, 
                    width: "25px" }}>
                <Select 
                    labelId="dropdown-label"
                    id="dropdown"
                    value={option}
                    label="Pago"
                    onChange={handlePagoChange}
                    renderValue={()=> null}
                    sx={{
                        '& .MuiSelect-select': {
                            paddingRight: '0px', // Cambia el valor de padding-right aquí
                            minWidth: '16px', // Cambia el valor de min-width aquí
                            borderBottom: "0px",
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: 'transparent', // Remover el borde del outline
                            },
                            '&:focus': {
                                backgroundColor: 'transparent', // Puedes agregar otros estilos aquí si es necesario
                            },
                        },
                    }}>
                    <MenuItem value={"CASH"} className={style.letras}>Efectivo</MenuItem>
                    <MenuItem value={"TRANSFER"} className={style.letras}>Tranferencia</MenuItem>
                    <MenuItem value={"DEBIT"} className={style.letras}>Débito</MenuItem>
                    <MenuItem value={"CREDIT"} className={style.letras}>Crédito</MenuItem>
                    <MenuItem value={"CRYPTO"} className={style.letras}>Cripto</MenuItem>
                    
                </Select>
            </FormControl>
            <p style={{ display: "flex", alignSelf: "center", marginLeft: "1rem", fontFamily: 'Calibri', fontWeight: "bold" }}>
                {option === 'CASH' ? "Efectivo" : 
                option === 'TRANSFER' ? "Transferencia" : 
                option === 'DEBIT' ? "Débito" :
                option === 'CREDIT' ? "Crédito" : "Cripto"}
                </p>
        </div>
    )   
}

export default Payment;