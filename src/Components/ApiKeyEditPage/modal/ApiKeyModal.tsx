import { useState } from "react";
import "./modal.css";
import { createPortal } from "react-dom";

interface IProps {
  setActive: (active: boolean) => void;
  apiKey: string;
}

export const ApiKeyModal = ({ setActive, apiKey }: IProps) => {
  const [showToast, setShowToast] = useState<boolean>(false);
  const [timeOutActive, setTimeoutActive] = useState<boolean>(false);
  const modalElement = document.getElementById("modalWindow") as HTMLDivElement;

  const copyApiKey = () => {
    if (!timeOutActive) {
      navigator.clipboard.writeText(apiKey).then(() => {
        setShowToast(true);
        setTimeoutActive(true);
        setTimeout(() => {
          setShowToast(false);
          setTimeoutActive(false);
        }, 2000);
      });
    }
  };

  return createPortal(
    <>
      <div className="modalParent">
        <div className="modalChildren showAnimation">
          <h2>your API key:</h2>
          <div className="apiKeyContainer" onClick={copyApiKey}>
            <button className="clipboard" style={{ outline: "none" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e3e3e3"
              >
                <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z" />
              </svg>
            </button>
            <p className="apiKey">{apiKey}</p>
          </div>
          <button
            style={{ outline: "none" }}
            onClick={() => setActive(false)}
            className="modalButton"
          >
            Close
          </button>
        </div>
      </div>

      {showToast && (
        <div className="toast">
          <p>Успешно скопировано!</p>
          <div className="toast-timer"></div>
        </div>
      )}
    </>,
    modalElement
  );
};
