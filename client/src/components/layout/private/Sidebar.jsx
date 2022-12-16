import React from "react";
import { Global } from "../../../helpers/Global";
import {useAuth} from "../../../hooks/useAuth";
import avatar from "../../../assets/img/user.png";

const Sidebar = () => {
  
  const {auth} = useAuth();

  console.log("auth", auth);
  
  return (
    <aside className="layout__aside">
      <header className="aside__header">
        <h1 className="aside__title">Hola, {auth.nombre}</h1>
      </header>

      <div className="aside__container">
        <div className="aside__profile-info">
          <div className="profile-info__general-info">
            <div className="general-info__container-avatar">
              {auth.image != "default.png" && <img src={Global.url + "user/avatar/" + auth.image} className="container-avatar__img" alt="Foto de perfil"/>}
              {auth.image == "default.png" && <img src={avatar} className="container-avatar__img" alt="Foto de perfil"/>}
              
            </div>

            <div className="general-info__container-names">
              <a href="#" className="container-names__name">
                {auth.nombre} {auth.apellido}
              </a>
              <p className="container-names__nickname">{auth.user}</p>
            </div>
          </div>

          
        </div>

        <div className="aside__container-form">
          <form className="container-form__form-post">
          </form>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
