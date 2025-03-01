import "../assets/styles/scrollbar.css";

const styles = {
    bubble: `flex items-center relative max-h-[12rem] min-h-[3rem] w-auto max-w-[50%]
        p-3 mx-[5%] my-4 rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white`,
    imgBubble: `flex-shrink-0 min-h-[10rem] min-w-[15vw]`,
    after: `after:content-[''] after:absolute after:bottom-[-7px] after:w-[10px] after:h-[7px]
        after:shadow-md after:border-[2px] after:border-gray-400 after:[border-style:none_outset_outset_outset] after:bg-white`,
    tailL: `after:left-7 after:rounded-br-[15rem]`,
    tailR: `after:right-7 after:rounded-bl-[15rem]`,
    messageImage: `h-full min-h-[8rem] w-full object-cover rounded-3xl hover:brightness-90 cursor-pointer`,
};

const CenterContent = ({ activeView, selectedMatch, setActiveView, setSelectedImage }) => {
    return (
        <div className="flex flex-col h-[85vh] w-full overflow-x-hidden overflow-y-auto custom-scrollbar">
            {activeView === "messages" ? (
                <>
                    <div className={`${styles.bubble} ${styles.imgBubble} ${styles.after} ${styles.tailR} self-end`}>
                        <img className={`${styles.messageImage}`}
                            src="/images/fake-users/portrait-1.webp"
                            alt="Portrait of young woman"
                            onClick={(event) => setSelectedImage(event.target.src)} />
                    </div>
                    <div className={`${styles.bubble} ${styles.imgBubble} ${styles.after} ${styles.tailL} self-start`}>
                        <img className={`${styles.messageImage}`}
                            src="/images/fake-users/daniel-3.webp"
                            alt="Portrait of young man"
                            onClick={(event) => setSelectedImage(event.target.src)} />
                    </div>
                    <div className={`${styles.bubble} ${styles.after} ${styles.tailL} self-start`}>
                        <p className="px-1">Sign up for free!</p>
                    </div>
                    <form action="#" className={`${styles.bubble} ${styles.after} ${styles.tailR} self-end`}>
                        <input className="w-[85%] px-1 text-center border-none outline-none" type="email" name="email" id="email" placeholder="Enter your email" required />
                        <button className="w-[15%] rounded-[50%] pb-[.2rem] bg-[#a44d6d] shadow-[inset_0px_0px_5px_2px_#fe94bc] hover:brightness-90 cursor-pointer" type="submit">
                            <i className="text-xs text-white fa-solid fa-reply"></i>
                        </button>
                    </form>
                </>
            ) : (
                <div className="flex flex-col items-center mt-3">
                    <div className="flex justify-center items-center h-[25rem] w-full">
                        <img
                            src={selectedMatch?.profilePic}
                            alt={selectedMatch?.name}
                            className="h-[95%] max-w-[75%] object-cover rounded-lg shadow-[0px_0px_5px_2px] hover:brightness-90 cursor-pointer"
                            onClick={(event) => setSelectedImage(event.target.src)}
                        />
                    </div>
                    <div className="flex flex-col items-center gap-1 w-[75%] py-3 pb-5 my-1 rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white">
                        <div className="flex gap-1">
                            <h2 className="font-semibold">{selectedMatch.name},</h2>
                            <p>{selectedMatch.age}</p>
                            {selectedMatch.verified && <i className="fa-solid fa-circle-check text-[#059cff] self-center"></i>}
                        </div>
                        {selectedMatch?.lastActive && (
                            selectedMatch.lastActive === "now" ? (
                                <p>Active now!</p>
                            ) : (
                                <p>Last Active: {selectedMatch.lastActive} ago</p>
                            )
                        )}
                        <div className="flex gap-1">
                            {selectedMatch?.heightft >= 0 && <p>{selectedMatch.heightft} ft</p>}
                            {selectedMatch?.heightin >= 0 && <p>{selectedMatch.heightin} in</p>}
                            {selectedMatch?.heightcm >= 0 && <p>/ {selectedMatch.heightcm} cm</p>}
                        </div>
                        {selectedMatch?.jobTitle && <p><i className="fa-solid fa-suitcase pr-1"></i>{selectedMatch.jobTitle}</p>}
                        {selectedMatch?.school && <p><i className="fa-solid fa-building-columns pr-1"></i>{selectedMatch.school}</p>}
                    </div>
                    {selectedMatch.about &&
                        <div className="flex flex-col items-center gap-1 w-[75%] rounded-[2rem] py-3 pb-5 my-1 shadow-[inset_-1px_-1px_5px_1px] bg-white">
                            <h2 className="font-semibold">About Me:</h2>
                            <p className="w-[90%]">{selectedMatch.about}</p>
                        </div>
                    }
                    {selectedMatch.hasInfo &&
                        <div className="flex flex-col items-center gap-1 w-[75%] rounded-[2rem] py-3 pb-5 my-1 shadow-[inset_-1px_-1px_5px_1px] bg-white">
                            <h2 className="font-semibold">Info:</h2>
                            {selectedMatch?.zodiac && <p><i className="fa-solid fa-scale-balanced pr-2"></i>{selectedMatch.zodiac}</p>}
                            {selectedMatch?.education && <p><i className="fa-solid fa-graduation-cap pr-2"></i>{selectedMatch.education}</p>}
                            {selectedMatch?.children && <p><i className="fa-solid fa-baby-carriage pr-2"></i>{selectedMatch.children}</p>}
                            {selectedMatch?.pets && <p><i className="fa-solid fa-paw pr-2"></i>{selectedMatch.pets}</p>}
                            {selectedMatch?.drinking && <p><i className="fa-solid fa-martini-glass pr-2"></i>{selectedMatch.drinking}</p>}
                            {selectedMatch?.smoking && <p><i className="fa-solid fa-smoking pr-2"></i>{selectedMatch.smoking}</p>}
                            {selectedMatch?.workout && <p><i className="fa-solid fa-dumbbell pr-2"></i>{selectedMatch.workout}</p>}
                        </div>
                    }
                    <button
                        onClick={() => setActiveView("messages")}
                        className={`${styles.bubble} self-start mx-[2%] hover:brightness-90`}>
                        ← Back to Messages
                    </button>
                </div>
            )}
        </div>
    );
};

export default CenterContent;
