import { useState } from "react";
import MessageWindow from "./MessageWindow";

const UserSidebar = ({
    width = "w-full",
    userConnections,
    isMainView = false,
}) => {
    const [activeTab, setActiveTab] = useState("matches");
    const profilePic = userConnections?.self?.[0]?.profilePic || "/images/default-profile.webp";
    const likesTotal = userConnections?.likes?.length || 0;
    const matchesTotal = userConnections?.matches?.length || 0;

    return (
        <aside className={`${isMainView ? "" : "hidden"} lg:flex flex-col h-full ${width} overflow-hidden`}>
            <div className="flex flex-col justify-center items-center h-28 bg-blue-400">
                <img className="h-[60%]" src={profilePic} alt="" />
                <p>My Profile</p>
            </div>
            <div className="flex h-16 bg-gray-400">
                <button
                    className="flex justify-center items-center gap-2 h-full w-1/2 py-1 border bg-white"
                    onClick={() => setActiveTab("likes")}
                >
                    <p>Likes</p>
                    <p className="bg-red-200 rounded-full px-2 py-1">{likesTotal}</p>
                </button>
                <button
                    className="flex justify-center items-center gap-2 h-full w-1/2 py-1 border bg-white"
                    onClick={() => setActiveTab("matches")}
                >
                    <p>Matches</p>
                    <p className="bg-red-200 rounded-full px-2 py-1">{matchesTotal}</p>
                </button>
            </div>
            <MessageWindow 
                userConnections={userConnections}
                activeTab={activeTab}
            />
        </aside>
    );
};

export default UserSidebar;