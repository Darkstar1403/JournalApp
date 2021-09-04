import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, body, title, date, url}) => {

    const urlDefault = 'https://im0-tub-ru.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d&n=27&h=480&w=480'
    const noteDate = moment(date);
    const dispatch = useDispatch();

    const handleEntryClick = () =>{
        (url)?dispatch(activeNote(id, {date, title, body, url})):dispatch(activeNote(id, {date, title, body, urlDefault}));
    }

    return (
        <div className='journal__entry animate__animated animate__fadeInDown animate__faster' onClick={handleEntryClick}>
            <div className='journal__entry-picture' style={{backgroundSize: 'cover', backgroundImage: ((url)?`url(${url})`:`url(${urlDefault})`)}}>
            </div>
            <div className='journal__entry-body'>
                <p className='journal__entry-title overflow-ellipsis'>
                    {title}
                </p>
            </div>
            <div className='journal__entry-date-box'>
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('Do')}</h4>
            </div>
        </div>
    )
}
