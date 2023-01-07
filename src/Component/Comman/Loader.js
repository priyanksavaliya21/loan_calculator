import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

export const Loader = () => {
  return (
    <>
      <div className="loader">
        <div className="water"></div>
      </div>
    </>
  );
};

const ScrollToTop = (props) => {
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return <>{props.children}</>;
};
export const ProgressBar = () => {
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScroll(scroll);
    };
    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  });
  return (
    <div id="progressBarContainer">
      <div
        id="progressBar"
        style={{
          transform: `scale(${scroll}, 1)`,
          transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        }}
      />
    </div>
  );
};

export default ScrollToTop;
