import toast from "react-hot-toast";

const errorToast = (message) => {
    toast.error(message, {
        duration: 3000,
        id: message,
        position: "top-center",
        style: {
            paddingInline: 16,
            paddingBlock: 8,
            fontWeight: 700,
            fontSize: 16,
            borderRadius: 32,
        },
    });
};

export { errorToast };
