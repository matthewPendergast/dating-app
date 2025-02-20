import Layout from "../layouts/DashboardLayout"
import Header from "../components/Header";
import UserSidebar from "../components/UserSidebar";
import MatchSidebar from "../components/MatchSidebar";

const Dashboard = () => {
    return (
        <Layout
            leftContent={
                <UserSidebar />
            }
            centerContent={
                <>
                    <Header />
                    <div className="flex justify-center items-center h-[70%]">
                        <h2 className="text-5xl text-center text-white">Under Construction</h2>
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