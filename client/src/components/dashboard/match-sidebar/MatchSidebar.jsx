import { useEffect, useState } from "react";
import headerStyles from "../../../assets/styles/sidebarHeaderStyles.js";

const styles = {
    button: `h-1/2 w-1/2 shadow-[inset_0px_0px_5px_1px] bg-white
        hover:brightness-90 active:shadow-[inset_0px_0px_8px_1px]`,
};

const MatchSidebar = ({
    width = "w-full",
    isMainView = false,
    selectedUser,
    setModalImage,
    setCenterView,
}) => {
    const profilePic = selectedUser?.profilePic || "/images/default-profile.webp";
    const matchName = selectedUser?.name || "No user selected"
    const [imageIndex, setImageIndex] = useState(0);
    const mainImage = selectedUser?.images[imageIndex] || "/images/default-profile.webp";

    // Reset image index to 0 when selectedUser changes
    useEffect(() => {
        setImageIndex(0);
    }, [selectedUser]);

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
            <div className="relative flex justify-center items-center h-[30rem] w-full overflow-hidden">
                <button
                    className="absolute bottom-0 left-2 text-white hover:brightness-90"
                    onClick={() => 
                        setImageIndex((prev) => 
                            (prev === 0 ? selectedUser?.images?.length - 1 : prev - 1)
                        )
                    }
                >
                    <i className="text-2xl fa-regular fa-square-caret-left"></i>
                </button>
                <img
                    className="h-full w-full object-cover object-center cursor-pointer"
                    src={mainImage}
                    onClick={() => setModalImage(mainImage)}
                    alt="" />
                <button
                    className="absolute bottom-0 right-2 text-white hover:brightness-90"
                    onClick={() =>
                        setImageIndex((prev) =>
                            ((prev + 1) % selectedUser?.images?.length)
                        )
                    }    
                >
                    <i className="text-2xl fa-regular fa-square-caret-right"></i>
                </button>
            </div>
            {/* Buttons */}
            <div className="flex flex-wrap flex-grow min-h-16">
                <button className={`${styles.button}`} onClick={() => setCenterView("profile")}>View Profile</button>
                <button className={`${styles.button}`}>Video Call</button>
                <button className={`${styles.button}`}>Unmatch</button>
                <button className={`${styles.button}`}>Report</button>
            </div>
        </aside>
    );
};

export default MatchSidebar;
