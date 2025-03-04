import React, { useState } from "react";
import UserSidebar from "../components/UserSidebar";
import CenterContent from "../components/CenterContent";
import MatchSidebar from "../components/MatchSidebar";
import Header from "../components/Header";

const MobileDashboard = ({ 
    activeMessage, 
    activeView, 
    selectedMatch, 
    setActiveMessage, 
    setActiveView, 
    setSelectedImage, 
    setSelectedMatch, 
    handlers, 
    activeSection,
    setActiveSection,
    isMobile
}) => {
    const [activeSection, setActiveSection] = useState("center");

    return (
        <div {...handlers} className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100">
            <Header />
            <div className="flex justify-center items-center p-4">
                {activeSection === "left" && <UserSidebar 
                    activeMessage={activeMessage}
                    setActiveMessage={setActiveMessage}
                    setSelectedMatch={setSelectedMatch}
                    setActiveView={setActiveView}
                />}
                {activeSection === "center" && <CenterContent
                    activeView={activeView}
                    selectedMatch={selectedMatch}
                    setActiveView={setActiveView}
                    setSelectedImage={setSelectedImage}
                    isMobile={isMobile}
                />}
                {activeSection === "right" && <MatchSidebar
                    activeMessage={activeMessage}
                    setActiveView={setActiveView}
                    setSelectedMatch={setSelectedMatch}
                />}
            </div>
        </div>
    );
};

export default MobileDashboard;