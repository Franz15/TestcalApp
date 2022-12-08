import React, {useState} from "react";

function aSegundos(str) {   //Funcion que convierte el tiempo en minutos en segundos.
    if (str.includes(':')){
      var pieces = str.split(":");
      var result = Number(pieces[0]) * 60 + Number(pieces[1]);
      return result.toFixed(3);
    }else{
      result = parseInt(str);
      return result;
    }
    
    
}

export function Puntuaciones(puntuacion1,puntuacion2,puntuacion3,puntuacion4) { //Función que convierte la puntuación obtenida en los tests en el grado teórico al que el usuario podría llegar en este nivel físico
    let grado = "";
    let puntuacion =
      parseInt(puntuacion1) +
      parseInt(puntuacion2) +
      parseInt(puntuacion3) +
      parseInt(puntuacion4);
    if (puntuacion === 40) {
      grado = "9c";
      console.log(grado);
    } else if (puntuacion === 39) {
      grado = "9b+";
      console.log(grado);
    } else if (puntuacion === 38 || puntuacion === 37) {
      grado = "9b";
    } else if (puntuacion === 36 || puntuacion === 35) {
      grado = "9a+";
    } else if (puntuacion === 34 || puntuacion === 33) {
      grado = "9a";
    } else if (puntuacion === 32 || puntuacion === 31) {
      grado = "8c+";
    } else if (puntuacion === 30 || puntuacion === 29) {
      grado = "8c";
    } else if (puntuacion === 28 || puntuacion === 27) {
      grado = "8b+";
    } else if (puntuacion === 26 || puntuacion === 25) {
      grado = "8b";
    } else if (puntuacion === 24 || puntuacion === 23) {
      grado = "8a+";
    } else if (puntuacion === 22 || puntuacion === 21) {
      grado = "8a";
    } else if (puntuacion === 20 || puntuacion === 19) {
      grado = "7c+";
    } else if (puntuacion === 18 || puntuacion === 17) {
      grado = "7c";
    } else if (puntuacion === 16 || puntuacion === 15) {
      grado = "7b+";
    } else if (puntuacion === 14 || puntuacion === 13) {
      grado = "7b";
    } else if (puntuacion === 12 || puntuacion === 11) {
      grado = "7a+";
    } else if (puntuacion === 10 || puntuacion === 9) {
      grado = "7a";
    } else if (puntuacion === 8 || puntuacion === 7) {
      grado = "6c+";
    } else if (puntuacion === 6 || puntuacion === 5) {
      grado = "6c";
    } else if (puntuacion === 4 || puntuacion === 3) {
      grado = "6b";
    } else if (puntuacion === 2 || puntuacion === 1) {
      grado = "6a";
    } else {
      grado = "V";
    }
    console.log("Puntuacion: ",puntuacion,"Grado: ", grado);
    return [puntuacion, grado];
   
}

export function Porcentaje(a,b){
  let porcentaje = (100 * parseInt(a)) / parseInt(b) + 100;
  return porcentaje;
}

export function Test1Test2(kilos,pesoCorporal) { //Función que calcula la puntuación obtenida en los tests 1 y 2. La variable kilos debe ser el valor en kg AÑADIDOS de lastre. Calcular el porcentaje que ese lastre corresponde al peso total del individuo que hace los tests
    let puntos = "";
    let x = Porcentaje(kilos,pesoCorporal);
    if (x >= 100 && x < 110) {
      puntos = 1;
    } else if (x >= 110 && x < 120) {
      puntos = 2;
    } else if (x >= 120 && x < 130) {
      puntos = 3;
    } else if (x >= 130 && x < 140) {
      puntos = 4;
    } else if (x >= 140 && x < 150) {
      puntos = 5;
    } else if (x >= 150 && x < 160) {
      puntos = 6;
    } else if (x >= 160 && x < 180) {
      puntos = 7;
    } else if (x >= 180 && x < 200) {
      puntos = 8;
    } else if (x >= 200 && x < 220) {
      puntos = 9;
    } else if (x >= 220) {
      puntos = 10;
    } else {
      puntos = 0;
    }
    console.log ("Test1/2: ", puntos);
    return puntos;
}

