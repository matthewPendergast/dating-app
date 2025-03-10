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
    setModalImage
}) => {
    const [userImages, setUserImages] = useState(() => {
        if (selectedUser?.type === "self") {
            return JSON.parse(localStorage.getItem("userImages")) || [];
        }
        return [];
    });    
    const [imageIndex, setImageIndex] = useState(0);
    const mainImage = (selectedUser?.type === "self" && userImages.length > 0)
        ? userImages[imageIndex] 
        : selectedUser?.images?.[imageIndex] || "/images/default-profile.webp";

    // Retrieves user's localStorage images when selectedUser is self
    useEffect(() => {
        if (selectedUser?.type === "self") {
            const savedImages = JSON.parse(localStorage.getItem("userImages")) || [];
            setUserImages(savedImages);
        } else {
            setUserImages([]);
        }
    }, [selectedUser]);

    // Sets image index to profilePic when selectedUser changes
    useEffect(() => {
        if (!selectedUser?.images || selectedUser.images.length === 0) {
            setImageIndex(0);
            return;
        }
    
        let index = selectedUser.images.findIndex(img => img === selectedUser.profilePic);
        setImageIndex(index !== -1 ? index : 0);
    }, [selectedUser]);    

    const handleImageUpload = (event) => {
        if (selectedUser?.type !== "self") return;
    
        const files = Array.from(event.target.files);
        const readFileAsDataURL = (file) => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        };
    
        Promise.all(files.map(readFileAsDataURL)).then((newImages) => {
            setUserImages((prevImages) => {
                const updatedImages = [...prevImages, ...newImages].slice(0, 5);
                localStorage.setItem("userImages", JSON.stringify(updatedImages));
                window.dispatchEvent(new Event("profilePicUpdated"));
                return updatedImages;
            });
        });

        setImageIndex(userImages.length);
    };    

    return (
        <main className={`${width} ${styles.wrapper}`}>
            <Header />
            <div className="flex flex-col items-center gap-3 my-3">
                {/* Gallery */}
                <div className="relative flex justify-center w-[90%] mt-2 rounded-[2rem] bg-black overflow-hidden">
                    {/* Allow user to upload up to 5 images */}
                    {(selectedUser?.type === "self" && userImages.length < 5) && (
                        <button
                            className="absolute top-4 right-4"
                            onClick={() => document.getElementById("fileInput").click()}
                        >
                            <i className="text-3xl text-white bg-black p-2 pl-3 pb-3 rounded-full fa-solid fa-pen-to-square"></i>
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
                    {((selectedUser?.images.length > 1 && selectedUser.type !== "self") ||
                        userImages.length > 1 && selectedUser.type === "self") && (
                            <button
                                className="absolute bottom-4 left-4"
                                onClick={() => 
                                    setImageIndex((prev) => 
                                        prev === 0 ? (userImages.length || selectedUser?.images?.length) - 1 : prev - 1
                                    )
                                }
                            >
                                <i className="text-4xl text-white bg-black p-2 rounded-full fa-regular fa-square-caret-left"></i>
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
                        userImages.length > 1 && selectedUser.type === "self") && (
                            <button
                                className="absolute bottom-4 right-4"
                                onClick={() =>
                                    setImageIndex((prev) =>
                                        (prev + 1) % (userImages.length || selectedUser?.images?.length)                        
                                    )
                                }
                            >
                                <i className="text-4xl text-white bg-black p-2 rounded-full fa-regular fa-square-caret-right"></i>
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