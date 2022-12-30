import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Global } from "../../../helpers/Global";
import { getAllResults } from "../../../hooks/test9c/getAllResults";

const DeleteTest9c = async (resultId) => {

console.log(resultId);
//Token de autenticación
const token = localStorage.getItem("token");
console.log(token);

    //Petición al backend
    const request = await fetch (Global.url + "results/remove/" + resultId,{
      method: "DELETE",
      headers:{
        "Content-Type": "application/json",
        "Authorization": token
      }
    });

    const data = await request.json();
    
    if (data.status == "success"){
       return data.status;
       
    } else{

    }

}

export default DeleteTest9c