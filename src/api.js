import { initializeApp } from 'firebase/app';
import { getAuth, FacebookAuthProvider, signInWithPopup } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseConfig } from './firebaseConfig';

// Inicializando Firebase
const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

let isPopupOpen = false; // Flag para evitar múltiplas requisições

export const api = {
    fbPopup: async () => {
        if (isPopupOpen) return; // Se já estiver em andamento, não faz nada
        isPopupOpen = true; // Define como verdadeiro para impedir novas requisições

        try {
            const provider = new FacebookAuthProvider();
            let result = await signInWithPopup(auth, provider);
            return result;
        } catch (error) {
            console.error("Erro no login:", error);
            throw error; // Propaga o erro se necessário
        } finally {
            isPopupOpen = false; // Reseta a flag após a tentativa
        }
    }
};
