import { useEffect, useState } from "react";
import Layout from "../layouts/DashboardLayout"
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import MatchSidebar from "../components/MatchSidebar";
import Footer from "../components/Footer";

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
        <>
            <Layout
            leftContent={
                <UserSidebar />
            }
            centerContent={
                <>
                    <Header />
                    <div className="flex-col justify-center items-center h-[90vh] py-4 overflow-x-hidden overflow-scroll scrollbar-hide">
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailR} justify-self-end`}>
                            <img className="max-h-[25vh] w-auto rounded-3xl cursor-pointer transition-transform:transition-duration-1s" src="/images/fake-users/portrait-1.webp" alt="Portrait of young woman" />
                        </div>
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailL} justify-self-start`}>
                            <img className="max-h-[25vh] w-auto rounded-3xl cursor-pointer" src="/images/fake-users/portrait-2.webp" alt="Portrait of young woman" />
                        </div>
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailL} justify-self-start`}>
                            <p>Sign up for free!</p>
                        </div>
                        <form action="#">
                            <div className={`${styles.bubble} ${styles.after} ${styles.tailR} justify-self-end`}>
                                <input className="w-[85%] text-center border-none outline-none" type="email" name="email" id="email" placeholder="Enter your email" required />
                                <button class="w-[15%] rounded-[50%] pt-[.1rem] px-[.1rem] pb-[.2rem] bg-[#a44d6d] shadow-[inset_0px_0px_5px_2px_#fe94bc] hover:brightness-90 cursor-pointer" type="submit">
                                    <i class="text-sm text-white fa-solid fa-reply"></i>
                                </button>
                            </div>
                        </form>
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
            <Footer />
        </>
    );
}

export default Dashboard;