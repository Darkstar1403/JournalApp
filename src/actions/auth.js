import Swal from 'sweetalert2';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { googleAuthProvider } from '../components/firebase/firebase-config';
import {types} from '../types/types';
import { finishLoading, startLoading } from './ui';
import { noteLogout } from './notes';

export const startLoginEmailPassword = (email, password) =>{
    return (dispatch) =>{
        dispatch(startLoading());
        const auth = getAuth();
        return signInWithEmailAndPassword(auth, email, password)
        .then(({user})=>{
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
            Swal.fire(
                "You're logged",
                'You clicked the button!',
                'success'
              );
        }).catch(e =>{
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        });
        
    }
}

export const  startRegister = (email, password, name) =>{
    return (dispatch) =>{
        dispatch(startLoading());
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password).then(async ({user})=>{
            await updateProfile(user, {displayName:name});
            dispatch(login(user.uid, user.displayName));
            dispatch(finishLoading());
            Swal.fire(
                "You are already registered",
                'You clicked the button!',
                'success'
              );
        }).catch(e =>{
            console.log(e);
            dispatch(finishLoading());
            Swal.fire('Error', e.message, 'error');
        })
        
    }
}

export const startGoogleLogin = () =>{
    return (dispatch) =>{
        dispatch(startLoading());
        const auth = getAuth();
        signInWithPopup(auth, googleAuthProvider)
            .then(({user}) =>{
                dispatch(login(user.uid, user.displayName))
            }).catch(e => console.log(e));
            dispatch(finishLoading());
        
    }
}

export const login = (uid, displayName) =>(
    {
        type:types.login,
        payload: {
            uid,
            displayName
        }
    }
)

export const startLogout = () =>{
    return async(dispatch) =>{
        const auth = getAuth();
       await signOut(auth);
       dispatch(logout());
       dispatch(noteLogout());
    }
}

export const logout = () =>({
    type:types.logout
})