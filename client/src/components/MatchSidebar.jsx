import { useState } from "react";

const matchName = "Daniel";
const profilePic = "/images/fake-users/portrait-2.webp";
const currentImage = "/images/fake-users/profile-1.webp";

const styles = {
    header: `flex flex-col justify-center items-center h-[15vh] min-h-[5rem]
        bg-gradient-to-b from-[#059cff] to-[#07e6ff] shadow-[inset_0px_0px_10px_2px]
        hover:brightness-90 cursor-pointer`,
    button: `flex justify-center items-center w-[50%] h-[50%] min-h-[4rem] p-4 shadow-[inset_0px_0px_5px_1px] bg-white
    hover:brightness-90 active:shadow-[inset_0px_0px_8px_1px] cursor-pointer`,
};

const MatchSidebar = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <div className="flex flex-col max-h-[100vh]">
            <div className={styles.header}>
                <img className="h-[70%] rounded-[50%] shadow-[0px_0px_5px_2px]" src={profilePic} alt="" />
                <p className="font-bold">{matchName}</p>
            </div>
            <div className="h-[60vh] w-full overflow-hidden flex justify-center items-center hover:brightness-90 cursor-pointer">
                <img className="w-full h-full object-cover object-center" src={currentImage} alt=""
                    onClick={(event) => setSelectedImage(event.target.src)} />
            </div>
            <div className="flex flex-wrap h-[25vh]">
                {["View Profile", "Video Call", "Unmatch", "Report"].map((text) => (
                    <div key={text} className={styles.button}>
                        <p className="font-semibold text-center">{text}</p>
                    </div>
                ))}
            </div>
            {selectedImage && (
                <div 
                    className="flex justify-center items-center fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
                    onClick={() => setSelectedImage(null)}>
                    <img
                        src={selectedImage}
                        alt="Enlarged"
                        className="max-w-[80%] max-h-[80%] rounded-md shadow-lg"
                    />
                </div>
            )}
        </div>
    );
}

export default MatchSidebar;