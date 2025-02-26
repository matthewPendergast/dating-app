import { Link } from "react-router-dom";

const styles = {
    bubble: "flex relative w-11/12 h-[15%] min-h-[5rem] p-1 rounded-[2rem] border-gray-400 shadow-md border-[2px] mt-2 mx-auto bg-white",
    after: `after:content-[''] after:absolute after:bottom-[-9px] after:left-6 after:w-[10px] after:h-[7px]
        after:bg-white after:shadow-md after:border-[2px] after:border-gray-400 after:[border-style:none_outset_outset_outset] after:rounded-br-[15rem]`,
    logo: `
        absolute top-3 left-3 h-[2.5rem] w-auto object-contain
        transition-transform cursor-pointer duration-500 hover:scale-125 hover:-rotate-12 hover:brightness-90 
        hover:duration-500 active:scale-150 active:duration-200`,
    h1: `pacifico-regular text-5xl py-3 pb-6
        bg-gradient-to-b from-[#a44d6d] to-[#fe94bc] bg-clip-text text-transparent
        drop-shadow-[0_0_2px_pink] leading-none
        hover:brightness-90 cursor-pointer`,
}

const Header = () => {
    return (
        <header className={`${styles.bubble} ${styles.after}`}>
            <div className="flex justify-center w-[10%]">
                <Link to="/">
                    <img src="/images/logo-image.webp" 
                        className={`${styles.logo}`} 
                        alt="affinity logo" />
                </Link>
            </div>
            <div className="flex justify-center items-center w-[80%]">
                <Link to="/">
                    <h1 className={`${styles.h1}`}>
                        affinity
                    </h1>
                </Link>
            </div>
            <div className="flex justify-center items-center w-[10%]">
                {/* Login button */}
            </div>
        </header>
    );
}

export default Header;