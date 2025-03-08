import Header from "../../dashboard/main-views/Header";
import messageStyles from "../../../assets/styles/messageBubbleStyles.js";
import "../../../assets/styles/scrollbar.css";

// Sets up timestamp to show only if messages are an hour apart
const processMessageTimestamps = (messages) => {
    if (!messages || messages.length === 0) return [];
    let lastTimestampBySender = {};

    return (
        messages.map((message, index, messagesArray) => {
            const prevTimestamp = lastTimestampBySender[message.sender] || null;
            const currTimestamp = new Date(message.timestamp);
            const showTimestamp = !prevTimestamp || (currTimestamp - prevTimestamp) / (1000 * 60 * 60) >= 1;
            lastTimestampBySender[message.sender] = currTimestamp;
            return { ...message, showTimestamp };
        })
    );
};

const Message = ({ message, align, tail, showTimestamp}) => {
    const formatTimestamp = (isoString) => {
        const date = new Date(isoString);
        return date.toLocaleString("en-us", {
            weekday: "long",
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        });
    };

    return (
        <>
        {showTimestamp && (
            <p className={`${align} text-sm text-white px-2 mt-2`}>
                {formatTimestamp(message.timestamp)}
                </p>
        )}
        {message.type === "text" ? (
            <div className={`${messageStyles.bubble} ${messageStyles.textBubble} ${messageStyles.after} ${tail} ${align}`}>
                <p>{message.content}</p>
            </div>
        ) : (
            <div className={`${messageStyles.bubble} ${messageStyles.imgBubble} ${messageStyles.after} ${tail} ${align}`}>
                <img className={`${messageStyles.messageImage}`} src={message.content} alt="" />
            </div>
        )}
        </>
    );
};

const MessagesView = ({
    width="w-full",
    selectedUser,
    setCenterView,
}) => {
    const messages = processMessageTimestamps(selectedUser?.messages || []);

    return (
        <main className={`h-full ${width} py-2 bg-gradient-to-b from-[#a44d6d] to-[#fe94bc] shadow-[inset_0px_0px_7px_2px] overflow-x-hidden overflow-y-auto custom-scrollbar`}>
            <Header />
            <div className="flex flex-col justify-center items-center mt-2">
                <div
                    className="h-10 lg:16 w-10 lg:16 rounded-full shadow-[0px_0px_5px_2px] overflow-hidden"
                    onClick={() => setCenterView("profile")}        
                >
                    <img className="h-full w-full object-cover" src={selectedUser?.profilePic || "/images/default-profile.webp"} alt="" />
                </div>
                <p className="font-semibold w-full text-center text-white">{selectedUser?.name || "Error"}</p>
            </div>
            <div className="flex flex-col items-center w-[90%] mx-auto">
                {messages.map(message => (
                    <Message
                        message={message}
                        align={message.sender === "user" ? "self-end" : "self-start"}
                        tail={message.sender === "user" ? messageStyles.tailR : messageStyles.tailL}
                        showTimestamp={message.showTimestamp}
                    />
                ))}
                <div className={`${messageStyles.bubble} ${messageStyles.textBubble} ${messageStyles.after} ${messageStyles.tailR} self-end mb-5`}>
                    <input className=" w-full text-center outline-none" type="text" placeholder="Enter response" />
                </div>
            </div>
        </main>
    );
};

export default MessagesView;