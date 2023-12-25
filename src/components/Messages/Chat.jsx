import ChatBody from "./ChatBody";
import ChatInput from "./ChatInput";
import ChatHeader from "./ChatHeader";

function Chat() {
    return (
        <div className="w-full h-[100svh] flex flex-col bg-gradient-to-t from-[#093028] to-[#3c8f7e] md:h-[90vh] lg:h-[100vh]">
            <ChatHeader />
            <ChatBody />
            <ChatInput />
        </div>
    );
}

export default Chat;
