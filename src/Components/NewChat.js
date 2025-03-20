import { useEffect, useState } from 'react';
import './NewChat.css'

import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { api } from '../api';

export const NewChat = ({user, chatlist, show, setShow}) => {
    const [list, setList] = useState([])

    useEffect(()=> {
        const getList = async () => {
            if(user !== null) {
                let results = await api.getContactList(user.id)
                setList(results)
            }
        } 
        getList()
    }, [user])

    const addNewChat = async (user2) => {
        await api.addNewChat(user, user2)

        handleClose()
    }

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
                    <div key={item.id}  onClick={()=>addNewChat(item)} className="newChat--item">
                        <img className='newChat--itemavatar' src={item.avatar} alt={item.name} />
                        <div className="newChat--itemname">{item.name}</div>
                    </div>
                )))}
            </div>
        </div>
    )
}