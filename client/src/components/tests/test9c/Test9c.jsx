import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Test1Test2,Test3,Test4, Puntuaciones, Porcentaje } from "./ComponentsTest9c";
import { useAuth } from "../../../hooks/useAuth";
import { Global } from "../../../helpers/Global";
import Box from '@mui/material/Box';
import Sidebar from "../../layout/private/Sidebar";
import CssBaseline from '@mui/material/CssBaseline';
import { Toolbar } from "@mui/material";
import { Header } from "../../layout/private/Header";

export function Test9c() {
  //Token de autenticación
  const token = localStorage.getItem("token");
  const {auth} = useAuth();
  
  const pesoCorp = auth.peso;
  const[test1Peso,setTest1] = useState('');
  const[test2Peso,setTest2] = useState('');
  const[test3Tiempo,setTest3 ] = useState('');
  const[variante,setVariante ] = useState('');
  const[test4Tiempo,setTest4 ] = useState('');
  let [resultados,grado]= " ";

  const navigate = useNavigate();
  

  
  const handleSubmit = async (e)=>{
      let puntos1= (Test1Test2(test1Peso,pesoCorp));
      let test1Porcent=(Porcentaje(test1Peso,pesoCorp));
      let puntos2= (Test1Test2(test2Peso,pesoCorp));
      let test2Porcent=(Porcentaje(test1Peso,pesoCorp));
      let puntos3= (Test3(test3Tiempo,variante));
      let puntos4= (Test4(test4Tiempo));
      [resultados,grado]= (Puntuaciones(puntos1,puntos2,puntos3,puntos4));

      //Prevenir actualizacion de la pantalla
    e.preventDefault(); 
    //Recoger los datos del formulario
      const form = {
        fecha: new Date(),
        userId: auth._id,
        gradoDeclarado: auth.grado,
        pesoCorp: auth.peso,
        test1Peso: test1Peso,
        test1Porcent: test1Porcent,
        test1Punt: puntos1,
        test2Peso: test2Peso,
        test2Porcent: test2Porcent,
        test2Punt: puntos2,
        test3Tiempo:test3Tiempo,
        variante: variante,
        test3Punt:puntos3,
        test4Tiempo:test4Tiempo,
        test4Punt:puntos4,
        gradoTeorico:grado
      };
      let newRecord = form;
      console.log("form", form);
  // ??????????????????????????????????????????
  const request = await fetch(Global.url + 'results/save', {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token
    },
    body: JSON.stringify(newRecord),
  });
  const data = await request.json();

  if (data.status == "success") {
    console.log ("result", data.result);
  } else {
    
  }
      console.log (resultados,grado)   
      return {puntos1,puntos2,puntos3,puntos4,resultados,grado}
    }
      const handleChange1 = e =>{
        setTest1(e.target.value);
      }
      const handleChange2 = e =>{
        setTest2(e.target.value);
      }
      const handleChange3 = e =>{
        setTest3(e.target.value);
      }
      const handleChangeVariante = e =>{
        setVariante(e.target.value);
      }
      const handleChange4 = e =>{
        setTest4(e.target.value);
      }
      
 return (
   <div>
     <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Header></Header>
      <Sidebar></Sidebar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
     <h3>Nueva Batería de Tests</h3>

     <form onSubmit={handleSubmit}>
       <div className="form-group">
         <label htmlFor="test1Peso">Introduce el peso levantado en el Test 1 (Fuerza de Dedos)</label>
         <input placeholder="Test 1" name = "test1Peso" onChange ={handleChange1} type ='number' id = "test1Peso" value ={test1Peso}/>
       </div>
       <div className="form-group">
         <label htmlFor="test2Peso">Introduce el peso levantado en el Test 2 (Fuerza de Tracción)</label>
         <input placeholder="Test 2" name = "test2Peso" onChange ={handleChange2} type ='number' id = "test2Peso" value ={test2Peso}/>
       </div>
       <div className="form-group">
         <label htmlFor="test3Tiempo">Introduce el tiempo del Test 3 (Fuerza Abdominal)</label>
         <input placeholder="Test 3" name = "test3Tiempo" onChange ={handleChange3} type ='text' id = "test3Tiempo" value ={test3Tiempo}/>
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="variante"
             id="Rodillas Dobladas"
             value="Rodillas Dobladas"
             checked={variante === "Rodillas Dobladas"}
             onChange ={handleChangeVariante}
           />
           <label htmlFor="rodillasDobladas" className="form-check-label">Rodillas Dobladas</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="variante"
             id="L-Sit"
             value="L-Sit"
             checked={variante === "L-Sit"}
             onChange ={handleChangeVariante}
           />
           <label htmlFor="LSit" className="form-check-label">L-Sit</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="variante"
             id="Front Lever"
             value="Front Lever"
             checked={variante === "Front Lever"}
             onChange ={handleChangeVariante}
           />
           <label htmlFor="frontLever" className="form-check-label">Front Lever</label>
         </div>
       </div>
       <div></div>
       <div className="form-group">
         <label htmlFor="test4Tiempo">Introduce el tiempo del Test 4 (Fuerza de agarre)</label>
         <input placeholder="Test 4" onChange ={handleChange4} type ='text' id = "test4Tiempo" value ={test4Tiempo}/>
       </div>

       <div className="form-group">
         <input
           type="submit"
           value="Calcula"
           className="btn btn-primary"
         />
       </div>
     </form>
     </Box>
     </Box>
   </div>
 );
}