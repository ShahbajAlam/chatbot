function Loading() {
    return (
        <div className="fixed inset-0 z-[2] bg-[rgba(0,0,0,0.3)] flex backdrop-blur-sm justify-center items-center">
            <img src="loading.svg" alt="loading spinner" className="w-24 h-24" />
        </div>
    );
}

export default Loading;
