import "../../../../public/mainParams.png";
import "../../../../public/chatWithHR.png";
import "../../../../public/loadResume.png";
import "../../../../public/techInterview.png";

export const HowItWorks = () => {
  return (
    <div className="howItWorksBox inactive">
      <ol className="howWorks">
        <li>
          <span>1. </span>select basic parameters (language, number of oral
          questions, on/off technical interview)
        </li>
        <img className="howToWorkShow" src="mainParams.png" alt="" />
      </ol>
      <ol className="howWorks">
        <li>
          <span>1. </span>select basic parameters (language, number of oral
          questions, on/off technical interview)
        </li>
        <img className="howToWorkShow" src="loadResume.png" alt="" />
      </ol>
      <ol className="howWorks">
        <li>
          <span>1. </span>select basic parameters (language, number of oral
          questions, on/off technical interview)
        </li>
        <img className="howToWorkShow" src="chatWithHR.png" alt="" />
      </ol>
      <ol className="howWorks">
        <li>
          <span>1. </span>select basic parameters (language, number of oral
          questions, on/off technical interview)
        </li>
        <img className="howToWorkShow" src="techInterview.png" alt="" />
      </ol>
    </div>
  );
};
