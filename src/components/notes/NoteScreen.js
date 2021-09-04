import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {

    const dispatch = useDispatch()
    const {active: entry} = useSelector(state => state.notes);
    const [formValues, handleInputChange, reset] = useForm(entry);
    const {body, title, url, id} = formValues;

    const activeId = useRef(entry.id);

    useEffect(() => {
        //de esta manera nos damos cuenta que la nota cambio y hacemos lo mejor
        //para el rendimiento del render y nos afecte lo menos posible 
        //solo hacemos referencia dinamica sin render del id de la entry con useRef
        //y lo evaluamos con el entry actual
        if(entry.id !== activeId.current){
            reset(entry);
            activeId.current = entry.id;
        }

    }, [entry, reset]);

    useEffect(() => {
        dispatch(activeNote(formValues.id, {...formValues}))
    }, [formValues, dispatch]);

    const handleDelete = () =>{
        dispatch(startDeleting(id))
    }

    return (
        <div className='notes__main-content'>
            <NotesAppBar/>
             <div className='notes__content animate__animated animate__bounceIn'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                    value={title}
                    onChange={handleInputChange}
                    name='title'
                />
                <textarea placeholder='What happened today?'
                className='notes__textarea' value={body}
                onChange={handleInputChange}
                name='body'>
                </textarea>
                <div className='notes__image'>
                    <img src={url}/>
                </div>
             </div>
             <button onClick={handleDelete} className='btn btn-danger'>Delete</button>
        </div>
    )
}
