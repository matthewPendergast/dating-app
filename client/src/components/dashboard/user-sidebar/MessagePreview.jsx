const MessagePreview = ({ name, image, message}) => {
    return (
        <div className="flex items-center h-28 gap-3 px-2 bg-white border">
            <div className="flex justify-center items-center flex-shrink-0 h-[80%] w-24 rounded-full shadow-[0px_0px_5px_2px] overflow-hidden">
                <img className="h-full w-full object-cover" src={image || "/images/default-profile.webp"} alt="" />
            </div>
            <div className="flex flex-col justify-center items-start flex-grow min-w-10">
                <p className="font-bold w-full truncate">{name}</p>
                <p className="w-full truncate">{message}</p>
            </div>
        </div>
    );
};

export default MessagePreview;