import { useEffect, useState } from "react";
import Layout from "../layouts/DashboardLayout"
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import MatchSidebar from "../components/MatchSidebar";

const styles = {
    bubble: "flex relative h-auto min-h-[2rem] w-auto max-w-[50%] p-3 mx-[5%] my-4 rounded-[2rem] border-gray-400 shadow-md border-[2px] bg-white",
    after: "after:content-[''] after:absolute after:bottom-[-9px] after:w-[10px] after:h-[7px] after:bg-white after:shadow-md after:border-[2px] after:border-gray-400 after:[border-style:none_outset_outset_outset]",
    tailL: "after:left-6 after:rounded-br-[15rem]",
    tailR: "after:right-6 after:rounded-bl-[15rem]",
};

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
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailR} justify-self-end`}>
                            <img className="max-h-[25vh] w-auto rounded-3xl cursor-pointer" src="/images/fake-users/portrait-1.webp" alt="Portrait of young woman" />
                        </div>
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailL} justify-self-start`}>
                            <img className="max-h-[25vh] w-auto rounded-3xl cursor-pointer" src="/images/fake-users/portrait-2.webp" alt="Portrait of young woman" />
                        </div>
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailL} justify-self-start`}>
                            <p>Sign up for free!</p>
                        </div>
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailR} justify-self-end`}>
                            <p className="text-gray-400">Enter your email address</p>
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