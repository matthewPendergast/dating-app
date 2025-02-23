const styles = {
    icon: "text-white hover:brightness-90 cursor-pointer",
}

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
                <i class={`fa-brands fa-facebook ${styles.icon}`}></i>
                <i class={`fa-brands fa-x-twitter ${styles.icon}`}></i>
                <i class={`fa-brands fa-instagram ${styles.icon}`}></i>
                <i class={`fa-brands fa-tiktok ${styles.icon}`}></i>
            </div>
        </footer>
    );
}

export default Footer;