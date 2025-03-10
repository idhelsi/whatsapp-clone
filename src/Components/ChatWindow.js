import React from 'react'
import './ChatWindow.css'

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export const ChatWindow = () => {
    return (
        <div className="chatWindow">
            <div className="chatWindow--header">

                <div className="chatWindow--headerinfo">
                    <img src="https://www.w3schools.com/howto/img_avatar2.png" alt="" className="chatWindow--avatar" />
                    <div className="chatWindow--name">DD tank</div>
                </div>

                <div className="chatWindow--headerbuttons">
                    <div className="chatWindow--btn">
                        <SearchIcon style={{color: '#919191'}} />
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{color: '#919191'}} />
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon style={{color: '#919191'}} />
                    </div>
                </div>

            </div>
            <div className="chatWindow--body">
                
            </div>
            <div className="chatWindow--footer">

            </div>
        </div>
    )
}