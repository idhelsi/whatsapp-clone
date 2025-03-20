import { api } from "../api"
import './Login.css'

export const Login = ({onReceive}) => {
    // const handleFacebookLogin = async () => {
    //     let result = await api.fbPopup()
    //     if(result) {
    //         onReceive(result.user)
    //     } else {
    //         alert('Erro!')
    //     }
    // }
    const handleFacebookLogin = async () => {
        try {
            let result = await api.fbPopup();
            if (result && result.user) {
                onReceive(result.user);
            } else {
                alert('Erro no login!');
            }
        } catch (error) {
            console.error("Erro no login com Facebook:", error);
            alert("Erro ao tentar logar com o Facebook.");
        }
    };

    return (
        <div className="login">
            <button onClick={handleFacebookLogin} >Logar com Facebook</button>
        </div>
    )
}