const styles = {
    icon: `fa-solid text-2xl hover:scale-125 cursor-pointer`
};

const Nav = ({
    centerView,
    setCenterView,
}) => {
    return (
        <nav className="flex justify-evenly items-center h-[10vh] min-h-20 overflow-hidden bg-black">
            <i className={`${styles.icon} ${centerView === "userSidebar" ? "text-[#fe94bc]" : "text-white"} fa-heart`}
                onClick={() => setCenterView("userSidebar")}></i>
            <i className={`${styles.icon} ${centerView === "messages" ? "text-[#fe94bc]" : "text-white"} fa-comments`}
                onClick={() => setCenterView("messages")} ></i>
            <i className={`${styles.icon} ${centerView === "matchSidebar" ? "text-[#fe94bc]" : "text-white"} fa-user`}
                onClick={() => setCenterView("matchSidebar")}></i>
        </nav>
    );
}

export default Nav