import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CustomLink } from "./Components/CustomLink";
import { HomePage } from "./Components/HomePage/HomePage";
import { AIChatPage } from "./Components/AIChatPage/AIChatPage";
import { InterviewPage } from "./Components/AIChatPage/GetInterview/oralInterview/OralInterviewPage";
import { MainContext } from "./MainContext";
import { TechInterviewPage } from "./Components/AIChatPage/GetInterview/techInterview/TechInterviewPage";
import { NotFoundPage } from "./Components/NotFoundPage/NotFoundPage";
import { InterviewResult } from "./InterviewResult";
function App() {
  return (
    <BrowserRouter>
      <header>
        <CustomLink index to="/">
          Home
        </CustomLink>
        <CustomLink to="/AIChat">Chat</CustomLink>
      </header>
      <MainContext>
        <InterviewResult>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/AIChat" element={<AIChatPage />} />
            <Route path="/AIChat/OralInterview" element={<InterviewPage />} />
            <Route
              path="/AiChat/TechInterview"
              element={<TechInterviewPage />}
            />

            <Route path="*" element={<NotFoundPage />}></Route>
          </Routes>
        </InterviewResult>
      </MainContext>
    </BrowserRouter>
  );
}

export default App;
