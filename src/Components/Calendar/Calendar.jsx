import React, { useState, useRef } from "react";
import { Button, Box, Popper } from "@mui/material";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Fade from '@mui/material/Fade';
import { DateRange } from 'react-date-range';
import style from "./Calendar.module.css"
import { format } from 'date-fns';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';

const Calendar = ( { onDateChange } ) => {

    const anchorRef = useRef(null);
    const [openCalendar, setCalendar] = useState(false);
    const [ date, setDate ] = useState([
        {
            startDate: new Date(),
            endDate: null,
            key: 'selection'
        }
    ])

    const handleCalendar = () => {
        setCalendar((prevOpen) => !prevOpen);
    }

    const handleDateChange = (item) => {
        setDate([item.selection]);
        if (onDateChange) {
            onDateChange(item.selection);
        }
    }

    return (
        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "42px" }}>
                    <p className={style.letras}>Fecha <ArrowRightIcon sx={{fontSize: 18}}/></p>
                    <Button 
                        ref={anchorRef}
                        variant="outlined" 
                        size="small"
                        target="_blank"
                        style={botonCopiar}
                        onClick={handleCalendar}>
                        <CalendarMonthIcon/>
                    </Button>
                    <p className={style.date}>{format(date[0].startDate, 'dd/MM/yyyy')}</p>
                    <Popper
                        open={openCalendar}
                        anchorEl={anchorRef.current}
                        placement="bottom-end"
                        style={{ zIndex: "10", borderRadius: "5px"}}
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
                                        ranges={date}/>
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
    color: "black",
    height: "2.1em",
    width: "2.1em",
    minWidth: "0px",
    marginLeft: "10px",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

export default Calendar;