import { React} from "react";
import { Crear } from "../components/Crear";
import { Listado } from "../components/Listado";
import { NavBar } from "../components/NavBar";
import { Historial } from "../components/Historial";

// Pagina de Usuario
export const UserSessionPage = ({ listadoState, setListadoState }) => {
  return (
    <>
      <NavBar />
      {/* Contenido principal */}
      <section id="content" className="content">
        <Listado
          listadoState={listadoState}
          setListadoState={setListadoState}
        />
      </section>

      {/* Barra lateral */}
      <aside className="lateral">
        <Crear setListadoState={setListadoState} />
        <Historial />
      </aside>
    </>
  );
};
