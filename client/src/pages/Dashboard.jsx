import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import useScreenSize from "../hooks/useScreenSize";
import DesktopLayout from "../layouts/DashboardLayoutDesktop";
import MobileLayout from "../layouts/DashboardLayoutMobile";
import UserSidebar from "../components/UserSidebar";
import CenterContent from "../components/CenterContent";
import MatchSidebar from "../components/MatchSidebar";
import Footer from "../components/Footer";
import "../assets/styles/scrollbar.css";

const Dashboard = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [activeMessage, setActiveMessage] = useState(null);
    const [activeView, setActiveView] = useState("messages");
    const [selectedMatch, setSelectedMatch] = useState(null);
    const [activeSection, setActiveSection] = useState("center");
    const [matches, setMatches] = useState([]);
    const isMobile = useScreenSize();

    useEffect(() => {
        if (matches.length > 0) {
            setSelectedMatch((prevMatch) => prevMatch ?? matches[0]);
        }
    }, [matches]);    

    const handlers = useSwipeable({
        onSwipedLeft: () => {
            if (activeSection === "left") setActiveSection("center");
            else if (activeSection === "center") setActiveSection("right");
        },
        onSwipedRight: () => {
            if (activeSection === "right") setActiveSection("center");
            else if (activeSection === "center") setActiveSection("left");
        },
        preventScrollOnSwipe: true,
        trackMouse: true,
    });

    const mobileContent = activeSection === "left" ? (
        <UserSidebar 
            activeMessage={activeMessage}
            setActiveMessage={setActiveMessage}
            setSelectedMatch={setSelectedMatch}
            setMatches={setMatches}
            setActiveView={setActiveView}
            setActiveSection={setActiveSection}
            isMobile={isMobile}
        />
    ) : activeSection === "center" ? (
        <>
            <CenterContent 
                activeView={activeView}
                selectedMatch={selectedMatch}
                setActiveView={setActiveView}
                setSelectedImage={setSelectedImage}
                isMobile={isMobile}
            />
        </>
    ) : (
        <MatchSidebar 
            activeMessage={activeMessage}
            setActiveView={setActiveView}
            setSelectedMatch={setSelectedMatch}
            setActiveSection={setActiveSection}
            isMobile={isMobile}
        />
    );

    const mobileClassName = (activeSection === "center"
    ? "w-full bg-gradient-to-b from-[#a44d6d] to-[#fe94bc] shadow-[inset_0px_0px_7px_2px]" : "w-full"); 

    return (
        isMobile ? (
            <>
            <MobileLayout 
                {...handlers}
                content={mobileContent}
                className={mobileClassName}
                isMobile={isMobile}
            />
        </>
        ) : (
        <>
            <DesktopLayout
            leftContent={
                <UserSidebar
                    activeMessage={activeMessage}
                    setActiveMessage={setActiveMessage}
                    setSelectedMatch={setSelectedMatch}
                    setActiveView={setActiveView}
                />
            }
            centerContent={
                <>
                    <CenterContent 
                        activeView={activeView}
                        selectedMatch={selectedMatch}
                        setActiveView={setActiveView}
                        setSelectedImage={setSelectedImage}
                    />
                </>
            }
            rightContent={
                <MatchSidebar
                    activeMessage={activeMessage}
                    setActiveView={setActiveView}
                    setSelectedMatch={setSelectedMatch}
                />
            }
            leftClassName=""
            centerClassName="bg-gradient-to-b from-[#a44d6d] to-[#fe94bc] shadow-[inset_0px_0px_7px_2px]"
            rightClassName=""
            />
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
            <Footer />
        </>
        )
    );
}

export default Dashboard;