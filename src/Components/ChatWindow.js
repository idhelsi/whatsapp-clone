import { useEffect, useRef, useState } from 'react'
import EmojiPicker from 'emoji-picker-react' // Corrigido nome do componente
import './ChatWindow.css'

import { MessagemItem } from './MessagemItem';

import SearchIcon from '@mui/icons-material/Search';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import CloseIcon from '@mui/icons-material/Close';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';

export const ChatWindow = ({user}) => {

    const body = useRef()

    let recognition = null;
    let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition !== undefined) {
        recognition = new SpeechRecognition();
    }

    const [emojiOpen, setEmojiOpen] = useState(false) // Corrigido nome da variável
    const [emojiPx, setEmojiPx] = useState('0px') // Corrigido nome da variável
    const [text, setText] = useState('')
    const [listening, setListening] = useState(false)
    const [list, setList] = useState([
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'},
        { author: 1234, body: 'bla bla bla'},
        { author: 123, body: 'bla bla'},
        { author: 123, body: 'bla bla bla bla'}
    ])

    // useEffect(() => {
    //     if(body.current.scrollHeight > body.current.offsetHeight) {
    //         body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight
    //     }
    // }, [list])

    // useEffect(() => {
    //     if (body.current) { // Verifica se o elemento existe
    //         if (body.current.scrollHeight > body.current.offsetHeight) {
    //             body.current.scrollTop = body.current.scrollHeight - body.current.offsetHeight;
    //         }
    //     }
    // }, [list]);
    useEffect(() => {
        if (!body.current) return;
        
        const chatBody = body.current;
        chatBody.scrollTop = chatBody.scrollHeight - chatBody.offsetHeight;
        console.log(body)
    }, [list.length]); // Apenas quando um novo item for adicionado
    

    const handleEmojiClick = (e, emojiObject) => {
        setText(text => text + e.emoji)
    }

    const handleEmojiOpen = () => {
        setEmojiOpen(true)
        setEmojiPx('300px')
    }

    const handleCloseEmoji = () => {
        setEmojiOpen(false)
        setEmojiPx('0px')
    }

    const handleMicClick = () => {
        if(recognition !== null) {

            recognition.onstart =  () => {
                setListening(true)
            }
            recognition.onend =  () => {
                setListening(false)
            }
            recognition.onresult = (e) => {
                setText( e.results[0][0].transcript )
            }

            recognition.start()
        }
    }

    const handleSendClick = () => {

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

            <div ref={body} className="chatWindow--body">
                {list.map((item, key) => (
                    <MessagemItem
                        key={key}
                        data={item}
                        user={user}
                    />
                ))}
            </div>

            <div className="chatWindow--emojiarea">
                <EmojiPicker 
                    onEmojiClick={handleEmojiClick}
                    searchDisabled
                    skinTonesDisabled
                    width='auto'
                    height={emojiPx}
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
                        value={text}
                        onChange={e=>setText(e.target.value)}
                    />
                </div>

                <div className="chatwindow-pos">
                    {text === '' &&
                        <div onClick={handleMicClick} className="chatWindow--btn">
                            <MicIcon style={{ color: listening ? '#126ECE' : '#919191' }} />
                        </div>
                    }
                    {text !== '' &&
                        <div onClick={handleSendClick} className="chatWindow--btn">
                            <SendIcon style={{ color: '#919191' }} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
