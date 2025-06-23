import { useState, type PropsWithChildren } from "react";
import React from "react";

type TypeInterviewResult = {
  oralCorrectAnswers: number;
  techCorrectAnswers: number;
};

type TypeParameterstContext = [
  TypeInterviewResult,
  React.Dispatch<React.SetStateAction<TypeInterviewResult>>
];

export const InterviewResultContext = React.createContext<
  TypeParameterstContext | undefined
>(undefined);

export const InterviewResult = ({ children }: PropsWithChildren) => {
  const interviewResultState = useState<TypeInterviewResult>({
    oralCorrectAnswers: 0,
    techCorrectAnswers: 0,
  });
  return (
    <InterviewResultContext.Provider value={interviewResultState}>
      {children}
    </InterviewResultContext.Provider>
  );
};
