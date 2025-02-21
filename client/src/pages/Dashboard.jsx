import { useEffect, useState } from "react";
import Layout from "../layouts/DashboardLayout"
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import MatchSidebar from "../components/MatchSidebar";

// Temporary until chat/message component is created
const chatStyle = "flex h-auto min-h-[2rem] w-auto max-w-[50%] p-3 mx-[5%] my-4 rounded-[2rem] bg-white";

const Dashboard = () => {
    const [data, setData] = useState(null);
    const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

    useEffect(() => {
        fetch(`${API_URL}/pages/Dashboard`)
            .then(response => response.json())
            .then(setData)
            .catch(() => setData(null));
    }, []);

    return (
        <Layout
            leftContent={
                <UserSidebar />
            }
            centerContent={
                <>
                    <Header />

                    <div className="flex-col justify-center items-center h-[70%] py-4">
                        <div className={`${chatStyle} justify-self-end`}>
                            <img className="max-h-[25vh] w-auto rounded-3xl" src="/images/fake-users/portrait-1.webp" alt="Portrait of young woman" />
                        </div>
                        <div className={`${chatStyle} justify-self-start`}>
                            <img className="max-h-[25vh] w-auto rounded-3xl" src="/images/fake-users/portrait-2.webp" alt="Portrait of young woman" />
                        </div>
                        <div className={`${chatStyle} justify-self-start`}>
                            <p>Sign up for free!</p>
                        </div>
                    </div>
                </>
            }
            rightContent={
                <MatchSidebar />
            }
            leftClassName=""
            centerClassName="bg-gradient-to-b from-[#a44d6d] to-[#fe94bc]"
            rightClassName=""
        />
    );
}

export default Dashboard;