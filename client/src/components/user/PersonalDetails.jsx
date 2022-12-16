import React from 'react';
import DatePicker from 'react-datepicker';
export const PersonalDetails = ({prevStep, handleChange,saveUser, values}) => {
    
    const Previous = e => {
        e.preventDefault();
        prevStep();
      }

      const Register = e => {
        e.preventDefault();
        saveUser(values);
      }

    return (
        <>
        <header className="content__header content__header--public">
          <h1 className="content__title">Registro</h1>
        </header>
        
        <div className="content__posts"></div>
        
        <form className="register-form">
              
          <div className="form-group">
            <label htmlFor="apellido">Grado</label>
            <input type="text" placeholder="Grado" value={values.grado} name="grado" onChange={handleChange('grado')} />
          </div>
        
          <div className="form-group">
            <label htmlFor="email">Altura (en cm)</label>
            <input type="number" placeholder="Altura" value={values.altura} name="altura" onChange={handleChange('altura')} />
          </div>
        
          <div className="form-group">
            <label htmlFor="peso">Peso (en kg)</label>
            <input type="number" placeholder="Peso" value={values.peso} name="peso" onChange={handleChange('peso')} />
          </div>
        
          <div className="form-group">
            <label htmlFor="envergadura">Envergadura (en cm)</label>
            <input type="number" placeholder="Envergadura" value={values.envergadura} name="envergadura" onChange={handleChange('envergadura')} />
          </div>

          <button onClick={ Previous }>Previous</button>
          <button onClick={Register}>registate</button>
        </form>
        </>
          )
}
