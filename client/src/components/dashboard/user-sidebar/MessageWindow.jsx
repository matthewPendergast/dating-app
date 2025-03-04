import MessagePreview from "./MessagePreview";
import "../../../assets/styles/scrollbar.css";

const RenderMessagePreviews = ({ userConnections, activeTab }) => {
    const connections = activeTab === "matches" ? userConnections.matches : userConnections.likes;

    if (connections.length === 0) {
        return (
            <p className="text-center p-10">No matches yet!</p>
        );
    }

    return connections.map(user => {
        return (
            <MessagePreview
                key={user.id}
                name={user.name ?? "Error"}
                image={user.profilePic ?? "/images/default-profile.webp"}
                message={user.message ?? "No message available"}
            />
        );
    });
}

const MessageWindow = ({ userConnections, activeTab }) => {
    return (
        <div className="flex-1 w-full overflow-x-hidden overflow-y-auto bg-gray-200 custom-scrollbar-sidebar">
            <RenderMessagePreviews
                userConnections={userConnections ?? { likes: [], matches: [] }}
                activeTab={activeTab}
            />
        </div>
    );
};

export default MessageWindow;