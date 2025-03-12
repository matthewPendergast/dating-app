import Header from "../../dashboard/main-views/Header";
import "../../../assets/styles/scrollbar.css";
import { useEffect, useState } from "react";

const styles = {
    wrapper: `h-full py-1 bg-gradient-to-b from-[#a44d6d] to-[#fe94bc]
        shadow-[inset_0px_0px_7px_2px] overflow-x-hidden overflow-y-auto custom-scrollbar`,
    profileBubble: `flex flex-col justify-center items-center w-[90%]
        py-3 rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white`,
    infoBubble: `text-center py-1 px-3 border border-black rounded-full shadow-[inset_-1px_-1px_3px]`,
    infoIcon: `fa-solid pr-2`,
};

const ProfileView = ({
    width = "w-full",
    selectedUser,
    setModalImage,
    userImages,
    setUserImages,
    numUserImages,
}) => {
    const [imageIndex, setImageIndex] = useState(0);
    const mainImage = (() => {
        if (selectedUser?.type === "self") {
            return numUserImages > 0 
                ? userImages[imageIndex] 
                : selectedUser?.images?.[imageIndex] || "/images/default-profile.webp";
        }
        return selectedUser?.images?.[imageIndex] || "/images/default-profile.webp";
    })();
    
    // Sets image index to profilePic when selectedUser changes
    useEffect(() => {
        setImageIndex(0);
    }, [selectedUser]);

    const handleImageUpload = (event) => {
        if (selectedUser?.type !== "self") return;
        
        // Convert FileList to array to be processed with map function
        const files = Array.from(event.target.files);
        // Converts files into Base64-encoded data URL so they can be stored in localStorage
        const readFileAsDataURL = (file) => {
            return new Promise((resolve, reject) => {
                // Use JavaScript FileReader API, which reads files
                const reader = new FileReader();
                // Resolve the promise with the file's data URL when reading is complete
                reader.onloadend = () => resolve(reader.result);
                // Error handling, reject promise if it fails
                reader.onerror = reject;
                // Reads file as Base64 string
                reader.readAsDataURL(file);
            });
        };
    
        // Map each file into a promise that resolves to a Base64 string
        Promise.all(files.map(readFileAsDataURL)).then((newImages) => {
            // Calls setUserImages function from Home.jsx to update userImages state
            setUserImages((prevImages) => {
                const uniqueImages = Array.from(new Set([...prevImages, ...newImages])); // Prevent duplicates
                // Combines previous userImages with new image; limit of 5
                const updatedImages = uniqueImages.slice(0, 5);
                // Store userImages in localStorage
                localStorage.setItem("userImages", JSON.stringify(updatedImages));
                // Custom dispatch event to notify other components
                window.dispatchEvent(new Event("userUploadedImage"));
                setImageIndex(updatedImages.length - 1);
                return updatedImages;
            });
        });
    };

    return (
        <main className={`${width} ${styles.wrapper}`}>
            <Header />
            <div className="flex flex-col items-center gap-3 my-3">
                {/* Gallery */}
                <div className="relative flex justify-center w-[90%] mt-2 rounded-[2rem] bg-black overflow-hidden">
                    {/* Allow user to upload up to 5 images */}
                    {(selectedUser?.type === "self" && numUserImages < 5) && (
                        <button
                            className="absolute top-2 right-2"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            <i className="text-xl text-white bg-black px-3 py-2 rounded-full fa-solid fa-pen-to-square"></i>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageUpload}
                                id="fileInput"
                                className="hidden"
                            />
                        </button>
                    )}
                    {/* Only show image change buttons if the selected user has more than 1 image uploaded */}
                    {((selectedUser?.images?.length > 1 && selectedUser.type !== "self") ||
                        numUserImages > 1 && selectedUser.type === "self") && (
                            <button
                                className="absolute bottom-2 left-2"
                                onClick={() => setImageIndex((prev) =>
                                    prev === 0
                                        ? (((selectedUser?.type === "self" && numUserImages > 0) ? numUserImages : selectedUser?.images?.length) - 1)
                                        : prev - 1
                                )}
                            >
                                <i className="text-xl text-white bg-black px-3 py-2 rounded-full fa-regular fa-square-caret-left"></i>
                            </button>
                    )}
                    <img
                        className="h-[20rem] md:h-[25rem] object-cover rounded-lg shadow-[0px_0px_5px_2px] cursor-pointer"
                        src={mainImage}
                        alt=""
                        onClick={() => setModalImage(mainImage)}
                    />
                    {/* Only show image change buttons if the selected user has more than 1 image uploaded */}
                    {((selectedUser?.images.length > 1 && selectedUser.type !== "self") ||
                        numUserImages > 1 && selectedUser.type === "self") && (
                            <button
                                className="absolute bottom-2 right-2"
                                onClick={() => setImageIndex((prev) =>
                                    (prev + 1) % ((selectedUser?.type === "self" && numUserImages > 0) ? numUserImages : selectedUser?.images?.length)
                                )}
                            >
                                <i className="text-xl text-white bg-black px-3 py-2 rounded-full fa-regular fa-square-caret-right"></i>
                            </button>
                    )}
                </div>
                {/* Profile - Basics */}
                <div className={`${styles.profileBubble}`}>
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
                            {selectedUser?.children && (
                                <p className={`${styles.infoBubble}`}>
                                    <i className={`${styles.infoIcon} fa-baby-carriage`}></i>
                                    {selectedUser.children}
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
            </div>
        </main>
    );
};

export default ProfileView