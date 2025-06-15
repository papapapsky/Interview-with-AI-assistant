import mainParams from "../../../../public/mainParams.png";
import chatWithHR from "../../../../public/chatWithHR.png";
import loadResume from "../../../../public/loadResume.png";
import techInterview from "../../../../public/techInterview.png";

import { EnglaredImage } from "./EnlargedImage/EnglaredImage";
import { useState } from "react";

export const HowItWorks = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");
  const onOptionClick = (event: any) => {
    setModalImage(event.target.src);
    setOpen(!open);
  };

  return (
    <div className="howItWorksBox inactive">
      <EnglaredImage open={open} setOpen={setOpen} imgSrc={modalImage} />
      <ol className="howWorks">
        <li>
          <span>1. </span>select basic parameters (language, number of oral
          questions, on/off technical interview)
        </li>
        <img
          className="howToWorkShow"
          src={mainParams}
          alt=""
          onClick={(event) => onOptionClick(event)}
        />
      </ol>
      <ol className="howWorks">
        <li>
          <span>2. </span>Next, you upload your resume to this file or collect
          it online.
        </li>
        <img
          className="howToWorkShow"
          src={loadResume}
          alt=""
          onClick={(event) => onOptionClick(event)}
        />
      </ol>
      <ol className="howWorks">
        <li>
          <span>3. </span>After uploading your resume, you begin a text
          interview with a chatbot, consisting of spoken questions.
        </li>
        <img
          className="howToWorkShow"
          src={chatWithHR}
          alt=""
          onClick={(event) => onOptionClick(event)}
        />
      </ol>
      <ol className="howWorks">
        <li>
          <span>4. </span>After passing the oral interview, you proceed to the
          technical part.
        </li>
        <img
          className="howToWorkShow"
          src={techInterview}
          alt=""
          onClick={(event) => onOptionClick(event)}
        />
      </ol>
    </div>
  );
};
