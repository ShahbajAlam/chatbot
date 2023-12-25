import { useRef } from "react";
import { motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";
import {
    collection,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";

import { db } from "../config/firebase";
import { errorToast } from "../toasts/errorToast";
import { useChat } from "../context/ChatContext";
import { useAuth } from "../context/AuthContext";

function ClearChatModal({ setShowClearModal }) {
    const modalRef = useRef();
    const { userID } = useAuth();
    const { setMessages } = useChat();
    useClickOutside(modalRef, () => setShowClearModal(false));

    const handleCancel = () => setShowClearModal(false);

    const handleClear = async () => {
        try {
            const q = query(
                collection(db, "history"),
                where("userID", "==", userID)
            );
            const ids = [];
            const snapshot = await getDocs(q);
            snapshot.forEach((s) => {
                ids.push(s.id);
            });
            ids.forEach((id) => {
                deleteDoc(doc(db, "history", id));
            });
        } catch (err) {
            errorToast(err.message);
        } finally {
            setMessages([]);
            setShowClearModal(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-sm z-[1] flex justify-center items-center">
            <motion.div
                ref={modalRef}
                className="bg-gray-100 w-[75%] min-h-[12rem] rounded-2xl flex flex-col justify-around items-center p-8 py-4 md:w-[45%] lg:w-[30%]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <h1 className="text-2xl font-bold text-balance text-center">
                    Do you want to clear the conversations?
                </h1>
                <div className="flex justify-between items-center w-full text-gray-200 mt-8">
                    <button
                        onClick={handleCancel}
                        className="bg-gradient-to-tr from-[#cb2d3e] to-[#ef473a] px-6 py-1 rounded-lg font-bold text-lg md:text-xl md:py-2"
                    >
                        NO
                    </button>
                    <button
                        onClick={handleClear}
                        className="bg-gradient-to-tr from-[#0c7c73] to-[#11833d] px-6 py-1 rounded-lg font-bold text-lg md:text-xl md:py-2"
                    >
                        YES
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default ClearChatModal;
