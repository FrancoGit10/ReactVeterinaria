import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {HomePage} from "../pages/HomePage";
import { Footer } from '../components/layout/Footer';
import { Header } from '../components/layout/Header';
import { LoginPage } from '../pages/LoginPage';
import { SignUpPage } from '../pages/SignUpPage';
import {  UserSessionPage } from '../pages/UserSessionPage';
import { SellerSessionPage } from '../pages/SellerSessionPage';

//Administra las rutas de la pagina
export const Rutas = () => {
    const[listadoState, setListadoState]=useState([]);
    return (
       <>
        <Router>     
            {/*HEADER Y NAVEGACION */}
            <Header  />

            {/*CONTENIDO CENTRAL*/}
            <Routes>
                <Route exact path="/" element={<HomePage />}> </Route>
                <Route exact path="/login" element={<LoginPage/>}> </Route>
                <Route exact path="/signup" element={<SignUpPage/>}> </Route> 
                {(localStorage.getItem("validacionCliente") === "verdadera") ?
                <Route exact path="/usersession" element={<UserSessionPage listadoState={listadoState} setListadoState={setListadoState} />}> </Route> 
                :console.log("otromensaje")}
                {((localStorage.getItem("validacionVendedor") === "verdadera"))?
                    <Route exact path="/sellersession" element={<SellerSessionPage listadoState={listadoState} setListadoState={setListadoState} />}> </Route> 
                :console.log("otromensaje")}
            </Routes>

            {/* FOOTER */}
            <Footer/>
        </Router>
  
    
    </>
)
}
