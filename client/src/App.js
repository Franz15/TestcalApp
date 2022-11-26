/*
 

import Login from "./components/login";
 
const App = () => {
 return (
   <div>
    <button>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/register">
             Registro
          </NavLink>
        </li>
      </ul>
    </button>
    <button>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <NavLink className="nav-link" to="/login">
             Login
          </NavLink>
        </li>
      </ul>
    </button>
     <Routes>
       <Route exact path="*" element={<App />} />
       <Route exact path="/home" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/register" element={<Create />} />
       <Route path="/login" element={<Login />} />
     </Routes>
   </div>
 );
};
 
export default App;*/

//---------------------------------------------------------------------------------------
//--------------------------ORIGINAL, FUNCIONA SEGURO------------------------------------
import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Tests from "./components/bateriaTests";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<RecordList />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
       <Route path="/create" element={<Create />} />
       <Route path="/bateriaTests" element={<Tests />} />
     </Routes>
   </div>
 );
};
 
export default App; 

/*
import React from "react";
 
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
 
// We import all the components we need in our app
import Navbar from "./components/navbar";
import RecordList from "./components/recordList";
import Edit from "./components/edit";
import Create from "./components/create";
import Home from "./components/home";
 
const App = () => {
 return (
   <div>
     <Navbar />
     <Routes>
       <Route exact path="/" element={<Home />} />
       <Route path="/edit/:id" element={<Edit />} />
       <Route path="/create" element={<Create />} />
     </Routes>
   </div>
 );
};
 
export default App;*/

