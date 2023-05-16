import React, { useRef, useState } from "react";
import { Navigate } from "react-router-dom";
import { GuardarEnStorage } from "../helpers/GuardarEnStorage";

//Componente para Iniciar Sesion
function Login() {
  const [nombre, setNombre] = useState("");
  const [contrasena, setContrasena] = useState("");
  const errorMessage = validate(nombre, contrasena);
  let intento = false;
  const vContrasena = useRef(null);

  if (localStorage.getItem("dataVendedores") === null) {
    let vendedor = {
      id: new Date().getTime(),
      nombre: "supervendedor",
      email: "supervendedor@gmail.com",
      contrasena: "clave",
    };
    GuardarEnStorage("nombreVendedores", vendedor.nombre);
    GuardarEnStorage("dataVendedores", vendedor);
  }
  function validar(data, nombres, cliente) {
    data.map((data) => {
      let tipo = JSON.parse(localStorage.getItem(nombres));
      let validador = 0;
      if (nombre === data.nombre && contrasena === data.contrasena) {
        tipo.map((tipo) => {
          if (tipo === data.nombre) validador = 1;
        });
        if (validador === 1) {
          if (cliente === 1)
            localStorage.setItem("validacionCliente", "verdadera");
          else localStorage.setItem("validacionVendedor", "verdadera");

          localStorage.setItem("usuario", data.nombre);
          validador = 0;
        }
      }
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let cliente = JSON.parse(localStorage.getItem("dataClientes"));
    let vendedor = JSON.parse(localStorage.getItem("dataVendedores"));
    if (localStorage.getItem("dataClientes") != null) {
      validar(cliente, "nombreClientes", 1);
    }
    validar(vendedor, "nombreVendedores", 0);
    if (
      localStorage.getItem("validacionCliente") === "verdadera" ||
      localStorage.getItem("validacionVendedor") === "verdadera"
    ) {
      setNombre("");
      setContrasena("");
      window.location.reload(true);
    } else {
      intento = true;
      vContrasena.current.innerHTML =
        "Contraseña o Nombre de usuario incorrectos";
    }
  };

  if (localStorage.getItem("validacionCliente") === "verdadera") {
    return <Navigate to="/usersession" />;
  } else if (localStorage.getItem("validacionVendedor") === "verdadera") {
    return <Navigate to="/sellersession" />;
  } else {
    return (
      <div>
        <form className="formPatron" onSubmit={handleSubmit}>
          <h1>Iniciar Sesion</h1>
          <div>
            <input
              type="text"
              placeholder="Ingrese su nombre de Usuario"
              value={nombre}
              onChange={(ev) => {
                setNombre(ev.target.value);
                vContrasena.current.innerHTML = "";
              }}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Contraseña"
              value={contrasena}
              onChange={(ev) => setContrasena(ev.target.value)}
            />
          </div>
          <p>{errorMessage}</p>
          <div ref={vContrasena}></div>
          <button className="buttonForm" type="submit" disabled={errorMessage}>
            Iniciar Sesion
          </button>
        </form>
      </div>
    );
  }
}
const validate = (nombre, contrasena) => {
  if (nombre.length > 0) {
  } else return "Rellene el Nombre de usuario";
  if (contrasena.length > 0) {
    if (contrasena.length < 4)
      return " La contraseña debe contener minimo 4 caracteres";
  } else return "Rellene la contraseña";
};
export default Login;
