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
        <div className={`flex flex-shrink-0 h-[6rem] shadow-[inset_0px_0px_6px_1px] bg-white hover:brightness-95 active:shadow-[inset_0px_0px_8px_1px] cursor-pointer ${className}`}
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