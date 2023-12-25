import { motion } from "framer-motion";
import SignInWithGoogleButton from "./SignInWithGoogleButton";
import SignInWithGithubButton from "./SignInWithGithubButton";

function Login() {
    return (
        <motion.div
            className="w-[85%] px-6 py-4 rounded-2xl bg-[rgba(0,0,0,0.6)] flex flex-col justify-center items-center text-gray-100 md:w-[65%] lg:w-[40%]"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
        >
            <img
                src="chatbot.png"
                alt="chatbot logo"
                className="w-[3rem] h-[3rem]"
            />
            <h1 className="text-5xl font-bold text-transparent bg-gradient-to-l from-[#2980B9] to-[#6DD5FA] bg-clip-text mt-3">
                CHATBOT
            </h1>
            <p className="mb-6">Powered by Gemini</p>
            <div className="my-4 flex flex-col gap-5">
                <SignInWithGoogleButton />
                <SignInWithGithubButton />
            </div>
        </motion.div>
    );
}

export default Login;
