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
    setActiveSection 
}) => {
    const [activeSection, setActiveSection] = useState("center");

    return (
        <div {...handlers} className="flex flex-col h-screen w-screen overflow-hidden bg-gray-100">
            <Header />
            <div className="flex-1 flex justify-center items-center p-4">
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
                />}
                {activeSection === "right" && <MatchSidebar
                    activeMessage={activeMessage}
                    setActiveView={setActiveView}
                    setSelectedMatch={setSelectedMatch}
                />}
            </div>
            <div className="flex justify-between p-4 bg-gray-300">
                <button className={`px-4 py-2 rounded ${activeSection === "left" ? "bg-gray-600 text-white" : "bg-gray-400"}`}
                        onClick={() => setActiveSection("left")}>
                    Users
                </button>
                <button className={`px-4 py-2 rounded ${activeSection === "center" ? "bg-gray-600 text-white" : "bg-gray-400"}`}
                        onClick={() => setActiveSection("center")}>
                    Chat
                </button>
                <button className={`px-4 py-2 rounded ${activeSection === "right" ? "bg-gray-600 text-white" : "bg-gray-400"}`}
                        onClick={() => setActiveSection("right")}>
                    Matches
                </button>
            </div>
        </div>
    );
};

export default MobileDashboard;