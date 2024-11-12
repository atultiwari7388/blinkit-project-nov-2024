import { useEffect, useState } from "react";

export default function useMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);
  const handleResize = () => {
    const checkPoint = window.innerWidth < breakpoint;
    setIsMobile(checkPoint);
  };

  //call this function inside useEffect
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return [isMobile];
}
