import { useEffect, useState } from "react";
import "./scrollUp.css";

export const ScrollUp = () => {
  const scrollThreshold = 720;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleWindowScroll = () => {
      if (window.scrollY >= scrollThreshold) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleWindowScroll);

    return () => {
      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`ScrollUp ${isVisible ? "active" : "disabled"}`}
      onClick={scrollToTop}
    >
      <div className="Arrow">↑</div>
    </div>
  );
};
