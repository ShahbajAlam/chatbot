import { Fragment } from "react";
import { GithubAuthProvider, signInWithPopup } from "firebase/auth";

import { auth } from "../../config/firebase";
import { errorToast } from "../../toasts/errorToast";
import { useAuth } from "../../context/AuthContext";

function SignInWithGithubButton() {
    const { dispatch } = useAuth();

    const handleLogin = async () => {
        const provider = new GithubAuthProvider();
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
                    src="github.png"
                    className="w-[1.3rem] aspect-square"
                    alt="Google logo"
                />
                <p className="text-[1.1rem] font-bold text-gray-950 md:text-[1.3rem]">
                    Sign in with GitHub
                </p>
            </Fragment>
        </button>
    );
}

export default SignInWithGithubButton;
