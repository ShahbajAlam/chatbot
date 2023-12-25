import { useContext } from "react";
import { useReducer } from "react";
import { createContext } from "react";

const AuthContext = createContext(null);

const initialState = {
    username: JSON.parse(localStorage.getItem("auth"))?.username || "",
    photo: JSON.parse(localStorage.getItem("auth"))?.photo || "",
    userID: JSON.parse(localStorage.getItem("auth"))?.userID || "",
};

const reducer = (state, action) => {
    switch (action.type) {
        case "adduser":
            localStorage.setItem(
                "auth",
                JSON.stringify({
                    username: action.payload.username,
                    photo: action.payload.photo,
                    userID: action.payload.userID,
                })
            );
            return {
                ...state,
                username: action.payload.username,
                photo: action.payload.photo,
                userID: action.payload.userID,
            };
        case "removeuser":
            localStorage.removeItem("auth");
            return {
                username: "",
                photo: "",
                userID: "",
            };
        default:
            return state;
    }
};

const AuthProvider = ({ children }) => {
    const [{ username, photo, userID }, dispatch] = useReducer(
        reducer,
        initialState
    );

    return (
        <AuthContext.Provider value={{ username, photo, userID, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };
