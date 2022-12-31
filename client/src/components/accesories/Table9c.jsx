import React, { useEffect, useState } from "react";
import { getAllResults } from "../../hooks/test9c/getAllResults";
import DeleteTest9c from "../tests/test9c/DeleteTest9c";
import { Global } from "../../helpers/Global";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import moment from "moment";
import { Paper } from "@mui/material";

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
      <Button
        variant="outlined"
        onClick={() => {
          props.deleteResult(props.result._id), window.location.reload(false);
        }}
      >
        <DeleteIcon />
      </Button>
    </TableCell>
  </TableRow>
);

export function Table9c() {
  //Token de autenticación
  const token = localStorage.getItem("token");

  let [results, setResults] = useState([]);

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
      setResults(results.results);
    }
    getResults();

    return;
  }, [results.length]);

  const deleteResult = (id) => {
    DeleteTest9c(id);
    const newResults = results.filter((el) => el._id !== id);
    setResults(newResults);
  };

  function resultList() {
    return results.map((result) => {
      return (
        <Result
          result={result}
          deleteResult={() => deleteResult(result._id)}
          key={result._id}
        />
      );
    });
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
