import React, { useEffect, useState } from "react";
import DeleteTest9c from "../tests/test9c/DeleteTest9c";
import { Global } from "../../helpers/Global";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";

const Result = (props) => (
  <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
    <TableCell component="th" scope="row">
      {moment(props.result.fecha).format("DD-MM-YYYY")}
    </TableCell>
    <TableCell align="center">{props.result.test1Peso}</TableCell>
    <TableCell align="center">
      {Math.trunc(props.result.test1Porcent)}
    </TableCell>
    <TableCell align="center">{props.result.test2Peso}</TableCell>
    <TableCell align="center">
      {Math.trunc(props.result.test2Porcent)}
    </TableCell>
    <TableCell align="center">{props.result.test3Tiempo}</TableCell>
    <TableCell align="center">{props.result.variante}</TableCell>
    <TableCell align="center">{props.result.test4Tiempo}</TableCell>
    <TableCell align="center">{props.result.gradoTeorico}</TableCell>
    <TableCell align="center">
      <button
        className="button_table edit"
        onClick={() => {
          props.deleteResult(props.result._id);
        }}
      >
        <DeleteIcon />
      </button>
    </TableCell>
  </TableRow>
);

export function Table9c({ results, handleResults }) {
  //Token de autenticación
  const token = localStorage.getItem("token");
  const [resultados, setResultados] = useState(results);

  useEffect(() => {
    async function getResults() {
      const response = await await fetch(Global.url + "results/list", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      const results = await response.json();

      if (handleResults) {
        handleResults(results.results);
        setResultados(results.results);
      } else {
        setResultados(results.results);
      }
    }
    getResults();
  }, []);

  const deleteResult = (id) => {
    DeleteTest9c(id);
    const newResults = resultados.filter((el) => el._id !== id);

    if (handleResults) {
      handleResults(newResults);
      setResultados(newResults);
    } else {
      setResultados(newResults);
    }
  };

  function resultList() {
    if (resultados) {
      return resultados.map((result) => {
        return (
          <Result
            result={result}
            deleteResult={() => deleteResult(result._id)}
            key={result._id}
          />
        );
      });
    }
  }
  return (
    <TableContainer>
      <Table stickyHeader aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Fecha</TableCell>
            <TableCell align="center">Peso Test 1(kg)</TableCell>
            <TableCell align="center">Peso Test 1(%)</TableCell>
            <TableCell align="center">Peso Test 2(kg)</TableCell>
            <TableCell align="center">Peso Test 2(%)</TableCell>
            <TableCell align="center">Tiempo Test 3 (s)</TableCell>
            <TableCell align="center">Variante</TableCell>
            <TableCell align="center">Tiempo Test 4 (s)</TableCell>
            <TableCell align="center">Resultado</TableCell>
            <TableCell align="center"> </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>{resultList()}</TableBody>
      </Table>
    </TableContainer>
  );
}
