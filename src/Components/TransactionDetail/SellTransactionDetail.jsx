import React from "react";
import style from "./BuyTransactionDetail.module.css"
import { Button } from "@mui/material";

const SellTransactionDetail = React.forwardRef(({ handleCloseDetail }, ref) => {
    return (
        <div className={style.containerTransactionDetail}>
            <Button
                onClick={handleCloseDetail}
                variant="contained"
                target="_blank"
                sx={{
                    width: "30px",
                    height: "30px",
                    minWidth: "0px",
                    backgroundColor: "black",
                    borderColor: "transparent",
                    borderRadius: "50px",
                    color: "white",
                    position: "absolute",
                    top: "15px",
                    right: "20px",
                    padding: "0px",
                    '&:hover': {
                        color: "#fff",
                        borderColor: "transparent",
                        backgroundColor: "rgb(80, 80, 80)"
                    }
                }}>X
            </Button>
            
            <div>
                <h2 style={{ fontSize: "20px", marginRight: "10px" }}>Datos del grupo</h2>
                <p>Venta</p>
            </div>

        </div>
    )
})

export default SellTransactionDetail;