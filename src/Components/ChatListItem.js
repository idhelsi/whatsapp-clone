import React from 'react'
import './ChatListItem.css'

export const ChatListItem = ({onClick, active, data}) => {
    return (
        <div 
            className={`chatListItem ${active?'active': ''}`}
            onClick={onClick}
        >
            <img src={data.image} alt="" className="chatListItem--avatar" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">{data.title}</div>
                    <div className="chatListItem--date">99:99</div>
                </div>
                <div className="chatListItem--line">
                    <div className="chatListItem--lastMsg">
                        <p>Opa, tudo bem?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}