import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useAuth } from "../useAuth";

export default function getAvgResult(opt) {
  //Token de autenticación
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [result, setResult] = useState([]);
  const params = useParams();
  const option = opt;
  useEffect(() => {
    getResult();
  }, [params]);

  const getResult = async () => {
    
    const request = await fetch(Global.url + "results/grade/" + auth._id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify({opt: option})
    });
    const data = await request.json();
    if (data.status == "success") {
      if (data.result != null) {
        setResult(data.result);
      } else {
        setResult(0);
      }
    } else {
    }
  };
  return result;
}
