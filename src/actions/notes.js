import { addDoc, collection } from "firebase/firestore";
import { db } from "../components/firebase/firebase-config";
import { types } from "../types/types";

export const startNewNote = () =>{
    return async(dispatch, getState) =>{
        const {uid} = getState().auth;
        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime()
        }
        
        const docRef = await addDoc(collection(db, `${uid}/journal/notes`),newNote);
        dispatch(activeNote(docRef.id, newNote))
    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});