export function Test3(tiempo, variante){
    let puntos;
    let t = aSegundos(tiempo);
    if (t < 5){
      puntos = 0;
    } else if (variante === "rodillas"){
        if (t<10){
          puntos =0 ;
        } else if (t>=10 && t<20){
          puntos = 1;
        } else if (t>=20 && t<30){
          puntos = 2;
        } else if (t>=30){
          puntos = 3;
        }
    } else if (variante === "lsit"){
        if (t<10){
        puntos =0 ;
        } else if (t>=10 && t<15){
        puntos = 4;
        } else if (t>=15 && t<20){
        puntos = 5;
        } else if (t>=20){
        puntos = 6;
        }
    } else if (variante === "lever"){
      if (t<5){
      puntos =0 ;
      } else if (t>=5 && t<10){
      puntos = 7;
      } else if (t>=10 && t<20){
      puntos = 8;
      } else if (t>=20 && t<30){
      puntos = 9;
      }else if (t>=30){
        puntos = 10;
      }
    }
    console.log ("Test 3: ", puntos)
    return puntos;
    
}

export function Test4(tiempo) {
    let puntos;
    let t = aSegundos(tiempo);
  
    if (t >= 30 && t < 60) {
      puntos = 1;
    } else if (t >= 60 && t < 90) {
      puntos = 2;
    } else if (t >= 90 && t < 120) {
      puntos = 3;
    } else if (t >= 120 && t < 150) {
      puntos = 4;
    } else if (t >= 150 && t < 180) {
      puntos = 5;
    } else if (t >= 180 && t < 210) {
      puntos = 6;
    } else if (t >= 210 && t < 240) {
      puntos = 7;
    } else if (t >= 240 && t < 300) {
      puntos = 8;
    } else if (t >= 300 && t < 360) {
      puntos = 9;
    } else if (t >= 360) {
      puntos = 10;
    } else {
      puntos = 0;
    }
    console.log("Test 4: ", puntos);
    return puntos;
    //console.log (x)
}

/*export function FormularioTests(){
    const[pesoCorporal,setPeso] = useState('');
    const[test1,setTest1] = useState('');
    const[test2,setTest2] = useState('');
    const[test3,setTest3 ] = useState('');
    const[variante,setVariante ] = useState('');
    const[test4,setTest4 ] = useState('');
    let [resultados,grado]= " ";
  
    const handleSubmit = evt =>{
      evt.preventDefault(); 
      let puntos1= (Test1Test2(test1,pesoCorporal));
      let puntos2= (Test1Test2(test2,pesoCorporal));
      let puntos3= (Test3(test3,variante));
      let puntos4= (Test4(test4));
      [resultados,grado]= (Puntuaciones(puntos1,puntos2,puntos3,puntos4));
  
      console.log (resultados,grado)
      return <span>
       Resultados
      </span>
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
  return(
    <>
  
       <form onSubmit={handleSubmit}>
        
       <input placeholder="Peso" onChange ={handleChangePeso} type ='number' id = "peso" value ={pesoCorporal}/>
       <input placeholder="Test 1" onChange ={handleChange1} type ='number' id = "test1" value ={test1}/>
       <input placeholder="Test 2" onChange ={handleChange2} type ='number' id = "test2" value ={test2}/>
       <input placeholder="Test 3" onChange ={handleChange3} type ='text' id = "test3" value ={test3}/>
       <input placeholder="variante" onChange ={handleChangeVariante} type ='text' id = "variante" value ={variante}/>
       <input placeholder="Test 4" onChange ={handleChange4} type ='text' id = "test4" value ={test4}/>
        <button type="submit">Botón</button>
       </form>
    </>)*/