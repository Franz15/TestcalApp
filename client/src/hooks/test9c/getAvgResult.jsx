import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { useAuth } from "../useAuth";
export default function getLastResult() {
  //Token de autenticación
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const [result, setResult] = useState([]);
  const params = useParams();

  useEffect(() => {
    getResult();
  }, [params]);

  const getResult = async () => {
    console.log("userGrade", auth._id);

    const request = await fetch(Global.url + "results/grade/" + auth._id, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    const data = await request.json();
    if (data.status == "success") {
      if (data.result == null) {
        setResult(0);
      } else {
      }
    } else {
      console.log("errorrrr");
    }
  };
  return result;
}
