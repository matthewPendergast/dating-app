import { useEffect } from "react";

const styles = {
    profileBubble: `flex flex-col justify-center items-center w-[90%]
        py-3 rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white overflow-hidden`,
    infoBubble: `text-center py-1 px-3 border border-black rounded-full shadow-[inset_-1px_-1px_3px]`,
    infoIcon: `fa-solid pr-2`,
};

const ProfileInfoDisplay = ({
    selectedUser,
    setIsUserEditing,
}) => {

    useEffect(() => {
        const handleProfileUpdate = () => {
            if (selectedUser?.type === "self") {
                const updatedProfile = localStorage.getItem("userProfile");
                if (updatedProfile) {
                    selectedUser = updatedProfile;
                }
            }
        };

        window.addEventListener("profileUpdated", handleProfileUpdate);
        return () => window.removeEventListener("profileUpdated", handleProfileUpdate);
    });

    return (
        <>
        {/* Profile - Basics */}
        <div className={`${styles.profileBubble} relative`}>
            {/* Save Button */}
            {selectedUser?.type === "self" && 
                <button
                    className="absolute top-4 right-4 border border-black rounded-full p-2 bg-green-300"
                    onClick={() => setIsUserEditing(true)}
                >
                    Edit
                </button>
            }
            {/* Top Line */}
            <div className="flex items-center gap-1">
                <h2 className="font-semibold">{selectedUser?.name},</h2>
                <p>{selectedUser?.age}</p>
                {selectedUser?.verified && <i className="fa-solid fa-circle-check pl-1 text-[#059cff]"></i>}
            </div>
            {/* Activity */}
            <div className="flex">
                {selectedUser?.lastActive === "now" ? (
                    <p>Active now!</p>
                ) : (
                    <p>Last Active: {selectedUser?.lastActive} ago</p>
                )}
            </div>
            {/* Height */}
            {selectedUser?.heightcm >= 0 && (
                <div className="flex gap-1">
                    {selectedUser?.heightft >0 && <p>{selectedUser.heightft} ft</p>}
                    {selectedUser?.heightin >0 && <p>{selectedUser.heightin} in</p>}
                    {selectedUser?.heightcm >0 && <p>/ {selectedUser.heightcm} cm</p>}
                </div>
            )}
            {/* Employment */}
            {selectedUser?.jobTitle && (
                <p>
                    <i className="fa-solid fa-suitcase pr-2"></i>
                    {selectedUser.jobTitle}
                </p>
            )}
            {/* School */}
            {selectedUser?.school && (
                <p>
                    <i className="fa-solid fa-building-columns pr-2"></i>
                    {selectedUser.school}
                </p>
            )}
        </div>
        {/* About Me */}
        {selectedUser?.about && (
            <div className={`${styles.profileBubble}`}>
                <h2 className="font-semibold">About Me:</h2>
                <p className="w-[90%] mx-auto text-center">{selectedUser.about}</p>
            </div>
        )}
        {/* Optional Info */}
        {selectedUser?.hasInfo && (
            <div className={`${styles.profileBubble}`}>
                <h2 className="font-semibold pb-2">Info:</h2>
                <div className="flex justify-center flex-wrap gap-2 w-[90%]">
                    {selectedUser?.zodiac && (
                        <p className={`${styles.infoBubble}`}>
                            <i className={`${styles.infoIcon} fa-scale-balanced`}></i>
                            {selectedUser.zodiac}
                        </p>)}
                    {selectedUser?.education && (
                        <p className={`${styles.infoBubble}`}>
                            <i className={`${styles.infoIcon} fa-graduation-cap`}></i>
                            {selectedUser.education}
                        </p>)}
                    {selectedUser?.kids && (
                        <p className={`${styles.infoBubble}`}>
                            <i className={`${styles.infoIcon} fa-children`}></i>
                            {selectedUser.kids}
                        </p>)}
                    {selectedUser?.familyPlans && (
                        <p className={`${styles.infoBubble}`}>
                            <i className={`${styles.infoIcon} fa-baby-carriage`}></i>
                            {selectedUser.familyPlans}
                        </p>)}
                    {selectedUser?.pets && (
                        <p className={`${styles.infoBubble}`}>
                            <i className={`${styles.infoIcon} fa-paw`}></i>
                            {selectedUser.pets}
                        </p>)}
                    {selectedUser?.drinking && (
                        <p className={`${styles.infoBubble}`}>
                            <i className={`${styles.infoIcon} fa-martini-glass`}></i>
                            {selectedUser.drinking}
                        </p>)}
                    {selectedUser?.smoking && (
                        <p className={`${styles.infoBubble}`}>
                            <i className={`${styles.infoIcon} fa-smoking`}></i>
                            {selectedUser.smoking}
                        </p>)}
                    {selectedUser?.workout && (
                        <p className={`${styles.infoBubble}`}>
                            <i className={`${styles.infoIcon} fa-dumbbell`}></i>
                            {selectedUser.workout}
                        </p>)}
                </div>
            </div>
        )}
        </>
    )
};

export default ProfileInfoDisplay