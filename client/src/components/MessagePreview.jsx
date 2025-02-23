const MessagePreview = ({
    name = "Error",
    image = "/images/default-profile.webp",
    message = "No message available"
}) => {
    return (
        <div className="flex h-[6rem] shadow-[inset_0px_0px_3px_1px] bg-white hover:brightness-90 active:shadow-[inset_0px_0px_8px_1px] cursor-pointer">
            <div className="flex justify-center items-center w-[35%]">
                <img className="flex-shrink-0 h-[80%] rounded-[3rem] shadow-[0px_0px_5px_1px]" src={image} alt="" />
            </div>
            <div className="flex flex-col justify-center flex-grow w-[65%] pl-1 pr-2 overflow-hidden">
                <p className="font-bold truncate">{name}</p>
                <p className="truncate">{message}</p>
            </div>
        </div>
    );
}

export default MessagePreview;