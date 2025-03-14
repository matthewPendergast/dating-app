import { useEffect, useState } from "react";
import headerStyles from "../../../assets/styles/sidebarHeaderStyles.js";

const styles = {
    button: `h-1/2 w-1/2 shadow-[inset_0px_0px_5px_1px] bg-white
        hover:brightness-90 active:shadow-[inset_0px_0px_8px_1px]`,
};

const MatchSidebar = ({
    width = "w-full",
    isMainView = false,
    isMobile,
    centerView,
    selectedUser,
    setModalImage,
    setCenterView,
    userImages,
}) => {
    const [imageIndex, setImageIndex] = useState(0);
    const [numUserImages, setNumUserImages] = useState(0);
    const [profilePic, setProfilePic] = useState("/images/default-profile.webp");
    const [mainImage, setMainImage] = useState("/images/default-profile.webp");
    const [matchName, setMatchname] = useState(selectedUser?.name || "No user selected")

    // useEffect(() => {
    //     if (selectedUser?.type === "self") {
    //         const storedProfile = localStorage.getItem("userProfile");
    //         if (storedProfile) {
    //             setUserProfile(JSON.parse(storedProfile));
    //         } else {
    //             setUserProfile(selfUser);
    //         }
    //     }
    // }, [selectedUser, selfUser]);

    useEffect(() => {
        if (selectedUser?.type === "self") {
            const images = JSON.parse(localStorage.getItem("userImages")) || [];
            const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
            if (storedProfile) {
                setMatchname(storedProfile.name);
            }
            setProfilePic(images.length > 0 ? images[0] : selectedUser?.profilePic || "/images/default-profile.webp");
            setMainImage(images.length > 0 ? images[imageIndex] : selectedUser?.images?.[imageIndex] || "/images/default-profile.webp");
        } else {
            setProfilePic(selectedUser?.profilePic || "/images/default-profile.webp");
            setMainImage(selectedUser?.images?.[imageIndex] || "/images/default-profile.webp");
        }
    }, [selectedUser, imageIndex]);

    useEffect(() => {
        setImageIndex(0);
    }, [selectedUser]);

    // Event listeners for user editing profile
    useEffect(() => {
        const handleProfilePicUpdate = () => {
            if (selectedUser?.type === "self") {
                const images = JSON.parse(localStorage.getItem("userImages")) || [];
                setProfilePic(images[0] || "/images/default-profile.webp");
                setMainImage(images[0] || "/images/default-profile.webp");
                setImageIndex(0);
                setNumUserImages(images.length);
            }
        };

        const handleNameChange = () => {
            const storedProfile = JSON.parse(localStorage.getItem("userProfile"));
            if (storedProfile) {
                setMatchname(storedProfile.name);
            }
        };
    
        window.addEventListener("userUploadedImage", handleProfilePicUpdate);
        window.addEventListener("profileUpdated", handleNameChange);
        return () => window.removeEventListener("userUploadedImage", handleProfilePicUpdate);
    }, [selectedUser, userImages]);

    // Fix display issue from changing window sizes
    if (centerView === "matchSidebar" && !isMobile) {
        setCenterView("profile");
    }
    
    return (
        <aside className={`${isMainView ? "flex" : "hidden"} lg:flex flex-col h-full ${width} overflow-hidden`}>
            {/* Header */}
            <div
                className={`${headerStyles.header}`}
                onClick={() => setCenterView("profile")}    
            >
                <div className={`${headerStyles.headerPicWrapper}`}>
                    <img className={`${headerStyles.headerPic}`} src={profilePic} alt="" />
                </div>
                <p className="font-semibold">{matchName}</p>
            </div>
            {/* Gallery */}
            <div className="relative flex justify-center items-center h-[35rem] w-full overflow-hidden">
                {((selectedUser?.images?.length > 1 && selectedUser.type !== "self") ||
                        numUserImages > 1 && selectedUser.type === "self") && (
                    <button
                        className="absolute bottom-2 left-2 hover:brightness-90"
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
                    className="h-full w-full object-cover object-top lg:object-center cursor-pointer"
                    src={mainImage}
                    onClick={() => setModalImage(mainImage)}
                    alt="" />
                {((selectedUser?.images?.length > 1 && selectedUser.type !== "self") ||
                        numUserImages > 1 && selectedUser.type === "self") && (
                    <button
                        className="absolute bottom-2 right-2 text-white hover:brightness-90"
                        onClick={() => setImageIndex((prev) =>
                            (prev + 1) % ((selectedUser?.type === "self" && numUserImages > 0) ? numUserImages : selectedUser?.images?.length)
                        )}
                    >
                        <i className="text-xl text-white bg-black px-3 py-2 rounded-full fa-regular fa-square-caret-right"></i>
                    </button>
                )}
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap flex-grow min-h-[20vh]">
                <button className={`${styles.button}`} onClick={() => setCenterView("profile")}>View Profile</button>
                <button className={`${styles.button}`}>Video Call</button>
                <button className={`${styles.button}`}>Unmatch</button>
                <button className={`${styles.button}`}>Report</button>
            </div>
        </aside>
    );
};

export default MatchSidebar;
