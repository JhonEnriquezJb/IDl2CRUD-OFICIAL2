import React, { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../global-components/button";
import { Input } from "../global-components/input";
import { axiosSinToken } from "../helpers/axios";
import { useForm } from "../hooks/useForm";

const classes = {
    main: 'register',
    container: 'register__container',
    title: 'register__title',
    input: 'register__input',
    wrap: 'register_blu',
  }

export const Form = () => {
    const location = useLocation();
    const [isEdit, setIsEdit] = useState(false);

  const [values, handleInputChange, reset, handleSetValues] = useForm({
    name: "",
    lastname: "",
    age: 0,
    gender: "",
    email: "",
  });
  const { name, lastname, age, gender, email } = values;

  useEffect(() => {
    if (location.state) {
        handleSetValues(location.state)
    }
  }, [location.state])
  

  const onRegister = async (e) => {

    if (name.trim().length < 2) {
      return alert('Nombre es obligatorio');
    }
    if (lastname.trim().length < 2) {
      return alert('Apellidos es obligatorio');
    }
    if (email.trim().length < 2) {
      return alert('Correo  es obligatorio');
    }
    setIsEdit(true);

    if (location.state) {
        console.log('carga data')
        const resp = await axiosSinToken(`/clients/${location.state.id}`,{
            name, lastname, age, gender, email
        }, 'PUT');
    
        console.log(resp)
    
        if (resp?.ok) {
          alert('Se actualizó correctamente')
          setIsEdit(false);
        } else {
          alert('Error al Editar')
          setIsEdit(false);
        }

    } else {
        const resp = await axiosSinToken('/clients',{
            name, lastname, age, gender, email
        }, 'POST');
    
        console.log(resp)
    
        if (resp?.ok) {
          alert('Se registró el usuario')
          reset();
          setIsEdit(false);
        } else {
          alert('Error al registrar')
          setIsEdit(false);
        }
    }
  }

  return (
    <div className={classes.container}>
      <h3 className={classes.title}>{location.state ? 'Editar Cliente' : 'Registrar Cliente'}</h3>
      <Input
            type='text'
            name='name'
            placeholder='Nombre'
            className='register__input'
            autoComplete='off'
            title='Nombre del cliente'
            value={name}
            onChange={handleInputChange}
          />
          <Input
            type='text'
            name='lastname'
            placeholder='Apellidos'
            className='register__input'
            autoComplete='off'
            title='Apellido'
            value={lastname}
            onChange={handleInputChange}
          />
          <Input
            type='number'
            name='age'
            placeholder='Edad'
            className='register__input'
            autoComplete='off'
            title='Edad del cliente'
            value={age}
            onChange={handleInputChange}
          />
          <Input
            type='text'
            name='gender'
            placeholder='Género'
            className='register__input'
            autoComplete='off'
            title='Género'
            value={gender}
            onChange={handleInputChange}
          />
          <Input
            type='text'
            name='email'
            placeholder='Email'
            className='register__input'
            autoComplete='off'
            title='Correo del cliente'
            value={email}
            onChange={handleInputChange}
          />
          <div className='register__wrap-button'>
            <Button
              title={location.state ? 'Actualizar' : 'Registrar'}
              disabled={isEdit}
              className={`${isEdit ? 'disabled' : ''}`}
              onClick={onRegister}
            />
          </div>
          <a href="/">{'Ir a inicio >'}</a>
    </div>
  );
};
