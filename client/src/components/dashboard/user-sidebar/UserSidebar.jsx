import { useEffect, useState } from "react";
import MessageWindow from "./MessageWindow";
import headerStyles from "../../../assets/styles/sidebarHeaderStyles.js";

const styles = {
    buttons: `flex justify-center items-center gap-2 h-16 w-1/2 py-1 shadow-[inset_0px_0px_5px_1px]
        hover:bg-gray-200 cursor-pointer active:shadow-[inset_0px_0px_8px_1px]`,
    buttonIn: `bg-gray-200 shadow-[inset_0px_0px_8px_1px]`,
    buttonOut: `bg-white shadow-[inset_0px_0px_5px_1px]`,
};

const UserSidebar = ({
    width = "w-full",
    userConnections,
    isMainView = false,
    isMobile,
    centerView,
    setSelectedUser,
    setCenterView,
}) => {
    const [activeTab, setActiveTab] = useState("matches");
    const [profilePic, setProfilePic] = useState("/images/default-profile.webp");
    const likesTotal = userConnections?.likes?.length || 0;
    const matchesTotal = userConnections?.matches?.length || 0;

    // Fix display issue from changing window sizes
    if (centerView === "userSidebar" && !isMobile) {
        setCenterView("messages");
    }

    const updateProfilePic = () => {
        const userImages = JSON.parse(localStorage.getItem("userImages")) || [];
        const fallbackImage = userConnections?.self?.[0]?.profilePic || "/images/default-profile.webp";
        setProfilePic(userImages.length > 0 ? userImages[0] : fallbackImage);
    };

    useEffect(() => {
        updateProfilePic();
    }, [userConnections]);

    useEffect(() => {
        const handleStorageChange = () => {
            updateProfilePic();
        };

        window.addEventListener("profilePicUpdated", handleStorageChange);
        return () => window.removeEventListener("profilePicUpdated", handleStorageChange);
    }, []);

    return (
        <aside className={`${isMainView ? "flex" : "hidden"} lg:flex flex-col h-full ${width} overflow-hidden`}>
            {/* Header */}
            <div
                className={`${headerStyles.header}`}
                onClick={() => setSelectedUser(userConnections.self[0])}    
            >
                <div className={`${headerStyles.headerPicWrapper}`}>
                    <img className={`${headerStyles.headerPic}`} src={profilePic} alt="" />
                </div>
                <p className="font-semibold">My Profile</p>
            </div>
            {/* Likes/Matches Toggle */}
            <div className="flex h-16 bg-gray-400">
                <button
                    className={`${styles.buttons} ${activeTab === "likes" ? styles.buttonIn : styles.buttonOut}`}
                    onClick={() => setActiveTab("likes")}
                >
                    <p className="font-semibold">Likes</p>
                    <p className="rounded-full px-2 py-1 text-white font-semibold bg-[#fe94bc]">{likesTotal}</p>
                </button>
                <button
                    className={`${styles.buttons} ${activeTab === "matches" ? styles.buttonIn : styles.buttonOut}`}
                    onClick={() => setActiveTab("matches")}
                >
                    <p className="font-semibold">Matches</p>
                    <p className="rounded-full px-2 py-1 text-white font-semibold bg-[#fe94bc]">{matchesTotal}</p>
                </button>
            </div>
            {/* Message Window */}
            <MessageWindow 
                userConnections={userConnections}
                activeTab={activeTab}
                setSelectedUser={setSelectedUser}
                setCenterView={setCenterView}
            />
        </aside>
    );
};

export default UserSidebar;