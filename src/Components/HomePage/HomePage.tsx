import "./homePage.css";
import "../../../public/HRimage.png";
import "../../../public/chatWitchAi.png";
import "../../../public/speedWork.png";
import "../../../public/simplicityWork.png";
import "../../../public/technnologiesHR.png";

import { useEffect } from "react";
import { CustomLink } from "../CustomLink";

export const HomePage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    const contentBox = document.getElementById("homePage");
    contentBox?.classList.add("showAnimation");
  }, []);

  return (
    <>
      <main id="homePage">
        <div className="greetings">
          <div className="Title">
            <h1>Interviewing the new generation.</h1>
            <h4>Prepare for real interviews with artificial intelligence</h4>
            <CustomLink to="/AIChat">Start</CustomLink>
          </div>
          <div className="HRimage">
            <img src="HRimage.png" alt="" />
          </div>
        </div>
        <br />
        <hr />
        <div className="aboutWebsite">
          <div>
            <h3 className="titles">About website</h3>
            <h4 className="centerOption">
              This is a platform where you can take free interviews with
              artificial intelligence. <br />
              This site is aimed at developers and programmers. <br />
              <br />
              Practice technical interviews, receive instant feedback, and get
              ready for real-world hiring challenges — all powered by AI. <br />
              No registration required. Just choose a topic and start
              practicing.
            </h4>
          </div>
        </div>
        <hr />
        <div className="aboutWebsite">
          <div>
            <h1 className="titles" style={{ color: "white" }}>
              Why our service?
            </h1>
            <div className="serviceOptions">
              <div className="Option">
                <div>
                  <h3 className="titles">Speed</h3>
                  <h4>
                    <span>Quickly start your first interview</span> - just
                    upload your resume in txt or pdf format or take it online on
                    the website! Smart HR will collect suitable questions and
                    tasks for you
                  </h4>
                </div>
                <img src="speedWork.png" alt="" />
              </div>
              <div className="Option">
                <div>
                  <h3 className="titles">Simplicity</h3>
                  <h4>
                    <span>Easy for use</span> - a simple interface and chat will
                    allow you to quickly get used to it and feel comfortable
                    during the interview
                  </h4>
                </div>
                <img src="simplicityWork.png" alt="" />
              </div>
              <div className="Option">
                <div>
                  <h3 className="titles">Technologies</h3>
                  <h4>
                    <span>Fresh technologies</span> - we use the latest
                    technologies for comfortable work of the site and users on
                    it. The site has a smart and fast model of artificial
                    intelligence - Google gemini Ai
                  </h4>
                </div>
                <img src="technnologiesHR.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <h4>2025 InterviewAI</h4>
      </footer>
    </>
  );
};
