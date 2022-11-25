import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
 
export default function Edit() {
 const [form, setForm] = useState({
  nombre: "",
  apellido: "",
  usuario: "",
  mail: "",
  password:"",
  records: [],
 });
 const params = useParams();
 const navigate = useNavigate();
 
 useEffect(() => {
   async function fetchData() {
     const id = params.id.toString();
     const response = await fetch(`http://localhost:5555/record/${params.id.toString()}`);
 
     if (!response.ok) {
       const message = `An error has occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const record = await response.json();
     if (!record) {
       window.alert(`Record with id ${id} not found`);
       navigate("/");
       return;
     }
 
     setForm(record);
   }
 
   fetchData();
 
   return;
 }, [params.id, navigate]);
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 async function onSubmit(e) {
   e.preventDefault();
   const editedPerson = {
     nombre: form.nombre,
     apellido: form.apellido,
     usuario: form.usuario,
     email: form.mail,
     password: form.password
   };
 
   // This will send a post request to update the data in the database.
   await fetch(`http://localhost:5555/update/${params.id}`, {
     method: "POST",
     body: JSON.stringify(editedPerson),
     headers: {
       'Content-Type': 'application/json'
     },
   });
 
   navigate("/");
 }
 
 // This following section will display the form that takes input from the user to update the data.
 return (
   <div>
     <h3>Actualiza</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="nombre">Nombre: </label>
         <input
           type="text"
           className="form-control"
           id="nombre"
           value={form.nombre}
           onChange={(e) => updateForm({ nombre: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="apellido">Apellido: </label>
         <input
           type="text"
           className="form-control"
           id="apellido"
           value={form.apellido}
           onChange={(e) => updateForm({ apellido: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="mail">Email: </label>
         <input
           type="email"
           className="form-control"
           id="email"
           value={form.mail}
           onChange={(e) => updateForm({ mail: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Contraseña: </label>
         <input
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
      
       
       <br />
 
       <div className="form-group">
         <input
           type="submit"
           value="Update Record"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}