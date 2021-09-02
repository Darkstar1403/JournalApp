import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
} from "react-router-dom";
import { AuthRouter } from "./AuthRouter";
import { JournalScreen } from "../components/journal/JournalScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../actions/auth";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";

export const AppRouter = () => {

  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
//esto nos sirve para no perder el logueo ya que se encarga de verificar
//si hay alguna cuenta logeada en firebase
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user)=>{
      if(user?.uid){
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn])

  if( checking ){
    return (
    <div className='container-fluid d-flex flex-column justify-content-center align-items-center text-secondary' style={{height:'100vh'}}>
        <div className="spinner-border " style={{width: '6rem', height: '6rem'}} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
    </div>

    )
  }

  return (
    <Router>
      <div>
        <Switch>
        <PublicRoute 
            path="/auth"
            component={ AuthRouter }
            isAuthenticated={ isLoggedIn }
        />

        <PrivateRoute 
            exact
            isAuthenticated={ isLoggedIn }
            path="/"
            component={ JournalScreen }
        />

        <Redirect to="/auth/login" />
        </Switch>
      </div>
    </Router>
  );
};
