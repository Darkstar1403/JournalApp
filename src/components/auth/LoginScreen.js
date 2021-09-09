import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { removeError } from "../../actions/ui";
import { useForm } from "../../hooks/useForm";

export const LoginScreen = () => {

  const { loading} = useSelector(state => state.ui);

  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({email: '', password: ''})

  const {email, password} = formValues;

  const handleLogin = (e) =>{
      e.preventDefault();
      if(isFormValid()){
        dispatch(startLoginEmailPassword(email, password));
      }
  }

  const handleGoogleLogin = () =>{
    dispatch(startGoogleLogin());
  }

  const isFormValid = () =>{
    if(!/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email)){
      Swal.fire('Error', 'Email is not valid', 'error');
      return false;
    }
    else if(!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password)){
      Swal.fire('Error', 'Password is not valid', 'error');
      return false
    }
    dispatch(removeError());
    return true;
  }

  return (
    <>
      <h3 className='auth__title'>Login</h3>
      <form onSubmit={handleLogin} className='animate__animated animate__fadeIn animate__faster'>
        {/*msgError && (<div className='auth__alert-error'>{msgError}</div>)*/}
        <input className='auth__input' type="email" placeholder="Email" name="email" value={email} onChange={handleInputChange}/>
        <input className='auth__input' type="password" placeholder="Password" name="password" value={password} onChange={handleInputChange}/>
        <button disabled={loading} className='btn btn-primary btn-block' type="submit">Login</button>
        <div className='auth__social-networks'>
          <p>Login with social networks</p>
          <div 
              className="google-btn"
              onClick={handleGoogleLogin}
              
          >
              <div className="google-icon-wrapper">
                  <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
              </div>
              <p className="btn-text">
                  <b>Sign in with google</b>
              </p>
          </div>
        </div>
        <Link className='link' to='/auth/register'>
          Create new account
        </Link>
      </form>
    </>
  );
};
