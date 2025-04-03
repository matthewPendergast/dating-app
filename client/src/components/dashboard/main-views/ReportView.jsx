const ReportView = ({
    width="w-full",
    selectedUser,
    setCenterView,
    handleMatches,
}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
        handleMatches(selectedUser);
        setCenterView("userSidebar");
    };

    return (
        <main className={`${width} relative flex flex-col justify-center bg-gradient-to-b from-gray-400 to-gray-700 shadow-[inset_0px_0px_7px_2px]`}>
            <div className="relative flex flex-col items-center w-[80%] p-2 md:p-3 mx-auto mb-3 rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white">
                <h2 className="text-2xl font-semibold">Report Profile</h2>
                <form className="flex flex-col gap-2 my-2" onSubmit={handleSubmit}>
                    <label htmlFor="fake">
                        <input
                            className="scale-150 mx-3"
                            type="radio"
                            name="report"
                            value="fake"
                            required
                        />
                        Fake profile/impersonation
                    </label>
                    <label htmlFor="inappropriate">
                        <input
                            className="scale-150 mx-3"
                            type="radio"
                            name="report"
                            value="inappropriate"
                        />
                        Inappropriate content
                    </label>
                    <label htmlFor="harassment">
                        <input
                            className="scale-150 mx-3"
                            type="radio"
                            name="report"
                            value="harassment"
                        />
                        Harassment
                    </label>
                    <label htmlFor="scam">
                        <input
                            className="scale-150 mx-3"
                            type="radio"
                            name="report"
                            value="scam"
                        />
                        Scam/fraud
                    </label>
                    <label htmlFor="offsite">
                        <input
                            className="scale-150 mx-3"
                            type="radio"
                            name="report"
                            value="offsite"
                        />
                        Off-site behavior
                    </label>
                    <label htmlFor="other">
                        <input
                            className="scale-150 mx-3"
                            type="radio"
                            name="report"
                            value="other"
                        />
                        Other/not listed
                    </label>
                    <div className="flex gap-6 self-center">
                        <button
                            className="text-center py-1 px-3 mt-2 border bg-white border-black rounded-full shadow-[inset_-1px_-1px_3px] hover:brightness-90"
                            onClick={() => setCenterView("matchSidebar")}    
                        >
                            Cancel
                        </button>
                        <button
                            className="text-center py-1 px-3 mt-2 border bg-white border-black rounded-full shadow-[inset_-1px_-1px_3px] hover:brightness-90"
                            type="submit"   
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
            
        </main>
    );
};

export default ReportView;