import { useEffect, useState } from "react";
import useScreenSize from "../hooks/useScreenSize";
import LandingView from "../components/dashboard/main-views/LandingView";
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

    // Fetch data for user's connections
    useEffect(() => {
        const storedConnections = localStorage.getItem("userConnections");
        if (storedConnections) {
            const parsedConnections = JSON.parse(storedConnections);
            setUserConnections({
                self: parsedConnections.self,
                likes: parsedConnections.likes,
                matches: parsedConnections.matches
            });
            if (!selectedUser) {
                setSelectedUser(parsedConnections.matches[0] || null);
            }
        } else {
            fetch("/fake-users-list.json")
            .then(res => res.json())
            .then(users => {
                const self = users.filter(user => user.type === "self");
                const likes = users.filter(user => user.type === "like");
                const matches = users.filter(user => user.type === "match");
                const newConnections = { self, likes, matches };
                setUserConnections(newConnections);
                localStorage.setItem("userConnections", JSON.stringify(newConnections));
                if (!selectedUser) {
                    setSelectedUser(matches[0] || null);
                }
            })
            .catch(error => console.error("Error loading fake-users-list: ", error));
        }
    }, []);

    // Recalculate number of user-uploaded images when the array changes
    useEffect(() => {
        setNumUserImages(userImages.length);
    }, [userImages]);

    // Handle user images when selected user changes
    useEffect(() => {
        if (selectedUser?.type === "self") {
            setUserImages(getUserImages());
        }
    }, [selectedUser]);

    // Handle user images when the user uploads a new image
    useEffect(() => {
        const updateUserImages = () => {
            if (selectedUser?.type === "self") {
                setUserImages(getUserImages());
            }
        };
    
        window.addEventListener("userUploadedImage", updateUserImages);
        return () => window.removeEventListener("userUploadedImage", updateUserImages);
    }, [selectedUser]);

    const handleMatches = (selectedUser) => {
        // Match with a user
        if (selectedUser.type === "like") {
            const userIndex = userConnections.likes.findIndex(user => user.id === selectedUser.id);
            const matchedUser = userConnections.likes[userIndex];
            if (userIndex === -1) return;

            const likesList = [...userConnections.likes];
            likesList.splice(userIndex, 1);

            const updatedUser = { ...matchedUser, type: "match" };
            const matchesList = [updatedUser, ...userConnections.matches];

            const updatedConnections = {
                ...userConnections,
                likes: likesList,
                matches: matchesList
            };

            setUserConnections(updatedConnections);
            localStorage.setItem("userConnections", JSON.stringify(updatedConnections));
        }
        // Unmatch a user
        if (selectedUser.type === "match") {
            const userIndex = userConnections.matches.findIndex(user => user.id === selectedUser.id);
            const matchesList = [...userConnections.matches];
            matchesList.splice(userIndex, 1);

            const updatedConnections = {
                ...userConnections,
                matches: matchesList
            };

            setUserConnections(updatedConnections);
            localStorage.setItem("userConnections", JSON.stringify(updatedConnections));
            if (matchesList.length === 0) {
                setSelectedUser(userConnections.self[0]);
            }
        }
    };

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
        messages: selectedUser ? 
            (<MessagesView
                width={isMobile ? "w-full" : "w-[60vw]"}
                selectedUser={selectedUser}
                setCenterView={setCenterView}
                isMobile={isMobile}
                handleMatches={handleMatches}
            />) :
            (<LandingView
                width={isMobile ? "w-full" : "w-[60vw]"}
                setCenterView={setCenterView}
            />),
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
            userImages={userImages}
            setModalImage={setModalImage}
            setCenterView={setCenterView}
            handleMatches={handleMatches}
        />
    };

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
                    handleMatches={handleMatches}
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
