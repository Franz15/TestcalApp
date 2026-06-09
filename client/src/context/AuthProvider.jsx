import { React, useState, useEffect, createContext } from "react";
import { Global } from "../helpers/Global";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [loading, setLoading] = useState(true);
  let tokenValidated = false;

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    //Sacar datos de usuario del localstorage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    //Comprobar si tengo el token y el user
    if (!token || !user || token == null) {
      setLoading(false);
      tokenValidated = false;
      return false;
    }
    //Transformar los datos a un objeto Javascript
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    //Petición Ajax al backend para que compruebe el token y me devuelva los datos del usuario
    const request = await fetch(Global.url + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();
    if (data.status == "success") {
      //Setear el estado del auth
      setAuth(data.user);
      setLoading(false);
      tokenValidated = true;
    } else {
      setLoading(false);
      tokenValidated = false;
      return false;
    }
  };
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        loading,
        tokenValidated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
