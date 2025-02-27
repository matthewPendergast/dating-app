import { useEffect, useState } from "react";
import MessagePreview from "./MessagePreview";
import "../assets/styles/scrollbar.css";

// To be imported properly from database later:
const profilePic = "/images/fake-users/portrait-1.webp";

const styles = {
    header: `flex flex-col justify-center items-center h-[15vh] min-h-[5rem]
        bg-gradient-to-b from-[#059cff] to-[#07e6ff] shadow-[inset_0px_0px_10px_2px]
        hover:brightness-90 cursor-pointer`,
    button: `flex justify-center items-center gap-2 flex-grow shadow-[inset_0px_0px_5px_1px] bg-white
        hover:brightness-90 cursor-pointer active:shadow-[inset_0px_0px_8px_1px]`,
    buttonIn: `brightness-90 shadow-[inset_0px_0px_8px_1px]`,
    buttonOut: `brightness-100 shadow-[inset_0px_0px_5px_1px]`,
    messages: `flex flex-col h-[78vh] bg-gray-400 shadow-[inset_0px_0px_5px_1px]
        overflow-x-hidden overflow-y-auto custom-scrollbar-sidebar`,
};

const RenderMessagePreviews = ({ users, activeMessage, setActiveMessage }) => {
    return users.map(user => (
        <MessagePreview
            key={user.id}
            name={user.name ?? "Error"}
            image={user.profilePic ?? "/images/default-profile.webp"}
            message={user.message ?? "No message available"}
            onClick={() => setActiveMessage(user.id)}
            className={user.id === activeMessage ? "brightness-90 shadow-[inset_0px_0px_8px_1px]" : "brightness-100 shadow-[inset_0px_0px_6px_1px]"}
        />
    ));
};

const UserSidebar = ({ activeMessage, setActiveMessage }) => {
    const [data, setData] = useState({ likes: [], matches: [] });
    const [activeTab, setActiveTab] = useState("matches");

    useEffect(() => {
        fetch("/fake-users-list.json")
            .then(res => res.json())
            .then(users => {
                const likes = users.filter(user => user.type === "like");
                const matches = users.filter(user => user.type === "match");
                setData({ likes, matches });
            })
            .catch(error => console.error("Error loading user data:", error));
    }, []);

    useEffect(() => {
        const users = activeTab === "likes" ? data.likes : data.matches;
        if (users.length > 0) {
            setActiveMessage(users[0].id);
        }
    }, [data, activeTab, setActiveMessage]);

    return (
        <div className="flex flex-col max-h-[100vh]">
            <div className={styles.header}>
                <img className="h-[70%] rounded-[50%] shadow-[0px_0px_5px_2px]" src={profilePic} alt="" />
                <p className="font-bold">My Profile</p>
            </div>
            <div className="flex h-[5vh] min-h-[2.5rem]">
                <div 
                    className={`${styles.button} ${activeTab === "likes" ? `${styles.buttonIn}` : `${styles.buttonOut}`}`}
                    onClick={() => setActiveTab("likes")}>
                    <p className="font-semibold">Likes</p>
                    <p className="px-2 rounded-[50%] font-semibold text-white bg-[#fe94bc]">{data.likes.length}</p>
                </div>
                <div 
                    className={`${styles.button} ${activeTab === "matches" ? `${styles.buttonIn}` : `${styles.buttonOut}`}`}
                    onClick={() => setActiveTab("matches")}>
                    <p className="font-semibold">Matches</p>
                    <p className="px-2 rounded-[50%] font-semibold text-white bg-[#fe94bc]">{data.matches.length}</p>
                </div>
            </div>
            <div className={styles.messages}>
            <div className={styles.messages}>
            <RenderMessagePreviews 
                users={activeTab === "likes" ? data.likes : data.matches} 
                activeMessage={activeMessage} 
                setActiveMessage={setActiveMessage} 
            />
            </div>
            </div>
            <div className="h-[2vh] shadow-[inset_0px_0px_6px_1px]" />
        </div>
    );
};


export default UserSidebar;