import React from "react";

//En la seccion del vendedor, este componente muestra la lista de Vendedores, y la de mascotas y Dueños de las mismas
export const ListadoVMD = () => {
  const tituloComponente1 = "Lista de Vendedores";
  const tituloComponente2 = "Lista de Mascotas y Dueños";

  function conseguirMascota(nombre) {
    let mascotas = JSON.parse(localStorage.getItem(nombre));
    let i = 1;
    const soloMascotas = [
      mascotas.map((mascotas) => {
        return " " + mascotas.nombre + " -";
      }),
    ];
    return soloMascotas;
  }

  if (localStorage.getItem("nombreVendedores") != null) {
    let vendedores = JSON.parse(localStorage.getItem("nombreVendedores"));
    let nombreClientes = JSON.parse(localStorage.getItem("nombreClientes"));
    let valorKey = 0;

    return (
      <div className="listasGrid">
        <div className="vendedor">
          <h3 className="title">{tituloComponente1}</h3>
          {vendedores.map((vendedores) => {
            return (
              <ul key={valorKey++} className="listaVendedor">
                <li>Vendedor: {vendedores} </li>
              </ul>
            );
          })}
        </div>
        <div className="mascotaDueno">
          <h3 className="title">{tituloComponente2}</h3>
          {nombreClientes != null
            ? nombreClientes.map((nombre) => {
                return (
                  <ul key={valorKey++} className="listaVendedor">
                    <li>Dueño: {nombre} </li>
                    {localStorage.getItem(nombre) != null
                      ? conseguirMascota(nombre).map((mascotas) => {
                          return <li key={valorKey++}>Mascotas:{mascotas} </li>;
                        })
                      : console.log("valor")}
                  </ul>
                );
              })
            : console.log("valor")}
        </div>
      </div>
    );
  }
};
