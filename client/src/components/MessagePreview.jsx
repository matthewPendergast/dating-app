import { useState } from "react";

const MessagePreview = ({
    name = "Error",
    image = "/images/default-profile.webp",
    message = "No message available",
    onClick = () => {},
    className = ""
}) => {
    const [loaded, setLoaded] = useState(false);

    return (
        <div className={`flex flex-shrink-0 h-[6rem] border-gray-400 border-[1px] shadow-[inset_-1px_-1px_7px_1px] bg-white hover:bg-gray-200 active:shadow-[inset_-1px_-1px_9px_1px] cursor-pointer ${className}`}
            onClick={onClick}>
            <div className="w-[35%] h-full flex justify-center items-center rounded-full overflow-hidden">
                <img
                    className="w-[75%] h-[75%] rounded-full object-cover shadow-[0px_0px_5px_2px]"
                    src={image}
                    alt=""
                    onLoad={() => setLoaded(true)}
                />
            </div>
            <div className="flex flex-col justify-center flex-grow w-[65%] pl-1 pr-2 overflow-hidden">
                <p className="font-bold truncate">{name}</p>
                <p className="truncate">{message}</p>
            </div>
        </div>
    );
}

export default MessagePreview;