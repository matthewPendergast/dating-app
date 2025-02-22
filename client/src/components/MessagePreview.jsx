const MessagePreview = ({
    name = "Error",
    image = "/images/default-profile.webp",
    message = "No message available"
}) => {
    return (
        <div className="flex h-[15vh] shadow-[inset_0px_0px_3px_1px] bg-white hover:brightness-90 cursor-pointer">
            <div className="flex justify-center items-center w-[35%]">
                <img className="flex-shrink-0 h-[80%] rounded-[50%] shadow-[0px_0px_5px_1px]" src={image}/>
            </div>
            <div className="flex flex-col justify-center flex-grow w-[65%] overflow-hidden">
                <p className="font-bold truncate">{name}</p>
                <p className="truncate pr-5">{message}</p>
            </div>
        </div>
    );
}

export default MessagePreview;