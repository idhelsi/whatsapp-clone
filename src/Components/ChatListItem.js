import React, { useEffect, useState } from 'react';
import './ChatListItem.css';

export const ChatListItem = ({ onClick, active, data }) => {
    const [time, setTime] = useState('');

    useEffect(() => {
        if (data?.lastMessageDate?.seconds) {
            let d = new Date(data.lastMessageDate.seconds * 1000);
            let hours = d.getHours();
            let minutes = d.getMinutes();
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            setTime(`${hours}:${minutes}`);
        } else {
            setTime('');
        }
    }, [data]);

    return (
        <div className={`chatListItem ${active ? 'active' : ''}`} onClick={onClick}>
            <img src={data?.image || '/default-avatar.png'} alt="Avatar" className="chatListItem--avatar" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">{data?.title || 'Usuário'}</div>
                    <div className="chatListItem--date">{time}</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>{data?.lastMessage || 'Nenhuma mensagem'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
