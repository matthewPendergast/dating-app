import { useState } from "react";
import Layout from "../layouts/DashboardLayout"
import Header from "../components/Header";
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

    return (
        <>
            <Layout
            leftContent={
                <UserSidebar
                    activeMessage={activeMessage}
                    setActiveMessage={setActiveMessage}
                />
            }
            centerContent={
                <>
                    <Header />
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
    );
}

export default Dashboard;