import React, { useState, useRef, useEffect } from "react";
import { Button, Box, Popper } from "@mui/material";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Fade from '@mui/material/Fade';
import { DateRange } from 'react-date-range';
import style from "./Calendar.module.css"
import { format } from 'date-fns';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

const CalendarFilters = ({ filters, setFilters }) => {

    const anchorDateRef = useRef(null);
    const anchorCalendarRef = useRef(null);
    const [openCalendar, setCalendar] = useState(false);
    const [tempDate, setTempDate] = useState([
        {
            startDate: null,
            endDate: null,
            key: 'selection'
        }
    ]);
    const [date, setDate] = useState(tempDate);

    const handleCalendar = () => {
        setCalendar((prevOpen) => !prevOpen);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (anchorDateRef.current.contains(event.target)) {
                return
            }
            if (!anchorCalendarRef.current.contains(event.target)) {
                setCalendar(false);  // Cierra el calendario
            }
        };

        if (openCalendar) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
            // Solo actualiza los filtros cuando el calendario se cierra
            if (tempDate[0].startDate) {
                const { startDate, endDate } = tempDate[0];
                // Ajustar el startDate a las 00:00 y el endDate a las 23:59
                const updatedStartDate = new Date(startDate.setHours(0, 0, 0, 0));
                const updatedEndDate = new Date(endDate.setHours(23, 59, 59, 999));

                // Actualiza los filtros con las fechas en epoch (segundos)
                setFilters(prevFilters => ({
                    ...prevFilters,
                    filter_by_start_date: Math.floor(updatedStartDate.getTime() / 1000),
                    filter_by_end_date: Math.floor(updatedEndDate.getTime() / 1000)
                }));
                setDate(tempDate);
            }
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openCalendar, tempDate, setFilters]);

    const handleDateChange = (item) => {
        setTempDate([item.selection]);
        if (item.selection.startDate != item.selection.endDate){
            setCalendar(false)
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "42px" }}>
            <p className={style.letrasWithMargin}>Fecha <ArrowDropDownIcon sx={{fontSize: 18}}/></p>
            <Button 
                ref={anchorDateRef}
                variant="outlined" 
                size="small"
                target="_blank"
                style={botonCopiar}
                onClick={handleCalendar}
            >
                {
                    filters.filter_by_start_date ? 
                    `${format(new Date(filters.filter_by_start_date*1000), "dd/MM/yy")} 
                    - ${format(new Date(filters.filter_by_end_date*1000), "dd/MM/yy")}` 
                    : ''
                }
            </Button>
            <Popper
                open={openCalendar}
                ref={anchorCalendarRef}
                anchorEl={anchorDateRef.current}
                placement="bottom-end"
                style={{ zIndex: "10", borderRadius: "5px"}}
                modifiers={[
                    {
                        name: 'preventOverflow',
                        options: {
                        boundary: 'window', // Limita el Popper dentro de la ventana del navegador
                        altBoundary: true,
                        tether: false,
                        padding: { left: 325, right: 325 }, // Asegura espacio a los lados de la pantalla
                        },
                    },
                    {
                        name: 'flip',
                        options: {
                        fallbackPlacements: ['bottom-start', 'bottom'],
                        },
                    },
                    ]}
                transition>
                    {({ TransitionProps }) => (
                    <Fade { ...TransitionProps } timeout={350}>
                        <Box
                            sx={{
                                '.rdrDateDisplayWrapper': {
                                    display: 'none'
                                },
                                '.rdrDateRangeWrapper': {
                                backgroundColor: '#B43210',
                                },
                                '.rdrCalendarWrapper': {
                                    backgroundColor: '#ffffff',
                                    borderRadius: "5px",
                                    position: "fixed",
                                    left: "-70px",
                                    border: "2px solid black",
                                },
                                '.rdrDay_selected': {
                                    backgroundColor: '#007bff',
                                    color: '#ffffff',
                                },
                                '.rdrDateRangeWrapper .rdrDateRange': {
                                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                                },
                                '.rdrDay_inRange': {
                                    backgroundColor: 'rgba(0, 123, 255, 0.3)',
                                    color: '#ffffff',
                                },
                                '.rdrDay_day': {
                                    color: '#000000',
                                },
                                '.rdrStartEdge': {
                                    backgroundColor: '#000000'
                                },
                                '.rdrEndEdge':{
                                    backgroundColor: '#000000'
                                },
                                '.rdrInRange': {
                                    backgroundColor: '#000000'
                                },
                                '.rdrDayToday .rdrDayNumber span': {
                                    '&:after':{
                                        background: "#000000",
                                    }
                                },
                            }}
                            >
                            <DateRange
                                editableDateInputs={true}
                                onChange={handleDateChange}
                                moveRangeOnFirstSelection={false}
                                showMonthArrow={false}
                                ranges={tempDate}
                            />
                        </Box>
                    </Fade>
                    )}
            </Popper>
        </div>
    )
}

const botonCopiar = {

    backgroundColor: "transparent",
    borderColor: "transparent",
    borderRadius: "5px",
    fontSize: 12,
    color: "black",
    height: "2.1em",
    whiteSpace: "nowrap",
    width: "11.3em",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

export default CalendarFilters;
