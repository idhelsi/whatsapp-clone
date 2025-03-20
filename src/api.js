// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { 
//     getAuth, FacebookAuthProvider, signInWithPopup 
// } from "firebase/auth";
// import { 
//     getFirestore, collection, doc, setDoc, getDoc, getDocs, query, addDoc, updateDoc, arrayUnion, onSnapshot  
// } from "firebase/firestore";

// import { firebaseConfig } from "./firebaseConfig";

// // Inicializando Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const auth = getAuth(app);
// const db = getFirestore(app);

// export const api = {
//     fbPopup: async () => {
//         try {
//             const provider = new FacebookAuthProvider();
//             let result = await signInWithPopup(auth, provider);
//             return result;
//         } catch (error) {
//             console.error("Erro no login:", error);
//             throw error;
//         }
//     },

//     addUser: async (u) => {
//         try {
//             await setDoc(doc(db, "users", u.id), {
//                 name: u.name,
//                 avatar: u.avatar
//             }, { merge: true });
//         } catch (error) {
//             console.error("Erro ao adicionar usuário:", error);
//             throw error;
//         }
//     },

//     getContactList: async (userId) => {
//         let list = [];

//         try {
//             const q = query(collection(db, "users"));
//             const results = await getDocs(q);

//             results.forEach((doc) => {
//                 let data = doc.data();
//                 if (doc.id !== userId) {
//                     list.push({
//                         id: doc.id,
//                         name: data.name,
//                         avatar: data.avatar
//                     });
//                 }
//             });
//         } catch (error) {
//             console.error("Erro ao obter lista de contatos:", error);
//             throw error;
//         }

//         return list;
//     },

//     addNewChat: async (user, user2) => {
//         try {
//             let newChatRef = await addDoc(collection(db, "chats"), {
//                 messages: [],
//                 users: [user.id, user2.id]
//             });

//             await updateDoc(doc(db, "users", user.id), {
//                 chats: arrayUnion({
//                     chatId: newChatRef.id,
//                     title: user2.name,
//                     image: user2.avatar,
//                     with: user2.id
//                 })
//             });

//             await updateDoc(doc(db, "users", user2.id), {
//                 chats: arrayUnion({
//                     chatId: newChatRef.id,
//                     title: user.name,
//                     image: user.avatar,
//                     with: user.id
//                 })
//             });

//         } catch (error) {
//             console.error("Erro ao adicionar novo chat:", error);
//             throw error;
//         }
//     },

//     onChatList: (userId, setChatList) => {
//         if (!userId) {
//             console.error("onChatList: userId inválido.");
//             return;
//         }

//         return onSnapshot(doc(db, "users", userId), (docSnap) => {
//             if (docSnap.exists()) {
//                 const data = docSnap.data();
//                 setChatList(Array.isArray(data.chats) ? data.chats : []);
//             } else {
//                 console.warn(`onChatList: Usuário ${userId} não encontrado.`);
//                 setChatList([]);
//             }
//         }, (error) => {
//             console.error("Erro ao obter lista de chats:", error);
//         });
//     },

//     onChatContent: (chatId, setList, setUsers) => {
//         if (!chatId) {
//             console.error("onChatContent: chatId inválido.");
//             return;
//         }

//         return onSnapshot(doc(db, "chats", chatId), (docSnap) => {
//             if (docSnap.exists()) {
//                 let data = docSnap.data();
//                 setList(data.messages || []);
//                 setUsers(data.users || []);
//             } else {
//                 console.warn(`onChatContent: Chat ${chatId} não encontrado.`);
//                 setList([]);
//             }
//         }, (error) => {
//             console.error("Erro ao obter mensagens do chat:", error);
//         }); 
//     },

//     sendMessage: async (chatdata, userId, type, body, users) => {
//         if (!chatdata.chatId) {
//             console.error("sendMessage: chatId inválido.");
//             return;
//         }

//         let now = new Date();

//         try {
//             await updateDoc(doc(db, "chats", chatdata.chatId), {
//                 messages: arrayUnion({
//                     type,
//                     author: userId,
//                     body,
//                     date: now
//                 })
//             });

//             for (let i in users) {
//                 let userRef = doc(db, "users", users[i]);
//                 let userSnap = await getDoc(userRef);

//                 if (userSnap.exists()) {
//                     let userData = userSnap.data();

//                     if (userData.chats) {
//                         let chats = [...userData.chats];

//                         for (let e in chats) {
//                             if (chats[e].chatId === chatdata.chatId) {
//                                 chats[e].lastMessage = body;
//                                 chats[e].lastMessageDate = now;
//                             }
//                         }

