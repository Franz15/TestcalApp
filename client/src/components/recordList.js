import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
 
const Record = (props) => (
 <tr>
   <td>{props.record.fecha}</td>
   <td>{props.record.pesoCorp}</td>
   <td>{props.record.test1Peso}</td>
   <td>{props.record.test1Porcent}</td>
   <td>{props.record.test2Peso}</td>
   <td>{props.record.test2Porcent}</td>
   <td>{props.record.test3Tiempo}</td>
   <td>{props.record.variante}</td>
   <td>{props.record.test4Tiempo}</td>
   <td>{props.record.gradoTeorico}</td>
   <td>
     <Link className="btn btn-link" to={`/edit/${props.record._id}`}>Editar</Link> |
     <button className="btn btn-link"
       onClick={() => {
         props.deleteRecord(props.record._id);
       }}
     >
       Borrar
     </button>
   </td>
 </tr>
);
 
export default function RecordList() {
 const [records, setRecords] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getRecords() {
     const response = await fetch(`http://localhost:5555/record/results`);
 
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const records = await response.json();
     setRecords(records);
   }
 
   getRecords();
   
   return;
 }, 
    [records.length]);
 
 
 // This method will delete a record
 async function deleteRecord(id) {
   await fetch(`http://localhost:5555/results/${id}`, {
     method: "DELETE"
   });
 
   const newRecords = records.filter((el) => el._id !== id);
   setRecords(newRecords);
 }
 
 // This method will map out the records on the table
 function recordList() {
   return records.map((record) => {
     return (
       <Record
         record={record}
         deleteRecord={() => deleteRecord(record._id)}
         key={record._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div>
     <h3>Resultados Test</h3>
     <table className="table table-striped" style={{ marginTop: 20 }}>
       <thead>
         <tr>
          <th>Fecha</th>
          <th>Peso Corporal</th>
          <th>Peso Test 1 (Kg)</th>
          <th>Peso Test 1(%)</th>
          <th>Peso Test 2 (Kg)</th>
          <th>Peso Test 2(%)</th>
          <th>Tiempo Test 3</th>
          <th>Variante</th>
          <th>Tiempo Test 4</th>
          <th>Acciones</th>
         </tr>
       </thead>
       <tbody>{recordList()}</tbody>
     </table>
   </div>
 );
}