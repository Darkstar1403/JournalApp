import React from 'react'

export const JournalEntry = () => {
    return (
        <div className='journal__entry'>
            <div className='journal__entry-picture' style={{backgroundSize: 'cover', backgroundImage: 'url(https://im0-tub-ru.yandex.net/i?id=84dbd50839c3d640ebfc0de20994c30d&n=27&h=480&w=480)'}}>
            </div>
            <div className='journal__entry-body'>
                <p className='journal__entry-title'>
                    Buenas noches
                </p>
                <p className='journal__entry-text'>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
            </div>
            <div className='journal__entry-date-box'>
                <span>Monday</span>
                <h4>14</h4>
            </div>
        </div>
    )
}
