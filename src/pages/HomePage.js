import { React } from "react";
import { NavBar } from "../components/NavBar";
import image from "../images/PerrosYgatos.jpg";

// Pagina de inicio
export const HomePage = () => { 
  return (
    <>
      <NavBar />
      {/* Contenido principal */}
      <section id="contentHome" className="contentHome">
        <div>
          <h1>Pagina de Inicio</h1>
        </div>
        <div>
          <img className="grande" src={image} alt="Perros Y Gatos" />
        </div>
      </section>

      {/* Barra lateral */}
      <aside className="lateral">
        <h1>Sobre Nosotros</h1>
        <div className="nosotros">
          <p>
            Somos una empresa dedicada a las mascotas, con los mejores
            profesionales veterinarios de Tucuman, tenemos equipos de calidad y
            los mejores elementos para que su mascota experimente una grandiosa
            calidad de vida
          </p>
        </div>
      </aside>
    </>
  );
};
