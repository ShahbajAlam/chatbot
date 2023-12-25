import { useAuth } from "../../context/AuthContext";

function UserMessage({ msg }) {
    const { photo } = useAuth();

    return (
        <div className="flex gap-2 mb-3">
            <img
                src={photo}
                alt="user display picture"
                className="w-[1.5rem] aspect-square rounded-full self-start basis-[10%] md:basis-[8%] lg:basis-[5%]"
            />
            <p className="basis-[85%] text-wrap bg-[rgba(255,255,255,0.5)] text-black font-bold flex items-center p-2 rounded-lg md:basis-[88%] md:text-xl lg:text-base lg:basis-[90%]">
                {msg}
            </p>
        </div>
    );
}

export default UserMessage;
