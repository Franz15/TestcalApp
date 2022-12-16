import React, { Component, useState } from 'react'
import { UserDetails } from './UserDetails';
import { PersonalDetails } from './PersonalDetails';
import { Global } from "../../helpers/Global";

export class Signup extends Component {
  
  state = {
    step:1,
    nombre: '',
    apellido: '',
    email: '',
    user: '',
    password: '',
    fechaNac: '',
    //sexo: '',
    grado: '',
    altura: '',
    peso: '',
    envergadura: ''
  }
  
  saveUser = async (values) => {
    //Prevenir actualización de la pantalla
    


    //recoger los datos del formulario
    let newUser = values;

    //Guardar usuario en el backend
    const request = await fetch(Global.url + "user/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });

    const data = await request.json();

    if (data.status == "success") {
      <strong className="alert alert-success">
          Usuario registrado correctamente
        </strong>
    } else {
      <strong className="alert alert-error">Usuario no registrado</strong>
    }
  };

    // Va al step anterior
    prevStep = () => {
        const { step } = this.state;
        this.setState({ step: step - 1 });
    }

    // Lleva al siguiente paso
    nextStep = () => {
        const { step } = this.state;
        this.setState({ step: step + 1 });
    }

    // Gestiona los datos introducidos por el user
    handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }
  
    render() {
        const { step } = this.state;
        const { nombre, apellido, email, password, fechaNac, grado, altura, peso, envergadura } = this.state;
        const values = { nombre, apellido, email, password, fechaNac, grado, altura, peso, envergadura }

        switch (step) {
            case 1: 
              return (
                <UserDetails 
                nextStep = {this.nextStep}
                handleChange = {this.handleChange}
                values = {values}
                />
              )
            case 2: 
              return (
                <PersonalDetails 
                prevStep = {this.prevStep}
                handleChange = {this.handleChange}
                saveUser = {this.saveUser}
                values = {values}/>
              )
            case 3: 
              return (
                <Confirmation />
              )
            case 4:
              return (
                <Success />
              )
            // never forget the default case, otherwise VS code would be mad!
            default: 
               // do nothing
          }
  }
}
