import React, { useState } from "react";
import { GuardarEnStorage } from "../helpers/GuardarEnStorage";

//Este componente permite hacer el registro del usuario, o de los vendedores en la respectiva seccion
function Registrarse() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [edad, setEdad] = useState("");
  const [domicilio, setDomicilio] = useState("");
  const [registrado, setRegistrado] = useState(false);
  const errorMessage = validate(nombre, email, contrasena, edad, domicilio);
  const conseguirDatosForm = (e) => {
    e.preventDefault();

    //Conseguir datos del formulario
    let target = e.target;
    let nombre = target.nombre.value;
    let email = target.email.value;
    let contrasena = target.contrasena.value;
    let edad = target.edad.value;
    let domicilio = target.domicilio.value;

    //Crear objeto de los valores a guardar
    let datos = {
      id: new Date().getTime(),
      nombre,
      email,
      contrasena,
      edad,
      domicilio,
    };

    let vendedores = JSON.parse(localStorage.getItem("nombreVendedores"));
    let usuario = localStorage.getItem("usuario");
    let validarVendedor = 0;
    if (vendedores != null) {
      vendedores.forEach((vendedores) => {
        if (vendedores === usuario) {
          validarVendedor = 1;
        }
      });
    }
    if (validarVendedor === 1) {
      GuardarEnStorage("dataVendedores", datos);
      GuardarEnStorage("nombreVendedores", nombre);
    } else {
      //Guardar en el almacenamiento local
      GuardarEnStorage("dataClientes", datos);
      GuardarEnStorage("nombreClientes", nombre);
      setNombre("");
      setEmail("");
      setContrasena("");
      setEdad("");
      setDomicilio("");
    }
    setRegistrado(true);
  };

  return (
    <div>
      <form className="formPatron" onSubmit={conseguirDatosForm}>
        {registrado === false ? (
          <>
            <h1>Crea tu cuenta</h1>
            <div>
              <input
                type="text"
                id="nombre"
                name="nombre"
                placeholder="Nombre de Usuario"
                value={nombre}
                onChange={(ev) => setNombre(ev.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
            </div>
            <div>
              <input
                type="password"
                id="contrasena"
                name="contrasena"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(ev) => setContrasena(ev.target.value)}
              />
            </div>
            <div>
              <input
                type="number"
                id="edad"
                name="edad"
                placeholder="Edad"
                value={edad}
                onChange={(ev) => setEdad(ev.target.value)}
              />
            </div>
            <div>
              <input
                type="text"
                id="domicilio"
                name="domicilio"
                placeholder="Domicilio"
                value={domicilio}
                onChange={(ev) => setDomicilio(ev.target.value)}
              />
            </div>
            <p>{errorMessage}</p>
            <button
              className="buttonForm"
              type="submit"
              disabled={errorMessage}
            >
              Registrarse{" "}
            </button>
          </>
        ) : (
          <>
            <h2>Se registro Exitosamente!!!</h2>
            <p>Haga click en Iniciar Sesion</p>
          </>
        )}
      </form>
    </div>
  );
}

const validate = (nombre, email, contrasena, edad, domicilio) => {
  let repetidoNombre = false;
  let nombreClientes = JSON.parse(localStorage.getItem("nombreClientes"));
  if (nombre.length > 0) {
    if (nombreClientes != null) {
      nombreClientes.map((nombreGuardado) => {
        if (nombre === nombreGuardado) {
          repetidoNombre = true;
        }
      });
    }
  } else return "Rellene el nombre de usuario";
  if (repetidoNombre === true) {
    return "El Nombre de usuario ya existe";
  }
  if (email.length > 0) {
    if (!email.includes("@")) return "Email incorrecto";
  } else return "Rellene el Email";
  if (contrasena.length > 0) {
    if (contrasena.length < 4)
      return "contraseña incorrecta debe contener minimo 4 caracteres";
  } else return "Rellene la contraseña";
  if (edad.length > 0) {
  } else return "Rellene la edad";
  if (domicilio.length > 0) {
  } else return "Rellene el domicilio";
};
export default Registrarse;
