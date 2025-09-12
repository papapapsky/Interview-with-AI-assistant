import { useEffect, useState } from "react";
import "./apiKeyEdit.css";
import { getKey } from "../../getKey";
import { ApiKeyModal } from "./modal/ApiKeyModal";

export const ApiKeyEdit = () => {
  const [animation, setAnimation] = useState<boolean>(false);
  const [save, setSave] = useState<boolean>(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const savedApiKey = localStorage.getItem("apiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }

    setAnimation(true);
  }, []);

  const getApiKey = async () => {
    if (!loading && !apiKey) {
      setLoading(true);
      const key = await getKey();
      if (key) {
        setApiKey(key);
        localStorage.setItem("apiKey", key);
        setSave(true);
      }
    }
    setLoading(false);
  };

  const openModal = () => {
    setModal(true);
  };

  useEffect(() => {
    console.log(apiKey);
  }, [apiKey]);

  return (
    <>
      {modal && <ApiKeyModal setActive={setModal} apiKey={apiKey} />}
      <div
        className={`apiKeyEditPage ${
          animation ? "showParametersAnimation" : ""
        }`}
      >
        <h1 className="headLines">API key</h1>
        <h3>
          On this page you must generate your Gemini AI API key for the site to
          function properly.
        </h3>

        <div className="showsApiKeyContainer">
          <div>
            {apiKey ? (
              <button onClick={openModal} style={{ outline: "none" }}>
                Show API key
              </button>
            ) : (
              <p>The API key will be shown here</p>
            )}
          </div>
        </div>
        <button onClick={getApiKey} className="confirmBtn">
          Get API key
        </button>
        {save && <h3 className="SavedMessage">Succesfully generated!</h3>}
        {loading && <div className="loader" style={{ marginTop: 20 }}></div>}
      </div>
    </>
  );
};
