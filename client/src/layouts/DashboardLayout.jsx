const DashboardLayout = ({
    leftContent, centerContent, rightContent,
    leftClassName = "",
    centerClassName = "",
    rightClassName = "",
}) => {
    return (
        <div className="flex items-stretch h-screen">
            <div className={`flex-grow hidden lg:block w-[25%] ${leftClassName}`}>
                {leftContent}
            </div>
            <div className={`flex flex-col flex-grow h-full min-w-[50%] ${centerClassName}`}>
                {centerContent}
            </div>
            <div className={`flex-grow hidden lg:block w-[25%] ${rightClassName}`}>
                {rightContent}
            </div>
        </div>
    );
}

export default DashboardLayout;