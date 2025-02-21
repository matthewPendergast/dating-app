const Header = () => {
    return (
        <header className="flex w-11/12 h-[10%] min-h-[5rem] p-1 rounded-[2rem] mt-2 mx-auto bg-white">
            <div className="flex justify-center w-[10%] pt-2">
                <img src="/images/logo-image.webp" className="h-1/2" alt="affinity logo" />
            </div>
            <div className="flex justify-center items-center w-[80%]">
                <h1 className="pacifico-regular text-5xl text-[#a44d6d] pb-2">affinity</h1>
            </div>
            <div className="flex justify-center items-center w-[10%]">
                {/* Login button */}
            </div>
        </header>
    );
}

export default Header;