const Footer = () => {
    return (
        <footer className="flex items-center min-h-[10vh] bg-black">
            <div className="w-[25vw]">
                <p className="text-white text-center">© affinity 2025</p>
            </div>
            <div className="w-[50vw]">
                <p className="text-white text-center">All images are AI-generated</p>
            </div>
            <div className="flex justify-center gap-2 w-[25vw]">
                <i class="text-white fa-brands fa-facebook hover:brightness-90 cursor-pointer"></i>
                <i class="text-white fa-brands fa-x-twitter hover:brightness-90 cursor-pointer"></i>
                <i class="text-white fa-brands fa-instagram hover:brightness-90 cursor-pointer"></i>
                <i class="text-white fa-brands fa-tiktok hover:brightness-90 cursor-pointer"></i>
            </div>
        </footer>
    );
}

export default Footer;