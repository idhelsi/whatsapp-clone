import { useState } from 'react';
import './NewChat.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const NewChat = ({user, chatlist, show, setShow}) => {
    const [list, setList] = useState([
        {id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Aluveni Sousa'},
        {id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Aluveni Sousa'},
        {id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Aluveni Sousa'},
        {id: 123, avatar: 'https://www.w3schools.com/howto/img_avatar2.png', name: 'Aluveni Sousa'},
    ])

    const handleClose = () => {
        setShow(false)
    }

    return (
        <div className="newChat" style={{left: show ? 0 : -415}}>
            <div className="newChat--head">
                <div onClick={handleClose} className="newChat--backbutton">
                    <ArrowBackIcon style={{color: '#FFF'}} />
                </div>
                <div className="newChat--headtitle">Nova Conversa</div>
            </div>
            <div className="newChat--list">
                {list.map((item => (
                    <div key={item.id} className="newChat--item">
                        <img className='newChat--itemavatar' src={item.avatar} alt={item.name} />
                        <div className="newChat--itemname">{item.name}</div>
                    </div>
                )))}
            </div>
        </div>
    )
}