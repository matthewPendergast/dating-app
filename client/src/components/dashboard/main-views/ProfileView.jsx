import Header from "../../dashboard/main-views/Header";
import ProfileInfoDisplay from "./ProfileInfoDisplay";
import ProfileInfoEdit from "./ProfileInfoEdit";
import "../../../assets/styles/scrollbar.css";
import { useEffect, useState } from "react";

const styles = {
    wrapper: `h-full py-1 bg-gradient-to-b from-[#a44d6d] to-[#fe94bc]
        shadow-[inset_0px_0px_7px_2px] overflow-x-hidden overflow-y-auto custom-scrollbar`,
};

const ProfileView = ({
    width = "w-full",
    selectedUser,
    setModalImage,
    userImages,
    setUserImages,
    numUserImages,
}) => {
    const [isUserEditing, SetIsUserEditing] = useState(false);
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
                {(isUserEditing && selectedUser?.type === "self") ?
                    <ProfileInfoEdit
                        selectedUser={selectedUser}
                        SetIsUserEditing={SetIsUserEditing}
                    />
                :
                    <ProfileInfoDisplay
                        selectedUser={selectedUser}
                        SetIsUserEditing={SetIsUserEditing}
                    />
                }
            </div>
        </main>
    );
};

export default ProfileView