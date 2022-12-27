import { React, useState, useEffect, createContext } from 'react';
import { Global } from '../helpers/Global';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth] = useState ({});
    const [loading, setLoading] = useState (true);

    
    useEffect(()=>{
      authUser();
    },[]);

    const authUser = async()=>{
      //Sacar datos de usuario del localstorage
      const token =localStorage.getItem("token");
      const user =localStorage.getItem("user");
      console.log (localStorage);
      //Comprobar si tengo el token y el user
      if (!token || !user || token == null){
        setLoading(false);
        return false;
      }
      //Transformar los datos a un objeto Javascript
      const userObj = JSON.parse(user);
      const userId = userObj.id;
      console.log ("user", user);
      console.log("userObj", userObj);
      console.log ("userId", userId);

     
      //Petición Ajax al backend para que compruebe el token y me devuelva los datos del usuario
      const request = await fetch (Global.url + "user/profile/" + userId, {
        
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });

      let data = await request.json();

      console.log ("request", request);
      console.log("data", data);
      
      //Setear el estado del auth
      setAuth(data.user);
      setLoading(false);

    }
  return (
    <AuthContext.Provider
      value ={{
        auth,
        setAuth,
        loading
      }}>
        {children}
      </AuthContext.Provider>
  )
}

export default AuthContext;
