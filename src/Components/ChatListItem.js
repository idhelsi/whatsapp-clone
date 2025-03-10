import React from 'react'
import './ChatListItem.css'

export const ChatListItem = () => {
    return (
        <div className="chatListItem">
            <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" className="chatListItem--avatar" />
            <div className="chatListItem--lines">
                <div className="chatListItem--line">
                    <div className="chatListItem--name">DD Tank</div>
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