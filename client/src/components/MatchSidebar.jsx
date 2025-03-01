import { useState, useEffect } from "react";

const placeholderMatch = {
    name: "Loading...",
    profilePic: "/images/default-profile.webp",
    images: ["/images/default-profile.webp"],
};

const styles = {
    header: `flex flex-col justify-center items-center h-[15vh] min-h-[5rem]
        bg-gradient-to-b from-[#059cff] to-[#07e6ff] shadow-[inset_0px_0px_10px_2px]
        hover:brightness-90 cursor-pointer`,
    button: `flex justify-center items-center w-[50%] h-[50%] min-h-[4rem] p-4 shadow-[inset_0px_0px_5px_1px] bg-white
    hover:brightness-90 active:shadow-[inset_0px_0px_8px_1px] cursor-pointer`,
};

const MatchSidebar = ({ activeMessage, setActiveView, setSelectedMatch }) => {
    const [matchData, setMatchData] = useState(null);
    const [index, setIndex] = useState(0);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        fetch("/fake-users-list.json")
            .then((res) => res.json())
            .then((data) => {
                const match = data.find((m) => m.id === activeMessage);
                if (match) {
                    setMatchData(match);
                }
            })
            .catch((err) => console.error("Error loading match data:", err));
    }, [activeMessage]);

    const data = matchData || placeholderMatch;

    const handleViewProfile = () => {
        if (matchData) {
            setSelectedMatch(matchData);
            setActiveView("profile");
        }
    };

    const handleButtonClick = (buttonText) => {
        // Temporary empty cases until they are implemented
        switch (buttonText) {
            case "View Profile":
                handleViewProfile();
                break;
            case "Video Call":
                break;
            case "Unmatch":
                break;
            case "Report":
                break;
            default:
                break;
        }
    };    

    const prevImage = () => {
        setIndex((prev) => (prev === 0 ? data.images.length - 1 : prev - 1));
    }

    const nextImage = () => {
        setIndex((prev) => (prev + 1) % data.images.length);
    }

    const imgSrc = data.images[index] || data.images[0];

    return (
        <div className="flex flex-col max-h-[100vh]">
            <div className={styles.header} onClick={() => handleButtonClick("View Profile")}>
                <img className="h-[70%] rounded-[50%] shadow-[0px_0px_5px_2px]" src={data.profilePic} alt={data.name} />
                <p className="font-bold">{data.name}</p>
            </div>
            <div className="relative flex justify-center items-center h-[60vh] w-full overflow-hidden cursor-pointer">
                <button 
                    className="absolute bottom-0 left-2 text-white p-2 rounded-full hover:brightness-90"
                    style={{textShadow:"3px 3px black"}}
                    onClick={prevImage}>
                    <i className="text-2xl fa-regular fa-square-caret-left"></i>
                </button>
                <img className="w-full h-full object-cover object-center" src={imgSrc} alt=""
                    onClick={() => setSelectedImage(imgSrc)} />
                <button 
                    className="absolute bottom-0 right-2 text-white p-2 rounded-full hover:brightness-90"
                    style={{textShadow:"3px 3px black"}}
                    onClick={nextImage}>
                    <i className="text-2xl fa-regular fa-square-caret-right"></i>
                </button>
            </div>
            <div className="flex flex-wrap h-[25vh]">
                {["View Profile", "Video Call", "Unmatch", "Report"].map((text) => (
                    <div 
                        key={text} 
                        className={styles.button} 
                        onClick={() => handleButtonClick(text)}
                    >
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