import { errorToast } from "../../toasts/errorToast";
import { copiedToast } from "../../toasts/copiedToast";

function BotMessage({ msg }) {
    const copyResponse = () => {
        navigator.clipboard.writeText(msg).then(
            () => copiedToast("Response is copied to clipboard"),
            () => errorToast("Could not copy the response")
        );
    };

    return (
        <div className="flex gap-2 mb-3">
            <img
                src="chatbot.png"
                alt="user display picture"
                className="w-[1.5rem] aspect-square self-start basis-[10%] md:basis-[8%] lg:basis-[5%]"
            />
            <pre className="relative basis-[85%] text-wrap font-['montserrat'] bg-[rgba(0,0,0,0.6)] text-gray-50 flex items-center p-2 pb-8 rounded-lg md:basis-[88%] md:text-xl lg:text-base lg:basis-[90%] lg:pb-12">
                {msg}
                <img
                    src="layer.png"
                    alt="copy button"
                    role="button"
                    onClick={copyResponse}
                    className="absolute right-2 bottom-2 w-6 h-6 md:w-8 md:h-8"
                />
            </pre>
        </div>
    );
}

export default BotMessage;
