const DashboardLayoutDesktop = ({
    leftContent, centerContent, rightContent,
    leftClassName = "",
    centerClassName = "",
    rightClassName = "",
}) => {
    return (
        <div className="flex items-stretch h-screen">
            <div className={`flex-grow hidden lg:block w-[20%] ${leftClassName}`}>
                {leftContent}
            </div>
            <div className={`flex flex-col flex-grow h-full min-w-[60%] ${centerClassName}`}>
                {centerContent}
            </div>
            <div className={`flex-grow hidden lg:block w-[20%] ${rightClassName}`}>
                {rightContent}
            </div>
        </div>
    );
}

export default DashboardLayoutDesktop;