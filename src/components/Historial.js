import React from "react";

//Componente que muestra los historicos de pedidos encargados segun el usuario
export const Historial = () => {
  const tituloComponente = "Historico de pedidos";
  if (localStorage.getItem("pedidos") != null) {
    let pedidos = JSON.parse(localStorage.getItem("pedidos"));
    let usuario = localStorage.getItem("usuario");

    return (
      <div className="historico">
        <h3 className="title">{tituloComponente}</h3>
        {pedidos.map((pedidos) => {
          if (pedidos.usuario === usuario) {
            return (
              <div key={pedidos.id}>
                <h4>
                  {pedidos.tipoMascota} de nombre {pedidos.nombreMascota}
                </h4>
                <ul>
                  <li>Alimentos: {pedidos.alimentos} </li>
                  <li>complementos: {pedidos.complementos}</li>
                  <li>Comp. extra: {pedidos.complementoExtra}</li>
                </ul>
              </div>
            );
          }
        })}
      </div>
    );
  }
};
