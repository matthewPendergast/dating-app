import { useEffect, useState } from "react";
import MessagePreview from "./MessagePreview";
import '../assets/styles/userSidebar.css';

// To be imported properly from database later:
const profilePic = "/images/fake-users/portrait-1.webp";
const likes = 30;

const styles = {
    header: "flex flex-col justify-center items-center h-[15vh] min-h-[5rem] bg-gradient-to-b from-[#059cff] to-[#07e6ff] shadow-[inset_0px_0px_3px_1px] hover:brightness-90 cursor-pointer",
    button: "flex justify-center items-center gap-2 flex-grow shadow-[inset_0px_0px_3px_1px] bg-white hover:brightness-90 cursor-pointer",
};

const UserSidebar = () => {
    const [users, setUsers] = useState([]);
    const [matches, setMatches] = useState(0);

    useEffect(() => {
        fetch("fake-users.json")
            .then(response => response.json())
            .then(data => {
                setUsers(data);
                setMatches(data.length);
            })
            .catch(error => console.error("Error loading user data:", error));
    }, []);
    
    return (
        <div className="flex flex-col max-h-[100vh]">
            <div className={styles.header}>
                <img className="h-[70%] rounded-[50%] shadow-[0px_0px_5px_1px]" src={profilePic} />
                <p className="font-bold">My Profile</p>
            </div>
            <div className="flex h-[5vh] min-h-[2.5rem]">
                <div className={styles.button}>
                    <p className="font-semibold">Likes</p>
                    <p className="px-2 py-1 rounded-[50%] font-semibold text-white bg-[#fe94bc]">{likes}</p>
                </div>
                <div className={styles.button}>
                    <p className="font-semibold">Matches</p>
                    <p className="px-2 py-1 rounded-[50%] font-semibold text-white bg-[#fe94bc]">{matches}</p>
                </div>
            </div>
            <div className="flex flex-col h-[79vh] overflow-x-hidden overflow-y-scroll">
                {users.map(user => (
                    <MessagePreview
                        key={user.id}
                        name={user.name ?? "Error"}
                        image={user["profile-pic"] ?? "/images/default-profile.webp"}
                        message={user.message ?? "No message available"}
                    />
                ))}
            </div>
            <div className="h-[1vh] shadow-[inset_0px_0px_3px_1px]" />
        </div>
    );
}

export default UserSidebar;