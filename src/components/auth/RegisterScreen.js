import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { startRegister } from "../../actions/auth";
import { removeError, setError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";



export const RegisterScreen = () => {

  const dispatch = useDispatch();
//useSelector te trae información en tiempo real del state de
//todos tus reducers de la aplicación

  const {msgError, loading} = useSelector(state => state.ui);

  const [formValues, handleInputChange] = useForm({name:'', email:'', password:'', passwordConfirm:''})
  
  const {name, email, password, passwordConfirm} = formValues;

  const handleRegister = (e) =>{
    e.preventDefault();
    if(isFormValid()){
      dispatch(startRegister(email, password, name))
    }
  }

  const isFormValid = () =>{
    if(!/^[a-zA-Z]\w*$/.test(name.trim())){
      Swal.fire('Error', 'name is required and should start with a letter', 'error');
      return false;
    }
    else if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email)){
      Swal.fire('Error', 'email is not valid', 'error');
      return false;
    }
    else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)){
      Swal.fire('Error', 'Invalid password', 'error');
      return false
    }
    else if(password !== passwordConfirm){
      Swal.fire('Error', 'Passwords do not match', 'error');
      return false;
    }
    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className='auth__title'>Register</h3>
      <form onSubmit={handleRegister} className='animate__animated animate__fadeIn animate__faster'>
        {msgError && (<div className='auth__alert-error'>
          {msgError}
        </div>)}
        <input className='auth__input' type="text" placeholder="Name" name="name" value={name} onChange={handleInputChange} />
        <input className='auth__input' type="email" placeholder="Email" name="email" value={email} onChange={handleInputChange}/>
        <input className='auth__input' type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange}/>
        <input className='auth__input' type="password" placeholder="Confirm password" name="passwordConfirm" value={passwordConfirm} onChange={handleInputChange}/>
        <button disabled={loading} className='btn btn-primary btn-block mb-5' type="submit">Register</button>
        <Link className='link' to='/auth/login'>
          Already registered?
        </Link>
      </form>
    </>
  );
};
