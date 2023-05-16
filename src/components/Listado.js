import React, { useEffect } from "react";
import { GuardarEnStorage } from "../helpers/GuardarEnStorage";

// Muestra las mascotas segun el usuario, y calcula los combos
export const Listado = ({ listadoState, setListadoState }) => {
  useEffect(() => {
    conseguirMascotas();
  }, []);

  const botonesHabilitados = (id) => {
    let botonDeshabilitado = false;
    let pedidos = JSON.parse(localStorage.getItem("pedidos"));
    if (pedidos != null) {
      pedidos.map((pedidos) => {
        if (pedidos.id == id) {
          botonDeshabilitado = true;
        }
      });
    }
    return !botonDeshabilitado;
  };

  const encargarPedido = (id, calcular) => {
    //conseguir mascotas almacenadas
    let mascotas_almacenadas = conseguirMascotas();
    //Filtrar esas mascotas para que quede del array la q quiere
    let mascotaPedido = mascotas_almacenadas.filter(
      (mascota) => mascota.id === parseInt(id)
    );
    let pedido = {
      id: mascotaPedido[0].id,
      usuario: localStorage.usuario,
      nombreMascota: mascotaPedido[0].nombre,
      tipoMascota: mascotaPedido[0].tipo,
      alimentos: calcular.alimentos,
      complementos: calcular.complemento,
      complementoExtra: calcular.complementoE,
    };
    GuardarEnStorage("pedidos", pedido);
  };

  const conseguirMascotas = () => {
    let mascotas = JSON.parse(
      localStorage.getItem(localStorage.getItem("usuario"))
    );
    setListadoState(mascotas);
    return mascotas;
  };

  const calcular = (mascota) => {
    let cantidad = {
      alimentos: "",
      complemento: 0,
      complementoE: 0,
    };
    if (mascota.tipo === "Perro") {
      cantidad.alimentos = (0.8 * mascota.peso).toFixed(0); //Queda la posibilidad de mostrar decimales si el cliente los requiere cambiando el numero 0
      cantidad.complemento = (mascota.edad / 3).toFixed(0);
      if (mascota.castrado === "Si" && mascota.edad > 5) {
        cantidad.complementoE = 1;
      }
    } else {
      cantidad.alimentos = (0.5 * mascota.peso).toFixed(0); //Queda la posibilidad de mostrar decimales si el cliente los requiere cambiando el numero 0
      if (mascota.edad > 5) cantidad.complemento = 1;
      if (mascota.castrado === "Si" && mascota.edad > 5)
        cantidad.complementoE = 1;
    }
    return cantidad;
  };

  const borrarMascota = (id) => {
    //conseguir mascotas almacenadas
    let mascotas_almacenadas = conseguirMascotas();
    //Filtrar esas mascotas para que elimine del array la q no quiere
    let nuevo_array_mascotas = mascotas_almacenadas.filter(
      (mascota) => mascota.id !== parseInt(id)
    );
    //Actualizar estado del listado
    setListadoState(nuevo_array_mascotas);
    //Actualizar los datos en el localStorage
    localStorage.setItem(
      localStorage.getItem("usuario"),
      JSON.stringify(nuevo_array_mascotas)
    );
  };

  return (
    <>
      {listadoState != null && listadoState.length != 0 ? (
        listadoState.map((mascota) => {
          return (
            <article key={mascota.id} className="mascota-item">
              <h3 className="title">
                Nombre del {mascota.tipo}: {mascota.nombre}
              </h3>
              <p className="description">Edad : {mascota.edad} Años</p>
              <p className="description">Peso : {mascota.peso} Kg</p>
              <p className="description">{mascota.castrado} es Castrado </p>
              <div className="cuadroPedido">
                <h3>Combo</h3>
                <p className="description">
                  Cantidad de alimento : {calcular(mascota).alimentos}
                </p>
                <p className="description">
                  Cantidad de complemento: {calcular(mascota).complemento}
                </p>
                <p className="description">
                  Complemento extra: {calcular(mascota).complementoE}
                </p>
              </div>
              {botonesHabilitados(mascota.id) ? (
                <>
                  <button
                    id={mascota.id}
                    className="pedido"
                    onClick={() =>
                      encargarPedido(mascota.id, calcular(mascota))
                    }
                  >
                    Pedido Combo
                  </button>
                  <button
                    className="delete"
                    onClick={() => borrarMascota(mascota.id)}
                  >
                    Borrar
                  </button>
                </>
              ) : (
                <>
                  <h3>Pedido Realizado!!</h3>
                </>
              )}
            </article>
          );
        })
      ) : (
        <h2>No hay Registro de mascotas para mostrar</h2>
      )}
    </>
  );
};
