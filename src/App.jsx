import Home from "./Views/Home/Home";
import Login from "./Views/Login/Login";
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from "react-redux";
import './App.css';
import 'typeface-mukta';
import Users from "./Views/Users/Users";
import { useEffect, useState } from 'react';
import { getLogo, getSuppliers, getSellers, getClients, getTransactionCards, getTransactions, getProductsStocks, getCurrentUser } from "./Redux/actions";
import { useSearchParams, useNavigate } from 'react-router-dom';

function App() {
  let [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  //localhost para dev
  //si estan en localhost descomenten la de abajo
  //y no sigan el flujo de autorizacion porque los va a llevar a dev
  //vayan directamente a http://localhost/home
  //localStorage.setItem('access_token', "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJlemVxdWllbG1hcmNlbDJAZ21haWwuY29tIiwiYXVkIjoicHVibGljIiwiaXNzIjoiZ3N0b2NrLmZyYW5jZWxzb2Z0LmNvbSIsImV4cCI6MTc1OTg0NDk1OH0.fM46jlTddXv862Q12jyYKip3OGxjpNDSXm6g4cc4mYk");

  const get_all = () => {
      dispatch(getLogo());
      dispatch(getTransactionCards(null));
      dispatch(getProductsStocks());
      dispatch(getTransactions(null));
      dispatch(getSuppliers());
      dispatch(getSellers());
      dispatch(getClients());
      dispatch(getCurrentUser());
  }

  useEffect(() => {
    const storedToken = localStorage.getItem('access_token');
    const currentPath = window.location.pathname;
    const access_token = searchParams.get("access_token");
    if (storedToken){
      get_all()
    }
    if (currentPath === "/sso_login") {
      if (access_token) {
        localStorage.setItem('access_token', access_token);
        get_all()
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const currentPath = window.location.pathname;
    const access_token = searchParams.get("access_token");
    const storedToken = localStorage.getItem('access_token');


    // Solo permitir modificar el access_token en /sso_login
    if (currentPath === "/sso_login") {
      if (access_token) {
        // Si se recibe un nuevo token, se guarda en localStorage
        navigate('/home'); // Redirigir a /home después de guardar
      }
      else{
        navigate('/'); // Redirigir a / si no posee access_token
      }
    } else {
      // Si estamos en otra ruta y ya hay un token, impedir modificaciones
      if (!storedToken) {
        // Si no hay token en localStorage, redirigir al login
        navigate('/');
      }
    }
  }, [searchParams, navigate]);

  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/sso_login" element={<div>Logging in...</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;