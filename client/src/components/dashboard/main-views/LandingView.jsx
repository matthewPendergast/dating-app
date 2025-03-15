import Header from "./Header";

const styles = {
    wrapper: `h-full py-1 bg-gradient-to-b from-[#a44d6d] to-[#fe94bc]
        shadow-[inset_0px_0px_7px_2px] overflow-hidden`,
};

const LandingView = ({
    width="w-full",
}) => {
    return (
        <main className={`${width} ${styles.wrapper}`}>
            <Header />
            <div className="flex justify-center items-center h-[75%] w-full">
                <p className="text-white">No matches yet!</p>
            </div>
        </main>
    );
};

export default LandingView;