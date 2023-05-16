import React, { useEffect, useState } from "react";
import { GuardarEnStorage } from "../helpers/GuardarEnStorage";

//Muestra los pedidos recibidos en la seccion del vendedor
export const Pedidos = (id) => {
  const tituloComponente = "Pedidos Recibidos";
  const [listadoState, setListadoState] = useState([]);
  useEffect(() => {
    conseguirPedidos();
  }, []);
  const botonesHabilitados = (id) => {
    let botonDeshabilitado = false;
    let despachado = JSON.parse(localStorage.getItem("despachado"));
    if (despachado != null) {
      despachado.map((despachado) => {
        if (despachado.id === id) {
          botonDeshabilitado = true;
        }
      });
    }
    return !botonDeshabilitado;
  };

  const conseguirPedidos = () => {
    let pedidos = JSON.parse(localStorage.getItem("pedidos"));
    setListadoState(pedidos);
    return pedidos;
  };

  if (localStorage.getItem("pedidos") != null) {
    const editarPedidos = (id) => {
      //conseguir pedidos almacenadas
      let pedidos_almacenados = conseguirPedidos();
      //Filtrar esas mascotas para que quede del array la que se desea
      let mascotaPedido = pedidos_almacenados.filter(
        (mascota) => mascota.id === parseInt(id)
      );
      let despachado = {
        id: mascotaPedido[0].id,
        usuario: mascotaPedido[0].usuario,
        nombreMascota: mascotaPedido[0].nombreMascota,
      };
      GuardarEnStorage("despachado", despachado);
    };

    return (
      <div className="historico">
        <h3 className="title">{tituloComponente}</h3>
        {listadoState.map((pedidos) => {
          return (
            <div key={pedidos.id}>
              <h4>Pedido de {pedidos.usuario} </h4>
              <ul>
                <p>
                  {pedidos.tipoMascota} de nombre {pedidos.nombreMascota}
                </p>
                <li>Alimentos: {pedidos.alimentos} </li>
                <li>complementos: {pedidos.complementos}</li>
                <li>Comp. extra: {pedidos.complementoExtra}</li>
                <br />
                {botonesHabilitados(pedidos.id) ? (
                  <>
                    <button onClick={() => editarPedidos(pedidos.id)}>
                      Despachar
                    </button>
                  </>
                ) : (
                  <>
                    <h3>Despacho Realizado!!</h3>
                  </>
                )}
              </ul>
            </div>
          );
        })}
      </div>
    );
  }
};
