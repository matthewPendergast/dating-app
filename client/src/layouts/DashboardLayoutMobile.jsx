const DashboardLayoutMobile = ({ content, className, ...handlers }) => {
    return (
        <div {...handlers} className="flex items-stretch h-screen">
            <div className={`${className}`}>
                {content}
            </div>
        </div>
    );
}

export default DashboardLayoutMobile;