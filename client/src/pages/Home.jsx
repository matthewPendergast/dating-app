import { useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import ProfileView from "../components/dashboard/main-views/ProfileView";
import MessagesView from "../components/dashboard/main-views/MessagesView";
import UserSidebar from "../components/dashboard/user-sidebar/UserSidebar";
import MatchSidebar from "../components/dashboard/match-sidebar/MatchSidebar";
import Nav from "../components/dashboard/Nav";

const Home = () => {
    const isMobile = useScreenSize();
    const [userConnections, setUserConnections] = useState({ self: [], likes: [], matches: [] });
    const [selectedUser, setSelectedUser] = useState(null);
    const [modalImage, setModalImage] = useState(null);
    const [centerView, setCenterView] = useState("messages");
    const [userImages, setUserImages] = useState(() => {
        return JSON.parse(localStorage.getItem("userImages")) || [];
    });    
    const [numUserImages, setNumUserImages] = useState(0);

    // Utility function for pulling user-uploaded images from localStorage
    const getUserImages = () => {
        const images = JSON.parse(localStorage.getItem("userImages")) || [];
        if (images.length === 0) {
            return [];
        }
        setNumUserImages(images.length);
        return images;
    };

    // Recalculate number of user-uploaded images when the array changes
    useEffect(() => {
        setNumUserImages(userImages.length);
    }, [userImages]);

    useEffect(() => {
        if (selectedUser?.type === "self") {
            setUserImages(getUserImages());
        }
    }, [selectedUser]);

    useEffect(() => {
        const updateUserImages = () => {
            if (selectedUser?.type === "self") {
                setUserImages(getUserImages());
            }
        };
    
        window.addEventListener("userUploadedImage", updateUserImages);
        return () => window.removeEventListener("userUploadedImage", updateUserImages);
    }, [selectedUser]);    

    const viewComponents = {
        profile: <ProfileView
            width={isMobile ? "w-full" : "w-[60vw]"}
            selfUser={userConnections.self[0]}
            selectedUser={selectedUser}
            setModalImage={setModalImage}
            userImages={userImages}
            setUserImages={setUserImages}
            numUserImages={numUserImages}
        />,
        messages: <MessagesView
            width={isMobile ? "w-full" : "w-[60vw]"}
            selectedUser={selectedUser}
            setCenterView={setCenterView}
        />,
        userSidebar: <UserSidebar 
            width="w-full"
            isMainView={true}
            isMobile={isMobile}
            centerView={centerView}
            userConnections={userConnections}
            setSelectedUser={setSelectedUser}
            setCenterView={setCenterView}
        />,
        matchSidebar: <MatchSidebar 
            width="w-full"
            isMainView={isMobile}
            isMobile={isMobile}
            centerView={centerView}
            selectedUser={selectedUser}
            setModalImage={setModalImage}
            setCenterView={setCenterView}
            userImages={userImages}
        />
    };

    // Fetch data for user's connections
    useEffect(() => {
        fetch("/fake-users-list.json")
            .then(res => res.json())
            .then(users => {
                const self = users.filter(user => user.type === "self");
                const likes = users.filter(user => user.type === "like");
                const matches = users.filter(user => user.type === "match");
                setUserConnections({ self, likes, matches });
                if (matches.length >= 1) {
                    setSelectedUser(matches[0]);
                }
            })
            .catch(error => console.error("Error loading fake-users-list: ", error));
    }, []);

    return (
        isMobile ? (
            // Mobile Layout
            <>
            <div className="flex h-[90vh] w-full">
                {viewComponents[centerView]}
            </div>
            <Nav
                centerView={centerView}
                setCenterView={setCenterView}
            />
            {modalImage && (
                <dialog
                    className="flex justify-center items-center h-screen w-screen fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
                    onClick={() => setModalImage(null)}
                >
                    <img className="max-h-[80%] max-w-[80%] rounded-sm shadow-lg" src={modalImage} alt="" />
                </dialog>
            )}
            </>
        ) : (
            // Desktop Layout
            <>
            <div className="flex h-[100vh]">
                <UserSidebar 
                    width="w-[20vw]"
                    userConnections={userConnections}
                    setSelectedUser={setSelectedUser}
                    setCenterView={setCenterView}
                />
                {viewComponents[centerView]}
                <MatchSidebar 
                    width="w-[20vw]"
                    selectedUser={selectedUser}
                    setModalImage={setModalImage}
                    setCenterView={setCenterView}
                />
            </div>
            <footer className="flex items-center min-h-[10vh] bg-black">
                <div className="w-[25vw]">
                    <p className="text-white text-center">© affinity 2025</p>
                </div>
                <div className="w-[50vw]">
                    <p className="text-white text-center">All images are AI-generated</p>
                </div>
                <div className="flex justify-center gap-3 w-[25vw]">
                    <i class="fa-brands fa-facebook text-white hover:brightness-90 cursor-pointer"></i>
                    <i class="fa-brands fa-x-twitter text-white hover:brightness-90 cursor-pointer"></i>
                    <i class="fa-brands fa-instagram text-white hover:brightness-90 cursor-pointer"></i>
                    <i class="fa-brands fa-tiktok text-white hover:brightness-90 cursor-pointer"></i>
                </div>
            </footer>
            {modalImage && (
                <dialog
                    className="flex justify-center items-center h-screen w-screen fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md"
                    onClick={() => setModalImage(null)}
                >
                    <img className="max-h-[90%] max-w-[90%] rounded-md shadow-lg" src={modalImage} alt="" />
                </dialog>
            )}
            </>
        )
    );
};
  
export default Home;
