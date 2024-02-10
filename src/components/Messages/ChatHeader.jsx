import { useState } from "react";

import LogoutModal from "../LogoutModal";
import ClearChatModal from "../ClearChatModal";

function ChatHeader() {
    const [showClearModal, setShowClearModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleClearModal = () => setShowClearModal(true);
    const handleLogoutModal = () => setShowLogoutModal(true);

    return (
        <div className="bg-[rgba(0,0,0,0.3)] flex justify-between items-center px-4 py-2 basis-[8%]">
            {showLogoutModal && (
                <LogoutModal setShowLogoutModal={setShowLogoutModal} />
            )}
            {showClearModal && (
                <ClearChatModal setShowClearModal={setShowClearModal} />
            )}
            <img
                role="button"
                src="bin.webp"
                onClick={handleClearModal}
                alt="delete conversation button"
                className="w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem]"
            />
            <img
                role="button"
                onClick={handleLogoutModal}
                src="log-out.webp"
                alt="logout button"
                className="w-[2.5rem] h-[2.5rem] md:w-[3rem] md:h-[3rem]"
            />
        </div>
    );
}

export default ChatHeader;
