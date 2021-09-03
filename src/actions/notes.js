import { addDoc, collection, updateDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";
import { db } from "../components/firebase/firebase-config";
import { fileUpload } from "../helpers/fileUpload";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";

export const startNewNote = () =>{
    return async(dispatch, getState) =>{
        try{
            const {uid} = getState().auth;
            const newNote = {
                title: '',
                body: '',
                date: new Date().getTime()
            }
            
            const docRef = await addDoc(collection(db, `${uid}/journal/notes`),newNote);
            dispatch(activeNote(docRef.id, newNote))
        }
        catch(error){
            Swal.fire('Error', 'new note failed', 'error');
        }

    }
}

export const activeNote = (id, note) => ({
    type: types.notesActive,
    payload: {
        id,
        ...note
    }
});

export const startLoadingNotes = (uid) =>{
    return async(dispatch) =>{
        try{
            const notes = await loadNotes(uid);
            dispatch(setNotes(notes));
        }
        catch(error){
            Swal.fire('Error', 'notes loading failed', 'error');
        }
    }
}

export const setNotes = (notes) =>({
    type: types.notesLoad,
    payload: notes
});

export const startSaveNote = (note) =>{
    return async(dispatch, getState) =>{
        try{
            const {uid} = getState().auth;
            if(!note.url){
                delete note.url;
            }
            const noteToFirestore = {...note};
            //asi es como eliminas una llave de un objeto
            delete noteToFirestore.id;
            const refDoc = doc(db, `/${uid}/journal/notes/${note.id}`);
            await updateDoc(refDoc, noteToFirestore);
            dispatch(refreshNote(note.id, note));
            Swal.fire('Saved', note.title, 'success')
        }
        catch(error){
            Swal.fire('Error', 'Saving note failed', 'error');
        }

    }
}

export const refreshNote = (id, note) =>({
    type: types.notesUpdated,
    payload : {
        id, 
        note: {
            id,
            ...note
        }
    }
});
//todos los actions start se refieren a tareas asincronas
export const startUploading = (file) =>{
    return async(dispatch, getState) =>{
        const {active} = getState().notes;
        Swal.fire({
            title: 'Uploading...',
            text: 'Please wait...',
            allowOutsideClick: false,
            showConfirmButton: false,
            willOpen: () =>{
                Swal.showLoading();
            }
        });
        const fileUrl = await fileUpload(file);
        active.url = fileUrl;

        dispatch(startSaveNote(active))

        Swal.close();
    }
}