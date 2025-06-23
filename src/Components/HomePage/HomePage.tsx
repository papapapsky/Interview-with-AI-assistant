import "./homePage.css";
import HRimage from "../../../public/HRimage.png";

import { ServiceOptions } from "./Components/ServiceOptions";
import { HowItWorks } from "./Components/HowItWorks";
import { useEffect, useState } from "react";
import { CustomLink } from "../CustomLink";
import { WebSiteDescription } from "./Components/WebsiteDescription";
import { ScrollUp } from "./Components/scrollUp/ScrollUp";

export const HomePage = () => {
  const [animation, setAnimation] = useState<string>("");

  useEffect(() => {
    if (history.scrollRestoration) {
      history.scrollRestoration = "manual";
    }

    setAnimation("showAnimation");
    window.scrollTo({ top: 0 });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("lazyServiceOptions");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    const elements = document.querySelectorAll(".inactive");

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <ScrollUp />
      <main id="homePage" className={animation}>
        <div className="greetings">
          <div className="Title">
            <h1>Interviewing the new generation.</h1>
            <h4>Prepare for real interviews with artificial intelligence</h4>
            <CustomLink to="/AIChat" className="CustomLinkBtn">
              Start interview
            </CustomLink>
          </div>
          <div className="HRimage">
            <img src={HRimage} alt="" className="HRimage" />
          </div>
        </div>
        <br />
        <hr />
        <div>
          <div className="aboutWebsite">
            <WebSiteDescription />
          </div>
          <hr />
          <div className="aboutWebsite">
            <h1 className="titles" style={{ color: "white" }}>
              Why our service?
            </h1>
            <ServiceOptions />
            <h1>How it works?</h1>
            <HowItWorks />
            <CustomLink to="/AIChat" className="CustomLinkBtn">
              Start interview
            </CustomLink>
          </div>
        </div>
      </main>
      <footer>
        <h4>2025 InterviewAI</h4>
      </footer>
    </>
  );
};
