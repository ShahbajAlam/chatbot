import { collection, getDocs, query, where } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";

import { db } from "../config/firebase";
import { useAuth } from "./AuthContext";

const ChatContext = createContext(null);

const ChatProvider = ({ children }) => {
    const { userID } = useAuth();
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const init = async () => {
            const q = query(
                collection(db, "history"),
                where("userID", "==", userID)
            );
            const snapshot = await getDocs(q);
            const messageArray = [];
            snapshot.forEach((s) => {
                messageArray.push(s.data());
            });
            const sortedMessageArray = messageArray.sort(
                (a, b) => Number(a.createdAt) - Number(b.createdAt)
            );
            setMessages(() => sortedMessageArray.map((msg) => msg?.data));
        };

        init();
    }, []);

    return (
        <ChatContext.Provider value={{ messages, setMessages }}>
            {children}
        </ChatContext.Provider>
    );
};

const useChat = () => useContext(ChatContext);

export { ChatProvider, useChat };
