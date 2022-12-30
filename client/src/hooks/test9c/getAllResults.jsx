import React, { useEffect, useState } from "react";
import { Global } from '../../helpers/Global';
import { useParams } from "react-router-dom";





export function getAllResults (){
  //Token de autenticación
  const token = localStorage.getItem("token");

  const [results, setResults] = useState([]);
  const params = useParams();


  useEffect(() => {
    getResults();
  }, [params]);

  const getResults = async (nextPage = 1) => {
    const request = await fetch(Global.url + "results/list" + "/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token,
      },
    });

    const data = await request.json();
    if (data.status == "success") {
        setResults(data.results);
      }else{
        setResults(data.results);
    }
  };
    return (
    results
  )
}

