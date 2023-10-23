import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { PrivateLayout } from "../components/layout/private/PrivateLayout";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Login } from "../components/user/Login";
import { Recover } from "../components/user/Recover";
import { Logout } from "../components/user/Logout";
import { Register } from "../components/user/Register";
import { Results } from "../components/result/Results";
import { AuthProvider } from "../context/AuthProvider";
import { Test9c } from "../components/tests/test9c/Test9c";
import { Config } from "../components/user/Config";
import DeleteTest9c from "../components/tests/test9c/DeleteTest9c";
import Dashboard from "../components/layout/private/Dashboard";
import Error404 from "../components/accesories/Error404";

export const Routing = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Login />} />
            <Route path="login" element={<Login />} />
            <Route path="registro" element={<Register />} />
            <Route path="recuperacion" element={<Recover />} />
          </Route>

          <Route path="/social" element={<PrivateLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="results" element={<Results />} />
            <Route path="logout" element={<Logout />} />
            <Route path="test9c" element={<Test9c />} />
            <Route path="ajustes" element={<Config />} />
            <Route path="borrar9c" element={<DeleteTest9c />} />
          </Route>

          <Route path="*" element={<Error404 />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
