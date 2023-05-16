import { React } from "react";
import { NavBar } from "../components/NavBar";
import Registrarse from "../components/Registrarse";

// Pagina de registro
export const SignUpPage = () => {
  return (
    <>
      <NavBar />
      {/* Contenido principal */}
      <section id="content" className="content">
        <Registrarse />
      </section>

      {/* Barra lateral */}
      <aside className="lateral">
        <h1>Registrese</h1>
        <div className="nosotros">
          <p>
            Introduzca sus datos , y presione el boton Registrarse , para
            posteriormente iniciar sesion y poder acceder a los servicios de
            nuestra web
          </p>
        </div>
      </aside>
    </>
  );
};
