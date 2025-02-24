import { useState } from "react";
import Layout from "../layouts/DashboardLayout"
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import MatchSidebar from "../components/MatchSidebar";
import Footer from "../components/Footer";
import "../assets/styles/scrollbar.css";

const styles = {
    bubble: `flex items-center relative min-h-[3rem] w-auto max-w-[50%]
        p-3 mx-[5%] my-4 rounded-[2rem] border-gray-400 shadow-md border-[2px] bg-white`,
    imgBubble: `min-h-[12rem] min-w-[15vw]`,
    after: `after:content-[''] after:absolute after:bottom-[-9px] after:w-[10px] after:h-[7px]
        after:shadow-md after:border-[2px] after:border-gray-400 after:[border-style:none_outset_outset_outset] after:bg-white`,
    tailL: `after:left-6 after:rounded-br-[15rem]`,
    tailR: `after:right-6 after:rounded-bl-[15rem]`,
    messageImage: `h-full w-full object-cover rounded-3xl hover:brightness-90 cursor-pointer`,
};

const Dashboard = () => {
    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <Layout
            leftContent={
                <UserSidebar />
            }
            centerContent={
                <>
                    <Header />
                    <div className="flex flex-col h-[85vh] w-full py-4 overflow-x-hidden overflow-y-auto custom-scrollbar">
                        <div className={`${styles.bubble} ${styles.imgBubble} ${styles.after} ${styles.tailR} self-end`}>
                            <img className={`${styles.messageImage}`}
                                src="/images/fake-users/portrait-1.webp"
                                alt="Portrait of young woman"
                                onClick={(event) => setSelectedImage(event.target.src)} />
                        </div>
                        <div className={`${styles.bubble} ${styles.imgBubble} ${styles.after} ${styles.tailL} self-start`}>
                            <img className={`${styles.messageImage}`}
                                src="/images/fake-users/portrait-2.webp"
                                alt="Portrait of young man"
                                onClick={(event) => setSelectedImage(event.target.src)} />
                        </div>
                        <div className={`${styles.bubble} ${styles.after} ${styles.tailL} self-start`}>
                            <p className="px-1">Sign up for free!</p>
                        </div>
                        <form action="#" className={`${styles.bubble} ${styles.after} ${styles.tailR} self-end`}>
                                <input className="w-[85%] px-1 text-center border-none outline-none" type="email" name="email" id="email" placeholder="Enter your email" required />
                                <button className="w-[15%] rounded-[50%] pb-[.2rem] bg-[#a44d6d] shadow-[inset_0px_0px_5px_2px_#fe94bc] hover:brightness-90 cursor-pointer" type="submit">
                                    <i className="text-xs text-white fa-solid fa-reply"></i>
                                </button>
                        </form>
                    </div>
                </>
            }
            rightContent={
                <MatchSidebar />
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