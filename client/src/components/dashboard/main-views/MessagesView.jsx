import { useEffect, useRef, useState } from "react";
import Header from "../../dashboard/main-views/Header";
import messageStyles from "../../../assets/styles/messageBubbleStyles.js";
import "../../../assets/styles/scrollbar.css";

// Sets up timestamp to show only if messages are an hour apart
const processMessageTimestamps = (messages) => {
    if (!messages || messages.length === 0) return [];
    let lastTimestampBySender = {};

    return (
        messages.map((message) => {
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
                <p className="overflow-hidden">{message.content}</p>
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
    const [messages, setMessages] = useState([]);
    const [inputText, setInputText] = useState("");
    const textareaRef = useRef(null);
    const messagesContainerRef = useRef(null);

    useEffect(() => {
        setMessages(processMessageTimestamps(selectedUser?.messages || []));
    }, [selectedUser]);
    
    // Auto-resizes textarea element based on content
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
        }
    }, [inputText]);

    const handleSendMessage = () => {
        if (inputText.trim() === "") return;
    
        const newMessage = {
            sender: "user",
            type: "text",
            timestamp: new Date().toISOString(),
            content: inputText.trim(),
        };
    
        setMessages((prevMessages) => {
            const updatedMessages = processMessageTimestamps([...prevMessages, newMessage]);
    
            // Scrolls to the bottom when message is sent
            setTimeout(() => {
                if (messagesContainerRef.current) {
                    messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
                }
            }, 0);
    
            return updatedMessages;
        });
    
        setInputText("");
    };

    return (
        <main className={`relative h-full ${width}`}>
            <div className="h-[90%] pt-1 pb-4 bg-gradient-to-b from-[#a44d6d] to-[#fe94bc]
                shadow-[inset_0px_0px_7px_2px] overflow-x-hidden overflow-auto custom-scrollbar"
                ref={messagesContainerRef}
            >
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
                    {messages.map((message, index) => (
                        <Message
                            key={index}
                            message={message}
                            align={message.sender === "user" ? "self-end" : "self-start"}
                            tail={message.sender === "user" ? messageStyles.tailR : messageStyles.tailL}
                            showTimestamp={message.showTimestamp}
                        />
                    ))}
                </div>
            </div>
            <div className={`absolute flex bottom-0 max-h-[30vh] min-h-[10%] w-full
                p-4 shadow-[inset_0px_0px_6px_1px] bg-white overflow-hidden
            `}>
                <textarea
                    ref={textareaRef}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                        }
                    }}
                    className={`max-h-[27vh] w-[95%] mx-auto text-center resize-none outline-none overflow-hidden`}
                    name=""
                    id=""
                    rows={1}
                    placeholder="Type a message here">
                </textarea>
                <button 
                    className="absolute right-2 bottom-2 bg-[#fe94bc] text-white p-2 rounded-full shadow-[inset_-1px_-2px_1px_black]
                        hover:brightness-90 active:shadow-[inset_-1px_-1px_4px_black]"
                    onClick={handleSendMessage}
                >
                    <i className="fa-solid fa-paper-plane text-white"></i>
                </button>
            </div>

        </main>
    );
};

export default MessagesView;