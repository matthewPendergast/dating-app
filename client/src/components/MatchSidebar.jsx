const matchName = "Daniel";
const profilePic = "/images/fake-users/portrait-2.webp";
const selectedImage = "/images/fake-users/profile-1.webp";

const styles = {
    header: "flex flex-col justify-center items-center h-[15vh] min-h-[5rem] bg-gradient-to-b from-[#059cff] to-[#07e6ff] shadow-[inset_0px_0px_3px_1px] hover:brightness-90 cursor-pointer",
    button: "flex justify-center items-center w-[50%] h-[50%] p-4 shadow-[inset_0px_0px_3px_1px] bg-white hover:brightness-90 cursor-pointer",
};

const MatchSidebar = () => {
    return (
        <div className="flex flex-col max-h-[100vh]">
            <div className={styles.header}>
                <img className="h-[70%] rounded-[50%] shadow-[0px_0px_5px_1px]" src={profilePic} alt="" />
                <p className="font-bold">{matchName}</p>
            </div>
            <div className="h-[60vh] w-full overflow-hidden flex justify-center items-center cursor-pointer">
                <img className="w-full h-full object-cover object-center" src={selectedImage} alt="" />
            </div>
            <div className="flex flex-wrap h-[25vh]">
                {["View Profile", "Video Call", "Unmatch", "Report"].map((text) => (
                    <div key={text} className={styles.button}>
                        <p className="font-semibold">{text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MatchSidebar;