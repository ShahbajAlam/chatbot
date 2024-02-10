import { Fragment } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../config/firebase";
import { errorToast } from "../../toasts/errorToast";
import { useAuth } from "../../context/AuthContext";

function SignInWithGoogleButton() {
    const { dispatch } = useAuth();

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const response = await signInWithPopup(auth, provider);
            dispatch({
                type: "adduser",
                payload: {
                    username: response.user.displayName,
                    photo: response.user.photoURL,
                    userID: response.user.uid,
                },
            });
        } catch (err) {
            errorToast(err.message);
        }
    };

    return (
        <button
            className="flex justify-center items-center w-full gap-2 bg-gradient-to-tr from-[#11998e] to-[#38ef7d] px-4 py-2 rounded-xl"
            onClick={handleLogin}
        >
            <Fragment>
                <img
                    src="google.webp"
                    className="w-[1.3rem] aspect-square"
                    alt="Google logo"
                />
                <p className="text-[1.1rem] font-bold text-gray-950 md:text-[1.3rem]">
                    Sign in with Google
                </p>
            </Fragment>
        </button>
    );
}

export default SignInWithGoogleButton;
