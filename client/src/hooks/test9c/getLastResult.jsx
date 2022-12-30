import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";



 export default function getLastResult(){
     //Token de autenticación
  const token = localStorage.getItem("token");

  const [result, setResult] = useState([]);
  const params = useParams();

  useEffect(() => {
    getResult();
  }, [params]);

    const getResult = async () => {
  
        const request = await fetch(Global.url + "results/result", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": token,
          },
        });
    
        const data = await request.json();
        if (data.status == "success") {
            setResult(data.result);
            console.log("Result ", result.test4Punt);
          }else{
            console.log("errorrrr");
          }
        };

  return result;

   
}
