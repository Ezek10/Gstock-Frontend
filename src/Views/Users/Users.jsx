import React, { useState } from "react";
import style from "./Users.module.css"
import Button from '@mui/material/Button';
import logoReverse from "../../assets/logoReverse.png"
import logo from "../../assets/logo.png"
import deleteUser from "../../assets/closeConfirm.png"
import { Dialog } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Users = () => {

    const [ selectedUser, setSelectedUser ] = useState(null)

    const navigate = useNavigate

    const users = [
        {name: "User1",
        email: "user1@gmail.com",
        image: logoReverse},
        {name: "User2",
        email: "user2@gmail.com",
        image: logoReverse},
        {name: "User3",
        email: "user3@gmail.com",
        image: logoReverse},
        {name: "User4",
        email: "user4@gmail.com",
        image: logoReverse},
        {name: "User5",
        email: "user5@gmail.com",
        image: logoReverse},
        {name: "User6",
        email: "user6@gmail.com",
        image: logoReverse},
        {name: "User7",
        email: "user7@gmail.com",
        image: logoReverse},
        {name: "User8",
        email: "user8@gmail.com",
        image: logoReverse},
        {name: "User9",
        email: "user9@gmail.com",
        image: logoReverse},
        {name: "User10",
        email: "user10@gmail.com",
        image: logoReverse},
        {name: "User11",
        email: "user11@gmail.com",
        image: logoReverse},
        {name: "User12",
        email: "user12@gmail.com",
        image: logoReverse},
        
    ]

    const [ openDeleteModal, setOpenDeleteModal ] = useState(false);
    const handleOpenDelete = (i) => {
        setSelectedUser(i)
        console.log(selectedUser);
        
        setOpenDeleteModal(true);}
    const handleCloseDelete = () => setOpenDeleteModal(false);

    return (
        <div className={style.usersContainer}>
            <div className={style.header}>
                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    onClick={() => navigate("/")}
                    sx={{
                        backgroundColor: "white",
                        borderColor: "transparent",
                        borderRadius: "20px",
                        height: "3.5vh",
                        paddingX: "8px",
                        textTransform: 'none',
                        color: "black",
                        marginX: "2rem",
                        '&:hover':{
                            color: "#000",
                            borderColor: "transparent",
                            backgroundColor: "rgb(201, 201, 201)"}
                        }}> 
                        Cerrar sesión
                </Button>
            </div>

            <div style={{display: "flex", flexDirection: "row",height: "82vh"}}>
                <div className={style.activeUsers}>
                    <h2 style={{padding: "20px 0px 0px 70px", margin: "0px", fontSize: "36px", boxSizing: "border-box", fontWeight: "400"}}>Usuarios activos</h2>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", margin: "20px 30px 20px 70px", overflowY: "auto", boxSizing: "border-box"}}>
                        {users.map((user, index) => (
                            <div style={{display: "flex", flexDirection: "row", alignItems: "center", width: "15vw", justifyContent: "space-between", margin: "10px 0px 10px 0px"}}>
                                <img src={user.image} alt="Profile" style={{height: "40px", backgroundColor: "white", padding: "5px", borderRadius: "50px", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)"}}/> 
                                    <p style={{fontSize: "24px", margin: "0px 0px 0px 0px"}}>{user.name}</p>   
                                <button onClick={() => handleOpenDelete(index)} style={{border: "none", backgroundColor: "white", height: "20px", width: "20px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px"}}>
                                    <img src={deleteUser} alt="Delete" style={{height: "20px"}}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 style={{padding: "20px 0px 0px 40px", margin: "0px", fontSize: "36px", boxSizing: "border-box", fontWeight: "400"}}>Crear usuario nuevo</h2>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p style={{fontSize: "24px", margin: "0px 0px 0px 40px"}}>Usuario</p>
                        <input type="text" style={{width: "250px", borderRadius: "5px", margin: "0px 0px 0px 40px", border: "1px gray solid"}} placeholder="tuemail@ejemplo.com"/>
                        <button style={{ borderRadius: "20px", margin: "20px 0px 0px 40px", width: "fit-content", border: "0px transparent", padding: "5px 10px 5px 10px", background: "black", color: "white"}}>Aceptar</button>
                    </div>
                </div>
            </div>

            <div className={style.footer}>
                <img src={logo} alt="logo" style={{ height: "5vh", marginLeft: "5%" }}/>
                <div style={{ color: "white", marginLeft: "0.5%", display: "flex", flexDirection: "column" }}>
                    <div style={{margin: "-5px -5px -5px 0px", fontSize: "110%"}}>Gestión</div>
                    <div style={{margin: "-5px -5px -5px 0px", fontSize: "110%"}}> de Stock</div>
                </div>
            </div>

            <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDeleteModal}
                onClose={()=>handleCloseDelete()}
                className={style.deleteModal}
                closeAfterTransition
                disablePortal
                style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
                    <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "11px 15px 11px 15px"}}>
                        <div style={{display: "flex", justifyContent: "space-evenly", height: "20px"}}>
                            <p style={{marginTop: "-5px", fontWeight: "500", fontSize: "20px"}}>¿Quieres eliminar este usuario?</p>
                            <button style={{ marginTop: "-5px",height: "25px", width: "25px", borderColor: "transparent", backgroundColor: "transparent", '&:hover': {
                                        cursor: "pointer",
                                    }}} onClick={()=>handleCloseDelete()}>
                                <img src={deleteUser} alt="closeConfirm" style={{width: "25px"}}/>
                            </button>
                        </div>
                        <p style={{ fontWeight: "500", fontSize: "15px"}}>{selectedUser!==null ? users[selectedUser].email : ""}</p>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={buttonStyle}
                                onClick={()=> {handleCloseDelete()}}>Confirmar
                            </Button>
                        </div>
                    </div>
            </Dialog>
        </div>
    )
}

const buttonStyle = {
    backgroundColor: "black",
    borderColor: "transparent",
    fontSize: "15px",
    borderRadius: "20px",
    height: "2.2em",
    width:"fit-content",
    paddingX: "4px",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "20px",
    textTransform: 'none',
    alignItems: "center",
    color: "white",
    '&:hover':{
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"}
}

export default Users;