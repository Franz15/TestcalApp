import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Global";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

export function Results() {
  //Token de autenticación
  const token = localStorage.getItem("token");

  const [results, setResults] = useState([]);
  const params = useParams();

  let showButton = false;

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
      
      if (data.total>data.itemsPerPage){ç
        setResults(data.results);
        showButton = true;
      }else{
        setResults(data.results);
        showButton = false;
      }
    }
  };
  return (
    <>
      <section className="layout__content">
        <header className="content__header">
          <h1 className="content__title">Resultados Test</h1>
        </header>

        <div className="content__posts">
          {results.map((result) => {
            return (
            <div className="posts__post">
              <table>
                <thead className="post__container">
                  <tr className="post__header">
                    <th> Fecha </th>
                    <th className="user-info__divider"> | </th>
                    <th> Peso Test 1 </th>
                    <th className="user-info__divider"> | </th>
                    <th>Peso Test 1</th>
                    <th className="user-info__divider"> | </th>
                    <th>Peso Test 2</th>
                    <th className="user-info__divider"> | </th>
                    <th>Peso Test 2</th>
                    <th className="user-info__divider"> | </th>
                    <th>Tiempo Test 3</th>
                    <th className="user-info__divider"> | </th>
                    <th>Variante</th>
                    <th className="user-info__divider"> | </th>
                    <th>Tiempo Test 4</th>
                    <th className="user-info__divider"> | </th>
                    <th>Resultado</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="post__body">
                      <td>{result.fecha}
                      </td>
                      <td className="user-info__divider"> | </td>
                      <td>{result.test1Peso}kg
                      </td>
                      <td className="user-info__divider"> | </td>
                      <td>{result.test1Porcent}%
                      </td>
                      <td className="user-info__divider"> | </td>
                      <td>{result.test2Peso}kg
                      </td>
                      <td className="user-info__divider"> | </td>
                      <td>{result.test2Porcent}%
                      </td>
                      <td className="user-info__divider"> | </td>
                      <td>{result.test3Tiempo}s
                      </td>
                      <td className="user-info__divider"> | </td>
                      <td>{result.variante}
                      </td>
                      <td className="user-info__divider"> | </td>
                      <td>{result.test4Tiempo}s
                      </td>
                      <td className="user-info__divider"> | </td>
                      <td>{result.gradoTeorico}</td>
                  <td>
                  
                  </td>
                  </tr>
                </tbody>

                
              </table>
              <Link className="post__buttons"></Link>
                  <button href="#" className="post__button">
                    <i className="fa-solid fa-trash-can"></i>
                  </button>
              </div>
            );
          })}
        </div>
        
        <div className="content__container-btn">
        {showButton == true &&
          <button className="content__btn-more-post">
            Ver mas resultados
          </button>}
        </div>
      </section>
    </>
  );
}
