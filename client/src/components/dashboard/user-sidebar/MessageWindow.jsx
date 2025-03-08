import { useEffect, useState } from "react";
import "../../../assets/styles/scrollbar.css";

const styles = {
    messageWindow: `flex-1 w-full overflow-x-hidden overflow-y-auto
        bg-gray-200 shadow-[inset_0px_0px_5px] custom-scrollbar-sidebar`,
    messagePreview: `flex items-center h-24 gap-3 px-3
        border-gray-400 border-[1px] shadow-[inset_-1px_-1px_7px_1px]
        hover:bg-gray-200 active:shadow-[inset_-1px_-1px_9px_1px] cursor-pointer`,
}

const MessagePreview = ({ name, image, message, background, onClick = () => {} }) => {
    return (
        <div className={`${styles.messagePreview} ${background}`} onClick={onClick}>
            <div className="flex justify-center items-center flex-shrink-0 h-20 w-20 rounded-full shadow-[0px_0px_5px_2px] overflow-hidden">
                <img className="h-full w-full object-cover" src={image || "/images/default-profile.webp"} alt="" />
            </div>
            <div className="flex flex-col justify-center items-start flex-grow min-w-10 pr-3">
                <p className="font-bold w-full truncate">{name}</p>
                <p className="w-full truncate">{message}</p>
            </div>
        </div>
    );
};

const MessageWindow = ({ userConnections, activeTab, setSelectedUser, setCenterView }) => {
    const connections = (activeTab === "matches" ? userConnections.matches : userConnections.likes);
    const [activeMessage, setActiveMessage] = useState(null);

    useEffect(() => {
        if (connections.length > 0) {
            setActiveMessage(connections[0].id);
            setSelectedUser(connections[0]);
        }
    }, [connections]);

    return (
        <div className={`${styles.messageWindow}`}>
            {connections.length === 0 ? (
                <p className="text-center p-10">{`No ${activeTab} yet!`}</p>
            ) : (
                connections.map(user => (
                    <MessagePreview
                        key={user.id}
                        name={user.name ?? "Error"}
                        image={user.profilePic ?? "/images/default-profile.webp"}
                        message={user.messages[user.messages.length - 1].content ?? "No message available"}
                        background={activeMessage === user.id ? "bg-gray-200" : "bg-white"}
                        onClick={() => {
                            setSelectedUser(
                                userConnections.likes.find(u => u.id === user.id) ||
                                userConnections.matches.find(u => u.id === user.id)
                            );
                            setActiveMessage(user.id);
                            setCenterView("messages");
                        }}
                    />
                ))
            )}
        </div>
    );
};

export default MessageWindow;