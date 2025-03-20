import { useEffect, useState } from 'react';
import './App.css';

import { ChatListItem } from './Components/ChatListItem';
import { ChatIntro } from './Components/ChatIntro';
import { ChatWindow } from './Components/ChatWindow';
import { NewChat } from './Components/NewChat';
import { Login } from './Components/Login';

import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import { api } from './api';

export const App = () => {
  const [chatlist, setChatList] = useState([]);
  const [activeChat, setActiveChat] = useState({});
  const [user, setUser] = useState(null);
  const [showNewChat, setShowNewChat] = useState(false);

  useEffect(() => {
    if (user?.id) {
      const unsub = api.onChatList(user.id, setChatList);
      return () => {
        if (typeof unsub === "function") unsub();
      };
    }
  }, [user]);

  // const handleNewChat = () => {
  //   setShowNewChat(true);
  // };
  const handleNewChat = (newChatUser) => {
    // Verifica se já existe um chat com esse usuário
    const chatExists = chatlist.some(chat => chat.chatId === newChatUser.id);
  
    if (!chatExists) {
      setShowNewChat(true);
    } else {
      // Se o chat já existir, ativa o chat existente
      setActiveChat(chatlist.find(chat => chat.chatId === newChatUser.id));
    }
  };
  

  const handleLoginData = async (u) => {
    if (!u) return;

    let newUser = {
      id: u.uid,
      name: u.displayName,
      avatar: u.photoURL
    };

    try {
      await api.addUser(newUser);
      setUser(newUser);
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
  };

  if (user === null) {
    return <Login onReceive={handleLoginData} />;
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
          <img className='header--avatar' src={user.avatar} alt="" />
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
              active={activeChat.chatId === item.chatId}
              onClick={() => setActiveChat(item)}
            />
          ))}
        </div>
      </div>

      <div className="contentarea">
        {activeChat.chatId ? (
          <ChatWindow user={user} data={activeChat} />
        ) : (
          <ChatIntro />
        )}
      </div>
    </div>
  );
};

export default App;
