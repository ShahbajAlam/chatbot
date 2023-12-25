import { useRef } from "react";
import { signOut } from "firebase/auth";
import { motion } from "framer-motion";
import { useClickOutside } from "@react-hookz/web";

import { auth } from "../config/firebase";
import { errorToast } from "../toasts/errorToast";
import { useAuth } from "../context/AuthContext";

function LogoutModal({ setShowLogoutModal }) {
    const modalRef = useRef();
    const { dispatch } = useAuth();
    useClickOutside(modalRef, () => setShowLogoutModal(false));

    const handleCancel = () => setShowLogoutModal(false);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            dispatch({ type: "removeuser" });
        } catch (err) {
            errorToast(err.message);
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
                    Do you want to log out?
                </h1>
                <div className="flex justify-between items-center w-full text-gray-200 mt-8">
                    <button
                        onClick={handleCancel}
                        className="bg-gradient-to-tr from-[#cb2d3e] to-[#ef473a] px-6 py-1 rounded-lg font-bold text-lg md:text-xl md:py-2"
                    >
                        NO
                    </button>
                    <button
                        onClick={handleLogout}
                        className="bg-gradient-to-tr from-[#0c7c73] to-[#11833d] px-6 py-1 rounded-lg font-bold text-lg md:text-xl md:py-2"
                    >
                        YES
                    </button>
                </div>
            </motion.div>
        </div>
    );
}

export default LogoutModal;
