import React from 'react';
import { Link, useLocation } from "react-router-dom";

//Componente de la barra de Menu - Se ajusta segun la direccion de la pagina
export const NavBar = () => {
    const cerrarSesion=()=>{
        localStorage.setItem("validacionCliente","falsa")
        localStorage.setItem("validacionVendedor","falsa")
        localStorage.setItem("usuario","")
    }
    let location=useLocation().pathname;
    switch (location){
        case "/":
            return(
                <>     
                    <nav className="nav"> 
                        <ul>
                            { localStorage.getItem("validacionCliente")==="verdadera" ? 
                                <>
                                <Link to={"/login"}>Mascotas</Link>
                                <Link to={"/"} onClick={()=>cerrarSesion()}>Cerrar Sesion</Link>
                                </>
                            :   <> 
                                <Link to={"/login"}>Iniciar Sesion</Link>
                                <Link to={"/signup"}>Registrarse</Link>
                                </>
                            }   
                        </ul>
                    </nav>
                </>
            )
        case "/signup":
            return(
                <>      
                    <nav className="nav">
                        <ul>
                            { localStorage.getItem("validacionVendedor")==="verdadera" ? 
                                <>          
                                    <Link to={"/login"}>Vendedor</Link>
                                </> 
                                :<>
                                    <Link to={"/"}>Pagina Inicial</Link>    
                                    <Link to={"/login"}>Iniciar Sesion</Link>
                                </>}
                        </ul>
                    </nav>
                </>
            )
        case "/login":
            return(
                <>      
                    <nav className="nav">
                        <ul>
                            <Link to={"/"}>Pagina Inicial</Link>    
                            <Link to={"/signup"}>Registrarse</Link>
                        </ul>
                    </nav>
                </>
            )
        case "/usersession":
                return(
                    <>      
                        <nav className="nav">
                            <ul>
                                <p className='bienvenida'>Bienvenido {localStorage.getItem("usuario")} !!!   </p>
                                <Link to={"/"} onClick={()=>cerrarSesion()}>Cerrar Sesion</Link>
                            </ul>
                        </nav> 
                    </>
                )
        case "/sellersession":
            return(
                <>      
                    <nav className="nav">
                        <ul>
                            <p className='bienvenida'>Bienvenido {localStorage.getItem("usuario")} !!!   </p>
                            <Link to={"/signup"}>Registrar Vendedor</Link>    
                            <Link to={"/"} onClick={()=>cerrarSesion()}>Cerrar Sesion</Link>
                        </ul>
                    </nav> 
                </>
            )
        default:
            console.log("Ruta desconocida")

    }
}

