import React from "react";
import image from "../../images/Perros_y_gatos_L.png";

export const Header = () => {
  return (
    <>
      {/* Cabecera */}
      <header className="header">
        <img src={image} alt="Logo" />
        <h1>Veterinaria FAV</h1>
      </header>
    </>
  );
};
