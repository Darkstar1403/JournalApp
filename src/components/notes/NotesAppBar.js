import moment from 'moment';
import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { startSaveNote, startUploading } from '../../actions/notes'

export const NotesAppBar = () => {

    const noteDate = moment(new Date().getTime());

    const dispatch = useDispatch();

    const {active} = useSelector(state => state.notes);

    const handleSave = () =>{
        dispatch(startSaveNote(active))
    }

    const handlePictureUploud = () =>{
        document.querySelector('#fileSelector').click();
    }

    const handleFileChange = (e) =>{
        const file = e.target.files[0];
        if (file){
            dispatch(startUploading(file))
        }
    }

    return (
        <div className='notes__appbar'>
            <span>{noteDate.format('MMMM Do YYYY')}</span>
            <input name='file' id='fileSelector' type='file' style={{display: 'none'}} onChange={handleFileChange}/>
            <div>
                <button className='btn' onClick={handlePictureUploud}>
                <i class="fas fa-camera fa-lg"></i>
                </button>
                <button className='btn' onClick={handleSave}>
                    Save
                </button>
            </div>
        </div>
    )
}
