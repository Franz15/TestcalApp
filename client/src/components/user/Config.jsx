import React from "react";
import { useState } from "react";
import { json } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { SerializeForm } from "../../helpers/SerializeForm";
import { useAuth } from "../../hooks/useAuth";
import avatar from "../../assets/img/user.png";

export const Config = () => {
  const { auth, setAuth } = useAuth();

  const [saved, setSaved] = useState("not_saved");

  const updateUser = async (e) => {
    e.preventDefault();

    //Token de autenticación
    const token = localStorage.getItem("token");

    //Recoger datos del formulario
    let newDataUser = SerializeForm(e.target);

    //Borrar campos innecesarios
    delete newDataUser.file0;

    //Actualizar usuario en BBDD
    const request = await fetch (Global.url + 'user/update',{
        method: "PUT",
        body: JSON.stringify(newDataUser),
        headers:{
            "Content-Type": "application/json",
            "Authorization": token
        }
    });
    const data = await request.json();

    if (data.status == "success"){
       delete data.user2.password;

        setAuth (data.user2);
        setSaved ("saved");
    } else {
        setSaved ("error")
    }

    //Subir imagen de perfil
    const fileInput = document.querySelector("#file");

    if (data.status == "success" && fileInput.files[0]){
      const formData = new FormData();

      //Recogiendo imagen para subir
      formData.append('file0', fileInput.files[0]);

      //Petición para enviar el fichero
      const uploadRequest = await fetch( Global.url + 'user/upload',{
        method:"POST",
        body: formData,
        headers: {
          "Authorization": token
        }
      });
      const uploadData = await uploadRequest.json();
      
      if (uploadData.status == "success"){
      delete uploadData.user.password;

      setAuth(uploadData.user);
      //console.log (uploadData.user2);
      setSaved("saved");
      } else {
        setSaved ("error");
      }

    }
  };

  return (
    <>
      <header className="content__header content__header--public">
        <h1 className="content__title">Ajustes</h1>
      </header>

      <div className="content__posts"></div>

      <form className="config-form" onSubmit={updateUser}>
        <div className="form-group">
          <label htmlFor="name">Nombre</label>
          <input type="text" name="nombre" defaultValue={auth.nombre} />
        </div>

        <div className="form-group">
          <label htmlFor="apellido">Apellido</label>
          <input type="text" name="apellido" defaultValue={auth.apellido} />
        </div>

        <div className="form-group">
          <label htmlFor="email">email</label>
          <input type="email" name="email" defaultValue={auth.email} />
        </div>

        <div className="form-group">
          <label htmlFor="user">Usuario</label>
          <input type="text" name="user" defaultValue={auth.user} />
        </div>

        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password"/>
        </div>

        <div className="form-group">
          <label htmlFor="grado">Máximo grado encadenado en roca</label>
          <input type="text" name="grado" defaultValue={auth.grado} />
        </div>

        <div className="form-group">
          <label htmlFor="altura">Altura (en cm)</label>
          <input type="number" name="altura" defaultValue={auth.altura} />
        </div>

        <div className="form-group">
          <label htmlFor="peso">Peso (en kg)</label>
          <input type="number" name="peso" defaultValue={auth.peso} />
        </div>

        <div className="form-group">
          <label htmlFor="envergadura">Envergadura (en cm)</label>
          <input
            type="number"
            name="envergadura"
            defaultValue={auth.envergadura}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Avatar</label>
          <div className="general-info__container-avatar">
              {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil"/>}
              {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>}
              
            </div>
            <br/>
          <input type="file" name="file0" id="file" />
        </div>
        <br />
        <input type="submit" value="Regístrate" className="btn btn-success" />
      </form>

      {saved == "saved" ? (
        <strong className="alert alert-success">
          Usuario modificado correctamente
        </strong>
      ) : (
        ""
      )}
      {saved == "error" ? (
        <strong className="alert alert-error">Usuario no modificado</strong>
      ) : (
        ""
      )}
    </>
  );
};
