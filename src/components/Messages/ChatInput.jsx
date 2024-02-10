import { useEffect, useState } from "react";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

import { db } from "../../config/firebase";
import { errorToast } from "../../toasts/errorToast";
import { useAuth } from "../../context/AuthContext";
import { useChat } from "../../context/ChatContext";
import Loading from "../Loading";

const safetySettings = [
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_UNSPECIFIED,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
];

function ChatInput() {
    const { userID } = useAuth();
    const { messages, setMessages } = useChat();
    const [history, setHistory] = useState([]);
    const collectionRef = collection(db, "history");
    const [userInput, setUserInput] = useState("");
    const [isResponseLoading, setIsResponseLoading] = useState(false);

    useEffect(() => {
        const init = async () => {
            const q = query(
                collection(db, "history"),
                where("userID", "==", userID)
            );
            const snapshot = await getDocs(q);
            const historyArray = [];
            snapshot.forEach((s) => {
                historyArray.push(s.data());
            });

            const sortedHistoryArray = historyArray.sort(
                (a, b) => Number(a.createdAt) - Number(b.createdAt)
            );

            setHistory(() =>
                sortedHistoryArray.map((hist) => ({
                    role: hist.data.role,
                    parts: hist.data.parts,
                }))
            );
        };

        init();
    }, [messages.length]);

    const getResponse = async () => {
        setIsResponseLoading(true);
        try {
            const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);
            const model = genAI.getGenerativeModel({
                model: "gemini-pro",
                safetySettings,
            });
            const chat = model.startChat({ history });
            const response = await chat.sendMessage(userInput);
            const data = response.response.text();

            setMessages((msg) => [...msg, { role: "model", parts: data }]);
            await addDoc(collectionRef, {
                userID,
                createdAt: Date.now().toString(),
                data: {
                    role: "model",
                    parts: data,
                },
                text: data,
            });
        } catch (err) {
            setMessages((msg) => [
                ...msg,
                { role: "model", parts: err.message },
            ]);
            await addDoc(collectionRef, {
                userID,
                createdAt: Date.now().toString(),
                data: {
                    role: "model",
                    parts: err.message,
                },
                text: err.message,
            });
        } finally {
            setIsResponseLoading(false);
        }
    };

    const sendMessage = async () => {
        if (userInput.trim().length === 0) return;
        try {
            await addDoc(collectionRef, {
                userID,
                createdAt: Date.now().toString(),
                data: {
                    role: "user",
                    parts: userInput.trim(),
                },
                text: userInput.trim(),
            });
            setMessages((msg) => [
                ...msg,
                { role: "user", parts: userInput.trim() },
            ]);
            getResponse();
        } catch (err) {
            errorToast(err.message);
        } finally {
            setUserInput("");
        }
    };

    return (
        <div className="bg-[rgba(0,0,0,0.2)] flex justify-between items-center px-4 py-2 basis-[8%] relative">
            {isResponseLoading && <Loading />}
            <input
                type="text"
                placeholder="Enter prompt..."
                className="w-full border-none outline-none rounded-xl text-lg p-2 pe-[75px] placeholder:text-gray-600 text-gray-950 font-bold md:text-xl md:p-3 md:pe-[90px] lg:text-lg lg:p-2 lg:pe-[100px]"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") sendMessage();
                }}
                disabled={isResponseLoading}
            />
            <button
                onClick={sendMessage}
                className="absolute right-4 rounded-xl rounded-tl-none rounded-bl-none bg-green-700 text-gray-50 text-lg p-2 md:text-xl md:p-3 lg:p-2"
            >
                SEND
            </button>
        </div>
    );
}

export default ChatInput;
