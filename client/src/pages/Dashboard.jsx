import { useEffect, useState } from "react";
import Layout from "../layouts/DashboardLayout"
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import MatchSidebar from "../components/MatchSidebar";
import Footer from "../components/Footer";
import "../assets/styles/scrollbar.css";

const styles = {
    bubble: `flex justify-center items-center relative h-auto min-h-[2rem] w-auto max-w-[50%] min-w-[15vw]
        p-3 mx-[5%] my-4 rounded-[2rem] border-gray-400 shadow-md border-[2px] bg-white`,
    bubbleImg: `min-h-[25vh] min-w-[15vw]`,
    after: `after:content-[''] after:absolute after:bottom-[-9px] after:w-[10px] after:h-[7px]
        after:shadow-md after:border-[2px] after:border-gray-400 after:[border-style:none_outset_outset_outset] after:bg-white`,
    tailL: `after:left-6 after:rounded-br-[15rem]`,
    tailR: `after:right-6 after:rounded-bl-[15rem]`,
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
                    <div className="flex flex-col justify-center items-center h-[85vh] w-full py-4 overflow-x-hidden overflow-y-auto custom-scrollbar">
                        <div className={`${styles.bubble} ${styles.bubbleImg} ${styles.after} ${styles.tailR} self-end`}>
                            <img className="h-full w-full object-cover rounded-3xl cursor-pointer" src="/images/fake-users/portrait-1.webp" alt="Portrait of young woman" />
                        </div>
                        <div className={`${styles.bubble} ${styles.bubbleImg} ${styles.after} ${styles.tailL} self-start`}>
                            <img className="h-full w-full object-cover rounded-3xl cursor-pointer" src="/images/fake-users/portrait-2.webp" alt="Portrait of young woman" />
                        </div>
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailL} self-start`}>
                            <p className="px-1">Sign up for free!</p>
                        </div>
                        <form action="#" className={`${styles.bubble} ${styles.after} ${styles.tailR} self-end`}>
                                <input className="w-[85%] px-1 text-center border-none outline-none" type="email" name="email" id="email" placeholder="Enter your email" required />
                                <button className="w-[15%] rounded-[50%] pt-[.1rem] px-[.1rem] pb-[.2rem] bg-[#a44d6d] shadow-[inset_0px_0px_5px_2px_#fe94bc] hover:brightness-90 cursor-pointer" type="submit">
                                    <i className="text-sm text-white fa-solid fa-reply"></i>
                                </button>
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