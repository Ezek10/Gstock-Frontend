import React, { useEffect, useState } from "react";
import style from "./Users.module.css"
import Button from '@mui/material/Button';
import logoReverse from "../../assets/logoReverse.png"
import logo from "../../assets/logo.png"
import deleteUserIcon from "../../assets/closeConfirm.png"
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, postNewUser, deleteUser } from "../../Redux/actions";
import check from "../../assets/check.png" 


const Users = () => {

    const dispatch = useDispatch()

    const users = useSelector((state) => state.users) || [];

    const [ selectedUser, setSelectedUser ] = useState(null)
    const [ newUser, setNewUser ] = useState({
        email: "",
        name: "",
        // cellphone: 0,
    })

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch])

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        getLogout();
    };

    const handleNewUser = (event) => {
        const property = event.target.name
        const value = event.target.value
        setNewUser({...newUser, [property]: value, name: value.split("@")[0]})
        console.log(newUser);
    }    

    const submitNewUser = () => {
        debugger
        postNewUser(newUser)
    }
    const capitalizeWords = (str) => {
        if (!str) {return str}
        return str
            .split(' ') // Divide la cadena en palabras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
            .join(' '); // Une las palabras nuevamente
    };
    const [ openDeleteModal, setOpenDeleteModal ] = useState(false);
    const handleOpenDelete = (i) => {
        setSelectedUser(i)
        setOpenDeleteModal(true);}
        const handleCloseDelete = () => setOpenDeleteModal(false);
        
        const handleDeleteUser = () => { 
            dispatch(deleteUser(users[selectedUser].id))
            getUsers()
        }

    const [ openAddUserModal, setOpenAddUserModal ] = useState(false);
    const handleOpenAdd = () => {
            setOpenAddUserModal(true);
            setTimeout(() => {
                setOpenAddUserModal(false)
            }, 3000)}

    return (
        <div className={style.usersContainer}>
            <div className={style.header}>
                <Button 
                    variant="outlined" 
                    size="small"
                    target="_blank"
                    onClick={handleLogout}
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
                        <p>Cerrar sesión</p>
                </Button>
            </div>

            <div style={{display: "flex", flexDirection: "row",height: "82vh"}}>
                <div className={style.activeUsers}>
                    <h2 style={{padding: "20px 0px 0px 70px", margin: "0px", fontSize: "36px", boxSizing: "border-box", fontWeight: "400"}}>Usuarios activos</h2>
                    <div style={{display: "grid", gridTemplateColumns: "repeat(3, 1fr)", margin: "20px 30px 20px 70px", overflowY: "auto", boxSizing: "border-box"}}>
                        {users.map((user, index) => (
                            <div key={index} style={{display: "flex", flexDirection: "row", alignItems: "center", width: "18vw", justifyContent: "space-between", margin: "10px 0px 10px 0px"}}>
                                <img src={ user.image ? user.image : logoReverse } alt="Profile" style={{height: "40px", backgroundColor: "white", padding: "5px", borderRadius: "50px", boxShadow: "3px 3px 8px rgba(0, 0, 0, 0.2)"}}/> 
                                    <p style={{fontSize: "24px", paddingRight: 10, margin: "0px 0px 0px 40px", textAlign: "left", flex: "1"}}>{capitalizeWords(user.name)}</p>   
                                <button onClick={() => handleOpenDelete(index)} style={{border: "none", marginRight: 0, backgroundColor: "white", height: "20px", width: "20px", display: "flex", justifyContent: "center", alignItems: "center", borderRadius: "20px"}}>
                                    <img src={deleteUserIcon} alt="Delete" style={{height: "20px", marginRight: 0}}/>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 style={{padding: "20px 0px 0px 40px", margin: "0px", fontSize: "36px", boxSizing: "border-box", fontWeight: "400"}}>Crear usuario nuevo</h2>
                    <div style={{display: "flex", flexDirection: "column"}}>
                        <p style={{fontSize: "24px", margin: "0px 0px 0px 40px"}}>Usuario</p>
                        <input type="text" style={{width: "250px", borderRadius: "5px", margin: "0px 0px 0px 40px", border: "1px gray solid"}} placeholder="tuemail@ejemplo.com" onChange={handleNewUser} name="email"/>
                        <button onClick={()=>{submitNewUser(), handleOpenAdd()}} style={{ borderRadius: "20px", margin: "20px 0px 0px 40px", width: "fit-content", border: "0px transparent", padding: "5px 10px 5px 10px", background: "black", color: "white"}}>Aceptar</button>
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
                                <img src={deleteUserIcon} alt="closeConfirm" style={{width: "25px"}}/>
                            </button>
                        </div>
                        <p style={{ fontWeight: "500", fontSize: "15px"}}>{selectedUser!==null ? users[selectedUser].email : ""}</p>
                        <div style={{display: "flex", justifyContent: "center"}}>
                            <Button 
                                variant="outlined" 
                                size="small"
                                target="_blank"
                                style={buttonStyle}
                                onClick={()=> {handleDeleteUser(); handleCloseDelete()}}>Confirmar
                            </Button>
                        </div>
                    </div>
            </Dialog>

            <Dialog
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={openAddUserModal}
                    onClose={()=>handleCloseCheck()}
                    closeAfterTransition
                    disablePortal
                    style={{ position: "absolute", display: "flex", justifyContent: "center" }}>
                        <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px", fontSize: "20px", fontWeight: "500", alignItems: "center",}}>
                            <p style={{margin: "0px", textAlign: "center"}}>El usuario fue agregado</p>
                            <div style={{display: "flex", justifyContent: "center"}}>
                                <img src={check} alt="Check" style={{height: "43px", display: "grid", alignSelf: "center"}}/>
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