//                         await updateDoc(userRef, {
//                             chats
//                         });
//                     }
//                 }
//             }
//         } catch (error) {
//             console.error("Erro ao enviar mensagem:", error);
//         }
//     }
// };



import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
    getAuth, FacebookAuthProvider, signInWithPopup 
} from "firebase/auth";
import { 
    getFirestore, collection, doc, setDoc, getDoc, getDocs, query, addDoc, updateDoc, arrayUnion, onSnapshot  
} from "firebase/firestore";

import { firebaseConfig } from "./firebaseConfig";

// Inicializando Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export const api = {
    fbPopup: async () => {
        try {
            const provider = new FacebookAuthProvider();
            provider.addScope('email');  // Adicionando o escopo de email

            let result = await signInWithPopup(auth, provider);
            return result;
        } catch (error) {
            console.error("Erro no login:", error);
            throw error;
        }
    },

    addUser: async (u) => {
        try {
            await setDoc(doc(db, "users", u.id), {
                name: u.name,
                avatar: u.avatar
            }, { merge: true });
        } catch (error) {
            console.error("Erro ao adicionar usuário:", error);
            throw error;
        }
    },

    getContactList: async (userId) => {
        let list = [];

        try {
            const q = query(collection(db, "users"));
            const results = await getDocs(q);

            results.forEach((doc) => {
                let data = doc.data();
                if (doc.id !== userId) {
                    list.push({
                        id: doc.id,
                        name: data.name,
                        avatar: data.avatar
                    });
                }
            });
        } catch (error) {
            console.error("Erro ao obter lista de contatos:", error);
            throw error;
        }

        return list;
    },

    addNewChat: async (user, user2) => {
        try {
            let newChatRef = await addDoc(collection(db, "chats"), {
                messages: [],
                users: [user.id, user2.id]
            });

            await updateDoc(doc(db, "users", user.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    title: user2.name,
                    image: user2.avatar,
                    with: user2.id
                })
            });

            await updateDoc(doc(db, "users", user2.id), {
                chats: arrayUnion({
                    chatId: newChatRef.id,
                    title: user.name,
                    image: user.avatar,
                    with: user.id
                })
            });

        } catch (error) {
            console.error("Erro ao adicionar novo chat:", error);
            throw error;
        }
    },

    onChatList: (userId, setChatList) => {
        return onSnapshot(doc(db, "users", userId), (docSnap) => {
            if (docSnap.exists()) {
                const data = docSnap.data();
                if (data.chats) {
                    let chats = [...data.chats];

                    chats.sort((a, b) => {
                        if (a.lastMessageDate === undefined) {
                            return -1;
                        }
                        if (a.lastMessageDate.seconds < b.lastMessageDate.seconds) {
                            return 1;
                        } else {
                            return -1;
                        }
                    })

                    setChatList(Array.isArray(data.chats) ? data.chats : []);
                }
                
            } else {
                console.warn(`onChatList: Usuário ${userId} não encontrado.`);
                setChatList([]);
            }
        }, (error) => {
            console.error("Erro ao obter lista de chats:", error);
        });
    },

    onChatContent: (chatId, setList, setUsers) => {
        if (!chatId) {
            console.error("onChatContent: chatId inválido.");
            return;
        }

        return onSnapshot(doc(db, "chats", chatId), (docSnap) => {
            if (docSnap.exists()) {
                let data = docSnap.data();
                setList(data.messages || []);
                setUsers(data.users || []);
            } else {
                console.warn(`onChatContent: Chat ${chatId} não encontrado.`);
                setList([]);
            }
        }, (error) => {
            console.error("Erro ao obter mensagens do chat:", error);
        }); 
    },

    sendMessage: async (chatdata, userId, type, body, users) => {
        if (!chatdata.chatId) {
            console.error("sendMessage: chatId inválido.");
            return;
        }

        let now = new Date();

        try {
            await updateDoc(doc(db, "chats", chatdata.chatId), {
                messages: arrayUnion({
                    type,
                    author: userId,
                    body,
                    date: now
                })
            });

            for (let i in users) {
                let userRef = doc(db, "users", users[i]);
                let userSnap = await getDoc(userRef);

                if (userSnap.exists()) {
                    let userData = userSnap.data();

                    if (userData.chats) {
                        let chats = [...userData.chats];

                        for (let e in chats) {
                            if (chats[e].chatId === chatdata.chatId) {
                                chats[e].lastMessage = body;
                                chats[e].lastMessageDate = now;
                            }
                        }

                        await updateDoc(userRef, {
                            chats
                        });
                    }
                }
            }
        } catch (error) {
            console.error("Erro ao enviar mensagem:", error);
        }
    }
};
