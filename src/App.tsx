import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomLink } from "./Components/CustomLink";
import { HomePage } from "./Components/HomePage/HomePage";
import { AIChatPage } from "./Components/AIChatPage/AIChatPage";
import { InterviewPage } from "./Components/AIChatPage/GetInterview/oralInterview/InterviewPage";
import { MainContext } from "./MainContext";
import { TechInterviewPage } from "./Components/AIChatPage/GetInterview/techInterview.jsx/TechInterviewPage";

function App() {
  return (
    <MainContext>
      <BrowserRouter>
        <header>
          <CustomLink index to="/">
            Home
          </CustomLink>
          <CustomLink to="/AIChat">Chat</CustomLink>
        </header>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/AIChat" element={<AIChatPage />} />
          <Route path="/AIChat/OralInterview" element={<InterviewPage />} />
          <Route path="/AiChat/TechInterview" element={<TechInterviewPage />} />
        </Routes>
      </BrowserRouter>
    </MainContext>
  );
}

export default App;
