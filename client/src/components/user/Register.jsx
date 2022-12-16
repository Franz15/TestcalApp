import { React, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Global } from "../../helpers/Global";

export const Register = () => {
  const { form, changed } = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const saveUser = async (e) => {
    //Prevenir actualización de la pantalla
    e.preventDefault();
    //recoger los datos del formulario
    let newUser = form;

    //Guardar usuario en el backend
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await request.json();

    if (data.status == "success") {
      setSaved("saved");
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Registro</h1>
      </header>

      <div className="content__posts"></div>

      <form className="register-form" onSubmit={saveUser}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="nombre" onChange={changed} />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input type="text" name="apellido" onChange={changed} />
        </div>

        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="email" name="email" onChange={changed} />
        </div>

        <div className="form-group">
          <label htmlFor="user">Usuario</label>
          <input type="text" name="user" onChange={changed} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" onChange={changed} />
        </div>

        <div className="form-group">
          <label htmlFor="grado">Máximo grado encadenado en roca</label>
          <input type="text" name="grado" onChange={changed} />
        </div>
        
        <div className="form-group">
          <label htmlFor="altura">Altura (en cm)</label>
          <input type="number" name="altura" onChange={changed} />
        </div>

        <div className="form-group">
          <label htmlFor="peso">Peso (en kg)</label>
          <input type="number" name="peso" onChange={changed} />
        </div>

        <div className="form-group">
          <label htmlFor="envergadura">Envergadura (en cm)</label>
          <input type="number" name="envergadura" onChange={changed} />
        </div>

        <input type="submit" value="Regístrate" className="btn btn-success" />
      </form>

      {saved == "saved" ? 
        <strong className="alert alert-success">
          Usuario registrado correctamente
        </strong>
       :""}
      {saved == "error" ? 
        <strong className="alert alert-error">Usuario no registrado</strong>
       :""}
    </>
  );
};












      