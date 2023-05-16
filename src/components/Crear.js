import React, { useState } from "react";
import { GuardarEnStorage } from "../helpers/GuardarEnStorage";

// Componente que crea nuevas mascotas
export const Crear = ({ setListadoState }) => {
  const tituloComponente = "Registrar Mascota";
  const [nombreState, setNombreState] = useState("");
  const [edadState, setEdadState] = useState("");
  const [pesoState, setPesoState] = useState("");
  const [mascotaState, setMascotaState] = useState({
    tipo: "",
    nombre: "",
    edad: "",
    peso: "",
    castrado: "",
  });
  const [castradoState, setCastradoState] = useState(false);
  const [tipoState, setTipoState] = useState(false);

  const onOptionChange = (e) => {
    setCastradoState(e.target.value);
  };
  const onOptionChange0 = (e) => {
    setTipoState(e.target.value);
  };
  const { nombre, edad, peso } = mascotaState;
  const conseguirDatosForm = (e) => {
    e.preventDefault();

    //Conseguir datos del formulario
    let target = e.target;
    let tipo = target.tipo.value;
    let nombre = target.nombre.value;
    let edad = target.edad.value;
    let peso = target.peso.value;
    let castrado = target.castrado.value;

    //Crear objeto de la mascota a guardar
    let mascota = {
      id: new Date().getTime(),
      tipo,
      nombre,
      edad,
      peso,
      castrado,
    };

    //Guardar estado
    setMascotaState(mascota);

    //Actualizar el estado del listado principal
    setListadoState((elementos) => {
      if (elementos != null) {
        return [...elementos, mascota];
      } else return [mascota];
    });

    //Guardar en el almacenamiento local
    GuardarEnStorage(localStorage.getItem("usuario"), mascota);
    setNombreState("");
    setEdadState("");
    setPesoState("");
    setCastradoState("");
    setTipoState("");
  };

  return (
    <div className="add">
      <h3 className="title">{tituloComponente}</h3>
      <strong>
        {nombre && edad && peso && "Has registrado la mascota " + nombre}
      </strong>

      <form onSubmit={conseguirDatosForm}>
        <input 
          type="text"
          id="nombre"
          name="nombre"
          onChange={(ev) => setNombreState(ev.target.value)}
          value={nombreState}
          placeholder="Nombre de mascota"
        />
        <input 
          type="number"
          id="edad"
          name="edad"
          onChange={(ev) => setEdadState(ev.target.value)}
          value={edadState}
          placeholder="Edad de la mascota"
        />
        <input 
          type="number"
          id="peso"
          name="peso"
          onChange={(ev) => setPesoState(ev.target.value)}
          value={pesoState}
          placeholder="peso de la Mascota"
        />
        <p className="formulario">
          Tipo de Mascota :
          <input
            type="radio"
            id="tipo"
            name="tipo"
            defaultValue="Perro"
            checked={tipoState === "Perro"}
            onChange={onOptionChange0}
          />{" "}
          Perro
          <input
            type="radio"
            id="tipo"
            name="tipo"
            defaultValue="Gato"
            checked={tipoState === "Gato"}
            onChange={onOptionChange0}
          />{" "}
          Gato <br />
        </p>

        <p className="formulario">
          ¿ Es Castrado ? :
          <input
            type="radio"
            name="castrado"
            defaultValue="Si"
            checked={castradoState === "Si"}
            onChange={onOptionChange}
          />{" "}
          Si
          <input
            type="radio"
            name="castrado"
            defaultValue="No"
            checked={castradoState === "No"}
            onChange={onOptionChange}
          />{" "}
          No <br />
        </p>
        <input type="submit" id="save" value="Guardar" />
      </form>
    </div>
  );
};
