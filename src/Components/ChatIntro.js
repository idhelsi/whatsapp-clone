import React from 'react'
import './ChatIntro.css'
import wppintro from './../img/wppintro.jpg'

export const ChatIntro = () => {
    return (
        <div className="chatIntro">
            <img src={wppintro} alt="" />
            <h1>Mantenha seu celular conectado</h1>
            <h2>O WhatsApp conectado ao seu telefone para sincronizar suas mensagens. Para reduzir o uso de dados, conecte seu telefone a uma rede Wi-Fi.</h2>
        </div>
    )
}