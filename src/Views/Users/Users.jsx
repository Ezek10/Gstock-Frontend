import React, { useEffect, useState } from "react";
import style from "./Users.module.css"
import Button from '@mui/material/Button';
import logo from "../../assets/logo.png"
import deleteUserIcon from "../../assets/closeConfirm.png"
import { Dialog } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, postNewUser, deleteUser } from "../../Redux/actions";
import { Link } from 'react-router-dom'
import check from "../../assets/check.png"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


const Users = () => {

    const dispatch = useDispatch()

    const users = useSelector((state) => state.users) || [];

    const [selectedUser, setSelectedUser] = useState(null)
    const [newUser, setNewUser] = useState({
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
        navigate("/");
    };

    const handleNewUser = (event) => {
        const property = event.target.name
        const value = event.target.value
        setNewUser({ ...newUser, [property]: value })
    }

    const submitNewUser = async () => {
        if (!newUser.name) { newUser.name = newUser.email.split("@")[0] }
        await postNewUser(newUser);
        setNewUser({ name: "", email: "" });
        dispatch(getUsers());
    }

    const capitalizeWords = (str) => {
        if (!str) { return str }
        return str
            .split(' ') // Divide la cadena en palabras
            .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitaliza cada palabra
            .join(' '); // Une las palabras nuevamente
    };
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const handleOpenDelete = (i) => {
        setSelectedUser(i)
        setOpenDeleteModal(true);
    }
    const handleCloseDelete = () => setOpenDeleteModal(false);

    const handleDeleteUser = async () => {
        await deleteUser(users[selectedUser].id);
        dispatch(getUsers());
        setSelectedUser(null);
    }

    const [openAddUserModal, setOpenAddUserModal] = useState(false);
    const handleOpenAdd = () => {
        setOpenAddUserModal(true);
        setTimeout(() => {
            setOpenAddUserModal(false)
        }, 3000)
    }

    return (
        <div className={style.usersContainer}>
            <div className={style.header}>
                <Link to="/home" style={{ margin: "0px 0px -10px 20px" }}><ArrowBackIosIcon sx={{ fontSize: 36, color: "white", margin: "0px 0px 0px 30px" }} /></Link>

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
                        '&:hover': {
                            color: "#000",
                            borderColor: "transparent",
                            backgroundColor: "rgb(201, 201, 201)"
                        }
                    }}>
                    <p>Cerrar sesión</p>
                </Button>
            </div>

            <div className={style.iHateYou}>
                <div className={style.activeUsers}>
                    <h2>Usuarios activos</h2>
                    <div className={style.userList}>
                        {users.map((user, index) => (
                            <div key={index}>
                                <img src='./src/assets/openFilters.png' alt="" style={{ paddingTop: '7px', paddingLeft: '15px', transform: 'scaleX(-1)' }} />
                                <p style={{ overflow:"hidden", textOverflow: "ellipsis", fontSize: "24px", paddingRight: 0, margin: 0, textAlign: "left", flex: "1" }}>{capitalizeWords(user.name)}</p>
                                <button onClick={() => handleOpenDelete(index)} style={{ borderRadius: "20px", whiteSpace: 'nowrap', border: "0px transparent", padding: "5px 10px 5px 10px", marginLeft: '10px', background: "red", color: "white" }}>
                                    Eliminar usuario
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={style.createUser}>
                    <h2>Crear usuario nuevo</h2>
                    <div>
                        <p>Email</p>
                        <input type="text" style={{ width: "250px", borderRadius: "5px", border: "1px gray solid" }} value={newUser.email} placeholder="tuemail@ejemplo.com" onChange={handleNewUser} name="email" />
                        <p>Nombre</p>
                        <input type="text" style={{ width: "250px", borderRadius: "5px", border: "1px gray solid" }} value={newUser.name} placeholder="username" onChange={handleNewUser} name="name" />
                        <button onClick={() => { submitNewUser(), handleOpenAdd() }} style={{ borderRadius: "20px", width: "fit-content", border: "0px transparent", padding: "5px 10px 5px 10px", background: "black", color: "white" }}>Aceptar</button>
                    </div>
                </div>
            </div>

            <div className={style.footer}>
                <img src={logo} alt="logo" style={{ height: "5vh", marginLeft: "5%" }} />
                <div style={{ color: "white", marginLeft: "0.5%", display: "flex", flexDirection: "column" }}>
                    <div style={{ margin: "-5px -5px -5px 0px", fontSize: "110%" }}>Gestión</div>
                    <div style={{ margin: "-5px -5px -5px 0px", fontSize: "110%" }}> de Stock</div>
                </div>
            </div>

            <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openDeleteModal}
                onClose={() => handleCloseDelete()}
                className={style.deleteModal}
                closeAfterTransition
                disablePortal
                style={{ position: "absolute", justifyContent: "center", alignItems: "center" }}>
                <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "11px 15px 11px 15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-evenly", height: "20px" }}>
                        <p style={{ marginTop: "-5px", fontWeight: "500", fontSize: "20px" }}>¿Quieres eliminar este usuario?</p>
                        <button style={{
                            marginTop: "-5px", height: "25px", width: "25px", borderColor: "transparent", backgroundColor: "transparent", '&:hover': {
                                cursor: "pointer",
                            }
                        }} onClick={() => handleCloseDelete()}>
                            <img src={deleteUserIcon} alt="closeConfirm" style={{ width: "25px" }} />
                        </button>
                    </div>
                    <p style={{ fontWeight: "500", fontSize: "15px" }}>{selectedUser !== null ? users[selectedUser].email : ""}</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Button
                            variant="outlined"
                            size="small"
                            target="_blank"
                            style={buttonStyle}
                            onClick={() => { handleDeleteUser(); handleCloseDelete() }}>Confirmar
                        </Button>
                    </div>
                </div>
            </Dialog>

            <Dialog
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openAddUserModal}
                onClose={() => handleCloseCheck()}
                closeAfterTransition
                disablePortal
                style={{ position: "absolute", display: "flex", justifyContent: "center" }}>
                <div style={{ dispaly: "flex", minWidth: "100px", minHeight: "50px", padding: "20px", fontSize: "20px", fontWeight: "500", alignItems: "center", }}>
                    <p style={{ margin: "0px", textAlign: "center" }}>El usuario fue agregado</p>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src={check} alt="Check" style={{ height: "43px", display: "grid", alignSelf: "center" }} />
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
    width: "fit-content",
    paddingX: "4px",
    marginTop: "10px",
    marginBottom: "10px",
    marginRight: "20px",
    textTransform: 'none',
    alignItems: "center",
    color: "white",
    '&:hover': {
        color: "#fff",
        borderColor: "transparent",
        backgroundColor: "rgb(80, 80, 80)"
    }
}

export default Users;