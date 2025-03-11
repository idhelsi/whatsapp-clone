import { useState } from 'react'
import EmojiPicker from 'emoji-picker-react' // Corrigido nome do componente
import './ChatWindow.css'

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

export const ChatWindow = () => {
    const [emojiOpen, setEmojiOpen] = useState(false) // Corrigido nome da variável
    const [altura, setAltura] = useState('0px') // Corrigido nome da variável

    const handleEmojiClick = () => {}

    const handleEmojiOpen = () => {
        setEmojiOpen(true)
        setAltura('300px')
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false)
        setAltura('0px')
    }

    return (
        <div className="chatWindow">
            <div className="chatWindow--header">
                <div className="chatWindow--headerinfo">
                    <img className="chatWindow--avatar" src="https://www.w3schools.com/howto/img_avatar2.png" alt="" />
                    <div className="chatWindow--name">DD tank</div>
                </div>

                <div className="chatWindow--headerbuttons">
                    <div className="chatWindow--btn">
                        <SearchIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow--btn">
                        <AttachFileIcon style={{ color: '#919191' }} />
                    </div>
                    <div className="chatWindow--btn">
                        <MoreVertIcon style={{ color: '#919191' }} />
                    </div>
                </div>
            </div>

            <div className="chatWindow--body"></div>

            <div className="chatWindow--emojiarea">
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                    searchDisabled
                    skinTonesDisabled
                    width='auto'
                    height={altura}
                    previewConfig={{ showPreview: false }}
                />
            </div>

            <div className="chatWindow--footer">
                <div className="chatWindow--pre">
                    <div 
                        className="chatWindow--btn" 
                        onClick={handleCloseEmoji}
                        style={{width: emojiOpen?40:0}}
                    >
                        <CloseIcon style={{ color: '#919191' }} />
                    </div>
                    <div 
                        className="chatWindow--btn" 
                        onClick={handleEmojiOpen}
                    >
                        <InsertEmoticonIcon style={{ color: emojiOpen?'#009688':'#919191' }} />
                    </div>
                </div>

                <div className="chatWindow--inputarea">
                    <input 
                        type="text" 
                        className="chatWindow--input" 
                        placeholder='Digite uma mensagem'
                    />
                </div>

                <div className="chatwindow-pos">
                    <div className="chatWindow--btn">
                        <SendIcon style={{ color: '#919191' }} />
                    </div>
                </div>
            </div>
        </div>
    )
}
