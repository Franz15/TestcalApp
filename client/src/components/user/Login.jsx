import {React, useState} from 'react';
import {useForm} from '../../hooks/useForm';
import { Global } from "../../helpers/Global";
import {useAuth} from "../../hooks/useAuth";

export const Login = () => {
  
  const {form, changed} = useForm({});
  const [saved, setSaved] = useState("not_sended");

  const {setAuth} = useAuth();

  

  const loginUser = async(e)=>{
    e.preventDefault();

    console.log("form", form);
    console.log ("saved", saved);
    

    //Datos del usuario
    let userToLogin = form;

    //Petición al backend
    const request = await fetch (Global.url + "user/login",{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userToLogin)

    });

    const data = await request.json();
    console.log ("login data", data);
    
    if (data.status == "success"){
      //Persistir los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user",JSON.stringify(data.user));
      setSaved("login");

      //Setear datos en el auth
      setAuth(data.user);
      console.log ("data user", data.user);
      console.log ("Local Storage", localStorage);
      console.log ("Local Storage token", localStorage.token);
      console.log ("Local Storage user", localStorage.user);
      
      //Redirección
      window.location.reload();

    } else setSaved("error");

  }
  
  
  
  return (
    <>
      <header className="content__header content__header--public">
                <h1 className="content__title">Login</h1>
      </header>
    
      <div className="content__posts"></div>
        <form className ='form-login' onSubmit={loginUser}>
          <div className='form-group'>
            <label htmlFor='email'>Email</label>
            <input type="email" name="email" onChange ={changed}/>
          </div>

          <div className='form-group'>
            <label htmlFor='password'>Contraseña</label>
            <input type="password" name="password" onChange ={changed}/>
          </div>

          <input type="submit" value="Login" className="btn btn-success" />
        </form>

        {saved == "error" ? 
        <strong className="alert alert-error">Email o contraseña incorrectos</strong>
       :""}
    </>
  )
}

