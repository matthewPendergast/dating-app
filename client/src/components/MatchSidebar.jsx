const matchName = "Daniel";
const profilePic = "/images/fake-users/portrait-2.webp";
const selectedImage = "/images/fake-users/profile-1.webp";

const MatchSidebar = () => {
    return (
        <div className="flex flex-col max-h-[100vh]">
            <div className="flex flex-col justify-center items-center h-[15vh] min-h-[5rem] bg-gradient-to-b from-[#059cff] to-[#07e6ff] shadow-[inset_0px_0px_3px_1px]">
                <img className="h-[70%] rounded-[50%] shadow-[0px_0px_5px_1px]" src={profilePic} />
                <p className="font-bold">{matchName}</p>
            </div>
            <div className="h-[60vh] min-h-[25rem] w-full overflow-hidden flex justify-center items-center">
                <img className="w-full h-full object-cover object-center" src={selectedImage} />
            </div>
            <div className="flex flex-wrap h-[25vh]">
                <div className="flex justify-center items-center w-[50%] h-[50%] p-4 shadow-[inset_0px_0px_3px_1px]">
                    <p className="font-semibold">View Profile</p>
                </div>
                <div className="flex justify-center items-center w-[50%] h-[50%] p-4 shadow-[inset_0px_0px_3px_1px]">
                    <p className="font-semibold">Video Call</p>
                </div>
                <div className="flex justify-center items-center w-[50%] h-[50%] p-4 shadow-[inset_0px_0px_3px_1px]">
                    <p className="font-semibold">Unmatch</p>
                </div>
                <div className="flex justify-center items-center w-[50%] h-[50%] p-4 shadow-[inset_0px_0px_3px_1px]">
                    <p className="font-semibold">Report</p>
                </div>
            </div>
        </div>
    );
}

export default MatchSidebar;