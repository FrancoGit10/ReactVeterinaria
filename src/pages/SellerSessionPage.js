import { React } from "react";
import { NavBar } from "../components/NavBar";
import { Pedidos } from "../components/Pedidos";
import { ListadoVMD } from "../components/ListadoVMD";

// Pagina de vendedores
export const SellerSessionPage = ({ listadoState, setListadoState }) => {
  return (
    <>
      <NavBar />
      {/* Contenido principal */}
      <section id="content" className="content">
        <ListadoVMD />
      </section>

      {/* Barra lateral */}
      <aside className="lateral">
        <Pedidos />
      </aside>
    </>
  );
};
