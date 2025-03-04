const MessagesView = ({ styles, setSelectedImage, isMobile }) => {

    const opener = isMobile ? "Swipe left/right to browse your options!" : "Sign up for free!";

    return (
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
            <p className="text-center p-1">{opener}</p>
        </div>
        <div className={`${styles.bubble} ${styles.after} ${styles.tailR} self-end`}>
            <input className="w-[85%] text-center p-1 border-none outline-none" placeholder="Click here to reply" />
            <button className="w-[15%] rounded-[50%] pb-[.2rem] bg-[#a44d6d] shadow-[inset_0px_0px_5px_2px_#fe94bc] hover:brightness-90 cursor-pointer">
                <i className="text-xs text-white fa-solid fa-reply"></i>
            </button>
        </div>
        </>
    );
}

export default MessagesView;