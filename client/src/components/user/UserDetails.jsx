import React from 'react';

export const UserDetails = ({nextStep, handleChange, values}) => {
  
    const Continue = e => {
        e.preventDefault();
        nextStep();
      }
  
  return (
<>
<header className="content__header content__header--public">
  <h1 className="content__title">Registro</h1>
</header>

<div className="content__posts"></div>

<form className="register-form">
  <div className="form-group">
    <label htmlFor="name">Nombre</label>
    <input type="text"  placeholder="Nombre" value={values.nombre}  name="nombre" onChange={handleChange('nombre')} />
  </div>

  <div className="form-group">
    <label htmlFor="apellido">Apellido</label>
    <input type="text" placeholder="Apellido" value={values.apellido} name="apellido" onChange={handleChange('apellido')} />
  </div>

  <div className="form-group">
    <label htmlFor="email">email</label>
    <input type="email" placeholder="Email" value={values.email} name="email" onChange={handleChange('email')} />
  </div>

  <div className="form-group">
    <label htmlFor="user">Nombre de Usuario</label>
    <input type="text" placeholder="Nombre de Usuario" value={values.user} name="user" onChange={handleChange('user')} />
  </div>

  <div className="form-group">
    <label htmlFor="password">Contraseña</label>
    <input type="password" placeholder="Contraseña" value={values.password} name="password" onChange={handleChange('password')} />
  </div>

  <button onClick={ Continue }>Next</button>
</form>
</>
  )
}
