import { useState } from 'react'
import './App.css'

import { ChatListItem } from './Components/ChatListItem';
import { ChatIntro } from './Components/ChatIntro';
import { ChatWindow } from './Components/ChatWindow';
import { NewChat } from './Components/NewChat';
import { Login } from './Components/Login';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';


export const App = () => {

  const [chatlist, setChatList] = useState([
    {chatId: 1, title: 'Fulao de Tal', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 2, title: 'Falcao Bueno', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 3, title: 'Dila Telo', image: 'https://www.w3schools.com/howto/img_avatar2.png'},
    {chatId: 4, title: 'Elbafo Matriarco', image: 'https://www.w3schools.com/howto/img_avatar2.png'}
  ])

  const [activeChat, setActiveChat] = useState({})
  const [user, setUser] = useState(null)

  const [showNewChat, setShowNewChat] = useState(false)

  const handleNewChat = () => {
    setShowNewChat(true)
  }

  const handleLoginData = async (u) => {
    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    }
    setUser(newUser);
  }

  if (user === null) {
    return (<Login onReceive={handleLoginData} />)
  } 

  return (
    <div className="app-window">
      <div className="sidebar">
        <NewChat 
          chatlist={chatlist}
          user={user}
          show={showNewChat}
          setShow={setShowNewChat}
        />
        <header>
          <img className='header--avatar' src={user.Avatar} alt="" />
          <div className="header--buttons">
            <div className="header--btn">
              <DonutLargeIcon style={{color: '#919191'}} />
            </div>
            <div onClick={handleNewChat} className="header--btn">
              <ChatIcon style={{color: '#919191'}} />
            </div>
            <div className="header--btn">
              <MoreVertIcon style={{color: '#919191'}} />
            </div>
          </div>
        </header>

        <div className="search">
          <div className="search--input">
            <SearchIcon fontSize='small' style={{color: '#919191'}} />
            <input type="search" placeholder='Procurar ou começar uma nova conversa' />
          </div>
        </div>

        <div className="chatlist">
          {chatlist.map((item, key) => (
              <ChatListItem 
                key={key}
                data={item}
                active={activeChat.chatId === chatlist[key].chatId}
                onClick={()=>setActiveChat(chatlist[key])}
              />
          ))}
        </div>

      </div>
      <div className="contentarea">
        {activeChat.chatId !== undefined &&
          <ChatWindow 
            user={user}
          />
        }
        {activeChat.chatId === undefined &&
          <ChatIntro />
        }
      </div>
    </div>
  )
}

export default App