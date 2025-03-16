import { api } from "../api"
import './Login.css'

export const Login = ({onReceive}) => {
    const handleFacebookLogin = async () => {
        let result = await api.fbPopup()
        if(result) {
            onReceive(result.user)
        } else {
            alert('Erro!')
        }
    }

    return (
        <div className="login">
            <button onClick={handleFacebookLogin} >Logar com Facebook</button>
        </div>
    )
}