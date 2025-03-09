import messageStyles from "../../../assets/styles/messageBubbleStyles.js";

const styles = {
    header: `relative flex justify-center items-center h-28 w-[90%]
        mx-auto rounded-[2rem] shadow-[inset_-1px_-1px_5px_1px] bg-white`,
    logo: `absolute top-4 left-4 h-10 w-auto object-contain
        transition-transform cursor-pointer duration-500 hover:scale-125 hover:-rotate-12 hover:brightness-90 
        hover:duration-500 active:scale-150 active:duration-200`,
    h1: `pacifico-regular text-5xl py-3 pb-6
        bg-gradient-to-b from-[#a44d6d] to-[#fe94bc] bg-clip-text text-transparent
        drop-shadow-[0_0_2px_pink] leading-none
        hover:brightness-90 cursor-pointer`,
    login: `absolute bottom-3 right-3 h-14 w-14 text-white
        bg-[#fe94bc] rounded-full shadow-[inset_-1px_-2px_1px_black]
        hover:brightness-90 active:shadow-[inset_-1px_-1px_4px_black]`,
};

const Header = () => {
    return (
        <header className={`${styles.header} ${messageStyles.after} ${messageStyles.tailL}`}>
            <img className={`${styles.logo}`} src="/images/logo-image.webp" alt="" />
            <h1 className={`${styles.h1}`}>affinity</h1>
            <button className={`${styles.login}`}>Login</button>
        </header>
    );
};

export default Header;