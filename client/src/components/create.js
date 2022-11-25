import React, { useState } from "react";
import { useNavigate } from "react-router";

 
export default function Create() {
 const [form, setForm] = useState({
   nombre: "",
   apellido: "",
   usuario: "",
   mail: "",
   password:""
   //Aqui quizás podría ir añadida la foto si mongoDB la acepta
 });
 const navigate = useNavigate();
 
 // These methods will update the state properties.
 function updateForm(value) {
   return setForm((prev) => {
     return { ...prev, ...value };
   });
 }
 
 // This function will handle the submission.
 async function onSubmit(e) {
   e.preventDefault();
 
   // When a post request is sent to the create url, we'll add a new record to the database.
   const newPerson = { ...form };
 

   // ??????????????????????????????????????????
   await fetch("http://localhost:5555/record/add", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: JSON.stringify(newPerson),
   })
   .catch(error => {
     window.alert(error);
     return 
   });
 
   setForm({ nombre: "", apellido: "", usuario: "", mail:"", password:"" });
   navigate("/");
 }
 
 // This following section will display the form that takes the input from the user.
 return (
   <div>
     <h3>Crea Nuevo Usuario</h3>
     <form onSubmit={onSubmit}>
       <div className="form-group">
         <label htmlFor="nombre">Nombre</label>
         <input
           type="text"
           className="form-control"
           id="nombre"
           value={form.nombre}
           onChange={(e) => updateForm({ nombre: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="apellido">Apellido</label>
         <input
           type="text"
           className="form-control"
           id="apellido"
           value={form.apellido}
           onChange={(e) => updateForm({ apellido: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="usuario">Usuario</label>
         <input
           type="text"
           className="form-control"
           id="usuario"
           value={form.usuario}
           onChange={(e) => updateForm({ usuario: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="mail">Email</label>
         <input
           type="email"
           className="form-control"
           id="mail"
           value={form.email}
           onChange={(e) => updateForm({ mail: e.target.value })}
         />
       </div>
       <div className="form-group">
         <label htmlFor="password">Contraseña</label>
         <input
           type="password"
           className="form-control"
           id="password"
           value={form.password}
           onChange={(e) => updateForm({ password: e.target.value })}
         />
       </div>
       <div className="form-group">
         <input
           type="submit"
           value="Registrate"
           className="btn btn-primary"
         />
       </div>
     </form>
   </div>
 );
}