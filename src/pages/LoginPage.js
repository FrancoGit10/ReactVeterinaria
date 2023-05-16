import Login from "../components/Login";
import { NavBar } from "../components/NavBar";

// Pagina de Login
export const LoginPage = () => {
  return (
    <>
      <NavBar />
      {/* Contenido principal */}
      <section id="content" className="content">
        <Login />
      </section>

      {/* Barra lateral */}
      <aside className="lateral">
        <h1>Inicie Sesion</h1>
        <div className="nosotros">
          <p>
            Introduzca su correo y contraseña, haga click en iniciar sesion y
            disfrute de nuestra web
          </p>
        </div>
      </aside>
    </>
  );
};
