import "./mainParameters.css";
import "../CollectResume/collectResume.css";
import { useContext, useEffect, useRef, useState } from "react";
import { mainContext } from "../../../../MainContext";
import { CustomLink } from "../../../CustomLink";
import { InterviewTypeChange } from "./interviewTypeChange/InterviewTypeChange";

type TypeProps = {
  setMainParameters: (parameters: TypeParameters) => void;
};

type TypeParameters = {
  language: string;
  questionsQuantity: number;
};

export const MainParameters = ({ setMainParameters }: TypeProps) => {
  const context = useContext(mainContext);
  if (!context) {
    throw new Error("context undefined");
  }

  const [state, setState] = context;
  const [language, setLanguage] = useState<string>("English");
  const [questionsQuantity, setQuestionsQuantity] = useState<number>(10);
  const [fullInterviewPage, setFullInterviewPage] = useState<boolean>(true);
  const [thematicInterviewPage, setThematicInterviewPage] =
    useState<boolean>(false);
  const techInterviewCheck = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedParameters = localStorage.getItem("mainParameters");

    if (JSON.parse(`${savedParameters}`)) {
      setLanguage(JSON.parse(`${savedParameters}`).language);
      setQuestionsQuantity(JSON.parse(`${savedParameters}`).questionsQuantity);

      const checked = JSON.parse(`${savedParameters}`).techInterview;
      if (checked && techInterviewCheck.current) {
        techInterviewCheck.current.checked = true;
      }
    }
  }, []);

  useEffect(() => {
    const Parameters: TypeParameters = {
      language,
      questionsQuantity,
    };
    setState({
      ...state,
      language: Parameters.language,
      questionsQuantity: questionsQuantity,
    });
    setMainParameters(Parameters);
  }, [language, questionsQuantity]);

  useEffect(() => {
    localStorage.setItem("mainParameters", JSON.stringify(state));
  }, [state]);

  const setQuestions = (number: string) => {
    const a: any = /[a-zа-яё]/i;
    if (!a.test(number) && +number <= 20) {
      setQuestionsQuantity(Number(number));
    }
  };

  const checkTechInterview = () => {
    const checked = techInterviewCheck.current?.checked ?? false;

    if (checked) {
      setState({ ...state, techInterview: true });
    } else {
      setState({ ...state, techInterview: false });
    }
  };

  return (
    <div className="mainParameters">
      <div>
        <div className="apiKeyLink">
          <CustomLink to="/ApiKeyEdit" className="CustomLinkBtn">
            Edit API key
          </CustomLink>
        </div>
        <InterviewTypeChange
          setThematicInterviewPage={setThematicInterviewPage}
          setFullInterviewPage={setFullInterviewPage}
          fullInterview={fullInterviewPage}
          thematicInterview={thematicInterviewPage}
        />
        <div>
          <label htmlFor="language">HR language:</label>
          <input
            type="text"
            id="language"
            placeholder="Language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="questions">Questions quantity:</label>
          <input
            type="text"
            id="questions"
            placeholder="number of questions"
            value={questionsQuantity}
            onChange={(e) => setQuestions(e.target.value)}
          />
        </div>
        <div className="techInterviewBox">
          <label htmlFor="techInterview">Enable technical interview</label>
          <input
            type="checkbox"
            id="techInterview"
            onChange={checkTechInterview}
            ref={techInterviewCheck}
          />
        </div>
      </div>
    </div>
  );
};
