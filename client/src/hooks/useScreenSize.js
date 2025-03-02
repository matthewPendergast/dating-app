import { useState, useEffect } from "react";

const useScreenSize = (breakpoint = 768) => {
    const [isMobile, setMobileLayout] = useState(window.innerWidth <= breakpoint);

    useEffect(() => {
        const handleResize = () => setMobileLayout(window.innerWidth <= breakpoint);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [breakpoint]);

    return isMobile;
};

export default useScreenSize;