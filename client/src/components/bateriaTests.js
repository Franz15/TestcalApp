import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Test1Test2,Test3,Test4, Puntuaciones, Porcentaje } from "./ComponentesTests";

 
export default function BateriaTests() {
  const[pesoCorp,setPeso] = useState('');
  const[test1Peso,setTest1] = useState('');
  const[test2Peso,setTest2] = useState('');
  const[test3Tiempo,setTest3 ] = useState('');
  const[variante,setVariante ] = useState('');
  const[test4Tiempo,setTest4 ] = useState('');
  let [resultados,grado]= " ";

  const navigate = useNavigate();

  
  async function handleSubmit (evt){
      evt.preventDefault(); 
      let puntos1= (Test1Test2(test1Peso,pesoCorp));
      let porcent1=(Porcentaje(test1Peso,pesoCorp));
      let puntos2= (Test1Test2(test2Peso,pesoCorp));
      let porcent2=(Porcentaje(test1Peso,pesoCorp));
      let puntos3= (Test3(test3Tiempo,variante));
      let puntos4= (Test4(test4Tiempo));
      [resultados,grado]= (Puntuaciones(puntos1,puntos2,puntos3,puntos4));

      const form = {
        //UserID
        fecha: new Date().toISOString().replace(/T.*/,'').split('-').reverse().join('-'),
        pesoCorp: pesoCorp,
        //gradoUser
        test1Peso: test1Peso,
        puntos1: puntos1,
        porcent1: porcent1,
        test2Peso: test2Peso,
        puntos2: puntos2,
        porcent2: porcent2,
        test3Tiempo:test3Tiempo,
        variante: variante,
        puntos3:puntos3,
        test4Tiempo:test4Tiempo,
        puntos4:puntos4,
        grado:grado
      };
      console.log(form);
      
      
      // When a post request is sent to the create url, we'll add a new record to the database.
  //const [newResult,setNewResult] = { ...form };

  // ??????????????????????????????????????????
  await fetch("http://localhost:5555/record/add/results", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(form),
  })
  .catch(error => {
    window.alert(error);
    return 
  });

  //form({ fecha: "", pesoCorp:"", test1Peso: "", puntos1:"", test2Peso: "", puntos2:"", test3Tiempo:"", variante:"", puntos3:"",test4Tiempo:"",puntos4:"",resultados:"",grado:""});
  navigate("/");
      
      console.log (resultados,grado)   
      return {puntos1,puntos2,puntos3,puntos4,resultados,grado}
    }
    const handleChangePeso = evt =>{  
      setPeso(evt.target.value);
      }
      const handleChange1 = evt =>{
        setTest1(evt.target.value);
      }
      const handleChange2 = evt =>{
        setTest2(evt.target.value);
      }
      const handleChange3 = evt =>{
        setTest3(evt.target.value);
      }
      const handleChangeVariante = evt =>{
        setVariante(evt.target.value);
      }
      const handleChange4 = evt =>{
        setTest4(evt.target.value);
      }


async function onSubmit(e) {
  e.preventDefault();

  
}
      
 return (
   <div>
     <h3>Nueva Batería de Tests</h3>
     <form onSubmit={handleSubmit}>
       <div className="form-group">
         <label htmlFor="pesoCorp">Introduce tu Peso</label>
         <input placeholder="Peso Corporal" onChange ={handleChangePeso} type ='number' id = "pesoCorp" value ={pesoCorp}/>
       </div>
       <div className="form-group">
         <label htmlFor="test1Peso">Introduce el peso levantado en el Test 1 (Fuerza de Dedos)</label>
         <input placeholder="Test 1" onChange ={handleChange1} type ='number' id = "test1Peso" value ={test1Peso}/>
       </div>
       <div className="form-group">
         <label htmlFor="test2Peso">Introduce el peso levantado en el Test 2 (Fuerza de Tracción)</label>
         <input placeholder="Test 2" onChange ={handleChange2} type ='number' id = "test2Peso" value ={test2Peso}/>
       </div>
       <div className="form-group">
         <label htmlFor="test3Tiempo">Introduce el tiempo del Test 3 (Fuerza Abdominal)</label>
         <input placeholder="Test 3" onChange ={handleChange3} type ='text' id = "test3Tiempo" value ={test3Tiempo}/>
       </div>
       <div className="form-group">
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="rodillasDobladas"
             value="rodillas"
             checked={variante === "rodillas"}
             onChange ={handleChangeVariante}
           />
           <label htmlFor="rodillasDobladas" className="form-check-label">Rodillas Dobladas</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="LSit"
             value="lsit"
             checked={variante === "lsit"}
             onChange ={handleChangeVariante}
           />
           <label htmlFor="LSit" className="form-check-label">L-Sit</label>
         </div>
         <div className="form-check form-check-inline">
           <input
             className="form-check-input"
             type="radio"
             name="positionOptions"
             id="frontLever"
             value="lever"
             checked={variante === "lever"}
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
   </div>
 );
}