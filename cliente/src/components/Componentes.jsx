import { getValue } from "@testing-library/user-event/dist/utils";
import React, {useState} from "react";
//import "../style.css";

export default function Avatar({ id, name = "No name", size }) {
  let src = `https://randomuser.me/api/portraits/men/${id}.jpg`; //Cambiar dirección para enlazarlo con la BBDD;
  //if (!id) src = "/media/default.png";
  let pictureClassName = "";
  if (size === "small") {
    pictureClassName = "is-small";
  } else if (size === "large") {
    pictureClassName = "is-large";
  } else {
    pictureClassName = "";
  }

  return (
    <picture className={pictureClassName}>
      {id ? <img src={src} /> : <img src="/media/default.png" />}
      <div id="name">{name}</div>
    </picture>
  );
}








  
  

  
  

//Conexion a la base de datos
// mongodb+srv://admin:admin@cluster0.cgpucp2.mongodb.net/?retryWrites=true&w=majority
