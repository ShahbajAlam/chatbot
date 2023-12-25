import { motion } from "framer-motion";
import ScrollToBottom from "react-scroll-to-bottom";

import BotMessage from "./BotMessage";
import UserMessage from "./UserMessage";
import { useChat } from "../../context/ChatContext";

function ChatBody() {
    const { messages } = useChat();

    if (messages.length === 0) {
        return (
            <motion.div
                className="basis-[84%] p-2 text-lg flex flex-col justify-center items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
            >
                <img
                    src="chat-bot.gif"
                    alt="chatbot logo"
                    width={100}
                    height={100}
                    className="rounded-xl"
                />
                <p className="text-gray-100 text-2xl font-bold mt-6">
                    How can I help you today?
                </p>
            </motion.div>
        );
    }

    return (
        <ScrollToBottom
            mode="bottom"
            className="basis-[84%] overflow-scroll p-2 text-base"
        >
            {messages.map((msg, i) => {
                if (msg.role === "user")
                    return <UserMessage key={i} msg={msg.parts} />;
                if (msg.role === "model")
                    return <BotMessage key={i} msg={msg.parts} />;
            })}
        </ScrollToBottom>
    );
}

export default ChatBody;
