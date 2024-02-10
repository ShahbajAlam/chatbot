import { Toaster } from "react-hot-toast";

import { useAuth } from "./context/AuthContext";
import Login from "./components/Login/Login";
import Chat from "./components/Messages/Chat";

function App() {
    const { userID } = useAuth();

    return (
        <div className="w-[100vw] h-[100dvh] flex justify-center items-center bg-gradient-to-t from-[#093028] to-[#3c8f7e] overflow-hidden md:w-[85vw] md:rounded-3xl md:h-[90vh] lg:w-[70vw] lg:h-[100vh]">
            <Toaster />
            {!userID && <Login />}
            {userID && <Chat />}
        </div>
    );
}

export default App;
