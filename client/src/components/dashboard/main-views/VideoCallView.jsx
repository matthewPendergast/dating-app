import { useEffect, useState } from "react";

const VideoCallView = ({
    width="w-full",
    selectedUser,
    setCenterView,
}) => {
    const [isCalling, setIsCalling] = useState(false);
    const [callDuration, setCallDuration] = useState(0);

    useEffect(() => {
        let timer;
        if (isCalling) {
            setCallDuration(0);
            timer = setInterval(() => {
                setCallDuration(prevTime => {
                    if (prevTime >= 10) {
                        clearInterval(timer);
                        setIsCalling(false);
                        return prevTime;
                    }
                    return prevTime + 1;
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer);
    }, [isCalling]);

    return (
        <main className={`${width} relative flex justify-center items-center bg-gray-900`}>
            <button
                className="absolute top-5 right-5 h-10 w-10 rounded-full shadow-[0px_0px_10px_3px_silver] font-semibold bg-white hover:brightness-90"
                onClick={() => setCenterView("matchSidebar")}
            >
                <i className="text-xl fa-solid fa-xmark"></i>
            </button>
            <div className="flex flex-col justify-center items-center">
                <div className="flex justify-center items-center h-28 w-28 rounded-full shadow-[0px_0px_20px_5px_silver] overflow-hidden">
                    <img className="h-full w-full object-cover" src={selectedUser?.profilePic} alt="" />
                </div>
                <p className="text-white">{selectedUser?.name}</p>
                <p className={`${isCalling ? "visible" : "invisible"} text-white text-xs`}>Calling...</p>
                <p className={`${isCalling ? "visible" : "invisible"} text-white text-xs`}>00:{callDuration.toString().padStart(2, "0")}</p>
            </div>
            <button
                className="absolute bottom-10 left-10 h-16 w-16 border rounded-full shadow-[0px_0px_10px_3px_silver] font-semibold bg-green-500 hover:brightness-90"
                onClick={() => setIsCalling(true)}
            >
                <i className="text-2xl fa-solid fa-phone"></i>
            </button>
            <button
                className="absolute bottom-10 right-10 h-16 w-16 border rounded-full shadow-[0px_0px_10px_3px_silver] font-semibold bg-red-500 hover:brightness-90"
                onClick={() => setIsCalling(false)}    
            >
                <i className="text-2xl fa-solid fa-phone-slash"></i>
            </button>
        </main>
    );
};

export default VideoCallView;