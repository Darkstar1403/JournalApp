import React from 'react'
import { NotesAppBar } from './NotesAppBar'

export const NoteScreen = () => {
    return (
        <div className='notes__main-content'>
            <NotesAppBar/>
             <div className='notes__content'>
                <input
                    type='text'
                    placeholder='Some awesome title'
                    className='notes__title-input'
                    autoComplete='off'
                />
                <textarea placeholder='What happened today?'
                className='notes__textarea'>
                </textarea>
                <div className='notes__image'>
                    <img src='https://i.pinimg.com/originals/bd/6c/0b/bd6c0bef4a473bfca44d1f6c83c95006.png' alt='Imagen default'/>
                </div>
             </div>
        </div>
    )
}
