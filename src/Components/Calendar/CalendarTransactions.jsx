import React, { useState, useRef, useEffect } from "react";
import { Button, Box, Popper } from "@mui/material";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Fade from '@mui/material/Fade';
import { Calendar } from 'react-date-range'; 
import style from "./Calendar.module.css";
import { format } from 'date-fns';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CalendarTransactions = ({ onDateChange, value }) => {
    const anchorRef = useRef(null); // Referencia para el botón que activa el calendario
    const calendarRef = useRef(null); // Nueva referencia para el calendario

    const [openCalendar, setCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(value || new Date());

    const handleCalendarToggle = () => {
        setCalendar((prevOpen) => !prevOpen);
    };

    const handleDateChange = (date) => {
        setSelectedDate(date); 
        if (onDateChange) {
            onDateChange(date);
        }
        setCalendar(false);
    };

    // Cerrar el calendario solo si se hace clic fuera del contenedor del calendario y el botón
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                anchorRef.current && 
                !anchorRef.current.contains(event.target) &&
                calendarRef.current && 
                !calendarRef.current.contains(event.target) // Añadir esta condición para evitar cerrar cuando se hace clic dentro del calendario
            ) {
                setCalendar(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [anchorRef, calendarRef]);

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "42px"}}>
            <div ref={anchorRef} onClick={handleCalendarToggle} style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <p className={style.letras} style={{ cursor: 'pointer' }}>*Fecha</p>
                <ArrowDropDownIcon sx={{ fontSize: 18 }} style={{ cursor: 'pointer' }} />
            </div>
            <p style={{fontSize:14, marginLeft: '8px'}}>{format(selectedDate, "dd/MM/yy")}</p>
            <Popper
                open={openCalendar}
                anchorEl={anchorRef.current} 
                placement="bottom-start"
                style={{ zIndex: "20", borderRadius: "5px", maxWidth: "90vw" }} 
                modifiers={[
                    {
                        name: 'preventOverflow',
                        options: {
                            boundary: 'window',
                            altBoundary: true,
                            tether: false,
                        },
                    },
                    {
                        name: 'flip',
                        options: {
                            fallbackPlacements: ['bottom-start', 'bottom'],
                        },
                    },
                ]}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Box
                            ref={calendarRef} // Asignamos la referencia aquí
                            sx={{
                                maxWidth: "100%", 
                                '.rdrCalendarWrapper': {
                                    backgroundColor: '#ffffff',
                                    borderRadius: "5px",
                                    border: "2px solid black",
                                    overflow: "hidden",
                                    maxWidth: "90vw", 
                                },
                                '.rdrDay_selected': {
                                    backgroundColor: '#000000', // Fondo negro para la fecha seleccionada
                                    color: '#ffffff', // Texto blanco para la fecha seleccionada
                                },
                                '.rdrDayToday .rdrDayNumber span': {
                                    '&:after': {
                                        background: "#000000", // Cambiar estilo del día actual a negro
                                    }
                                },
                                '.rdrDay_day': {
                                    color: '#000000', // Texto en negro para días normales
                                },
                            }}
                        >
                            <Calendar
                                date={selectedDate} 
                                onChange={handleDateChange}
                                showMonthArrow={false}
                            />
                        </Box>
                    </Fade>
                )}
            </Popper>
        </div>
    );
}

const botonCopiar = {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: "5px",
    color: "black",
    height: "2.1em",
    width: "2.1em",
    minWidth: "0px",
    marginLeft: "30px",
    '&:hover': {
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"
    }
}

export default CalendarTransactions;
