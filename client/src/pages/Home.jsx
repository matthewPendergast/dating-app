import { useEffect, useState } from "react";
import UserSidebar from "../components/dashboard/user-sidebar/UserSidebar";
import Nav from "../components/dashboard/Nav";

const Home = () => {
    const [userConnections, setUserConnections] = useState({ self: [], likes: [], matches: [] });

    useEffect(() => {
        fetch("/fake-users-list.json")
            .then(res => res.json())
            .then(users => {
                const self = users.filter(user => user.type === "self");
                const likes = users.filter(user => user.type === "like");
                const matches = users.filter(user => user.type === "match");
                setUserConnections({ self, likes, matches });
            })
            .catch(error => console.error("Error loading fake-users-list: ", error));
    }, []);

    return (
        <>
            <div className="flex h-[90vh] bg-black">
                <UserSidebar 
                    width="w-[30%]"
                    userConnections={userConnections}
                />
                <main className="h-full w-full mid:w-[40%]">

                </main>
                <UserSidebar 
                    width="w-[30%]"
                />
            </div>
            <Nav />
        </>
    );
};
  
export default Home;
