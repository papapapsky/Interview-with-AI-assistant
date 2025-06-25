import { useEffect, useRef, useState } from "react";
import "./apiKeyEdit.css";
import { HyperLink } from "./hyprLink";

export const ApiKeyEdit = () => {
  const [animation, setAnimation] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);

  const apiKeyRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("apiKey");
    if (savedApiKey) {
      console.log("asdasd");
      if (apiKeyRef.current) {
        apiKeyRef.current.value = savedApiKey;
      }
    }

    setAnimation(true);
  }, []);

  const saveApiKey = () => {
    if (apiKeyRef.current?.value) {
      localStorage.setItem("apiKey", apiKeyRef.current?.value);

      setSave(true);
    }
  };

  return (
    <div
      className={`apiKeyEditPage ${animation ? "showParametersAnimation" : ""}`}
    >
      <h1 className="headLines">API key</h1>
      <h3>
        On this page you must enter your Gemini AI API key for the site to
        function properly.
      </h3>
      <h1 className="miniHeadLines">Instruction</h1>
      <div className="Insctruction">
        <ul className="InsctructionList">
          <li>
            First, you must go to the{" "}
            <HyperLink link="https://gemini.google.com/app">
              gemini AI website
            </HyperLink>{" "}
            and register
          </li>
          <li>
            Next, go to{" "}
            <HyperLink
              link="https://aistudio.google.com/app/apikey?authuser=1&_gl=1*113n3ki*_ga*NjI3OTcwNDQ2LjE3NTA3MDAwMjA.*_ga_P1DBVKWT6V*czE3NTA4NjYxMTIkbzQkZzEkdDE3NTA4NjYxMjEkajUxJGwwJGgxMzQzMTM1NDYy
"
            >
              this page
            </HyperLink>{" "}
            and click on the{" "}
            <span className="dedicatedText">Create api key</span> button
          </li>
          <li>
            After all of this, copy your API KEY and paste it here and then
            confirm saves:
          </li>
        </ul>
        <input
          ref={apiKeyRef}
          type="text"
          placeholder="Paste API KEY"
          className="apiKeyInput"
        />
        <button onClick={saveApiKey} className="confirmBtn">
          Confirm saves
        </button>
        {save && <h3 className="SavedMessage">Succesfully saved!</h3>}
      </div>
    </div>
  );
};
