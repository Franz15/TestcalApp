import React, { useEffect, useState } from 'react';
import { getAllResults } from "../../hooks/test9c/getAllResults";
import DeleteTest9c from '../tests/test9c/DeleteTest9c';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import moment from 'moment';




export function Table9c (){

let [results, setResults] = useState(([]));


results = getAllResults();
console.log (results);

const handleClick = (result,resultIndex)=>{
 DeleteTest9c(result);
console.log (resultIndex);
/*  setResults((prevResults) =>
    prevResults.filter((_, index) => index !== resultIndex));

    const newResults = results.filter((el) => el._id !== id);
    setRecords(newResults);

    return results.map((record) => {
      return (
        <Record
          result={result}
          deleteRecord={() => deleteRecord(result._id)}
          key={result._id}
        />
      );
    });*/
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
        {results.length >0 &&
        <TableBody>
          {results.map((result, resultIndex) => (
            <TableRow
              key={result._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {moment(result.fecha).format("DD-MM-YYYY")}
              </TableCell>
              <TableCell align="center">{result.test1Peso}</TableCell>
              <TableCell align="center">{Math.trunc(result.test1Porcent)}</TableCell>
              <TableCell align="center">{result.test2Peso}</TableCell>
              <TableCell align="center">{Math.trunc(result.test2Porcent)}</TableCell>
              <TableCell align="center">{result.test3Tiempo}</TableCell>
              <TableCell align="center">{result.variante}</TableCell>
              <TableCell align="center">{result.test4Tiempo}</TableCell>
              <TableCell align="center">{result.gradoTeorico}</TableCell>
              <TableCell align="center"><Button variant="outlined" onClick={() => handleClick(result._id,resultIndex)}><DeleteIcon/></Button></TableCell>

              
            </TableRow>
          ))}
        </TableBody>}
      </Table>
    </TableContainer>
)
}

