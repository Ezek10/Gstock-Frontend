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

  const anchorSpanRef = useRef(null); // Nueva referencia para el span
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
      if (anchorSpanRef.current.contains(event.target)) {
        return;
      }
      if (!anchorCalendarRef.current.contains(event.target)) {
        setCalendar(false); // Cierra el calendario
      }
    };

    if (openCalendar) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      if (tempDate[0].startDate) {
        const { startDate, endDate } = tempDate[0];
        const updatedStartDate = new Date(startDate.setHours(0, 0, 0, 0));
        const updatedEndDate = new Date(endDate.setHours(23, 59, 59, 999));

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
    if (item.selection.startDate !== item.selection.endDate) {
      setCalendar(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", height: "42px" }}>
      {/* Hacemos cliqueable la palabra "Fecha" y el icono */}
      <span
        ref={anchorSpanRef} // Usamos esta referencia para el Popper
        onClick={handleCalendar}
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
      >
        <p className={style.letrasWithMargin}>
          Fecha <ArrowDropDownIcon sx={{ fontSize: 18 }} />
        </p>
      </span>

      {/* Mostramos la fecha seleccionada, pero sin hacerla cliqueable */}
      <div
        style={{
          ...botonCopiar, // Mantiene los estilos de botón
          display: 'flex',
          alignItems: 'left',
          justifyContent: 'left',
          fontSize: 14,
          fontWeight: 275,
          border: '1px solid #ccc',
          padding: '1px',
          borderRadius: '5px',
          height: '2.1em'
        }}
      >
        {filters.filter_by_start_date
          ? `${format(new Date(filters.filter_by_start_date * 1000), "dd/MM/yy")} 
                       - ${format(new Date(filters.filter_by_end_date * 1000), "dd/MM/yy")}`
          : ''
        }
      </div>

      <Popper
        open={openCalendar}
        ref={anchorCalendarRef}
        anchorEl={anchorSpanRef.current}  // Usamos el nuevo span como ancla
        placement="bottom-end"
        style={{ zIndex: "100000", borderRadius: "5px", }}
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
        transition>
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Box
              sx={{
                '.rdrDateDisplayWrapper': { display: 'none' },
                '.rdrDateRangeWrapper': { backgroundColor: '#B43210' },
                '.rdrCalendarWrapper': {
                  backgroundColor: '#ffffff',
                  borderRadius: "5px",
                  position: "fixed",
                  left: "-70px",
                  border: "2px solid black",
                },
                '.rdrMonthAndYearPickers select': {padding: '0px !important', fontSize: '12px'},
                '.rdrDay_day': { color: '#000000' },
                '.rdrStartEdge': { backgroundColor: '#000000' },
                '.rdrEndEdge': { backgroundColor: '#000000' },
                '.rdrInRange': { backgroundColor: '#000000' },
                '.rdrDayToday .rdrDayNumber span': { '&:after': { background: "#000000" } },
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
  );
}

const botonCopiar = {

  backgroundColor: "transparent",
  borderColor: "transparent",
  borderRadius: "5px",
  fontSize: 14,
  color: "black",
  height: "2.1em",
  whiteSpace: "nowrap",
  width: "11.3em",
  '&:hover': {
    color: "#fff",
    borderColor: "transparent",
    backgroundColor: "rgb(80, 80, 80)"
  }
}

export default CalendarFilters;
