import Header from "../components/Header";
import MessagesView from "./MessagesView";
import ProfileView from "./ProfileView";
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

const CenterContent = ({ activeView, selectedMatch, setActiveView, setSelectedImage, isMobile }) => {

    const views = {
        messages: <MessagesView
            styles={styles}
            setSelectedImage={setSelectedImage}
            isMobile={isMobile}  />,
        profile: <ProfileView
            styles={styles}
            selectedMatch={selectedMatch}
            setActiveView={setActiveView}
            setSelectedImage={setSelectedImage} />
    }

    return (
        <>
        <div className="flex flex-col h-screen w-full overflow-x-hidden overflow-y-auto custom-scrollbar">
            <Header />
            <>
                {views[activeView]}
            </>
        </div>
        </>
    );
};

export default CenterContent;
